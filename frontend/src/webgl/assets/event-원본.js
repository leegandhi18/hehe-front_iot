/**
 * 목표 기기의 실시간 정보 연결하는 파트
 * 본 프로젝트에서는 mqtt를 사용
 */
import mqtt from 'mqtt'

class Event {
  constructor(element, edukit) {
    const eventElement = document.createElement('div')

    const inputAddressElement = eventElement.appendChild(document.createElement('input'))
    inputAddressElement.placeholder = '127.0.0.1'

    const inputPortElement = eventElement.appendChild(document.createElement('input'))
    inputPortElement.placeholder = '1883'

    const inputPathElement = eventElement.appendChild(document.createElement('input'))
    inputPathElement.placeholder = '/mqtt'

    const inputTopicElement = eventElement.appendChild(document.createElement('input'))
    inputTopicElement.placeholder = '*'

    const buttonElement = eventElement.appendChild(document.createElement('button'))
    buttonElement.innerText = 'Connect'

    const statusElement = eventElement.appendChild(document.createElement('span'))
    statusElement.innerText = '연결'
    statusElement.style.color = 'red'

    buttonElement.addEventListener('click', () => {
      let props = {
        hostname: inputAddressElement.value,
        port: inputPortElement.value,
        path: inputPathElement.value,
        topic: inputTopicElement.value,
        status: statusElement.style,
        edukit: edukit
      }
      statusElement.style.color = 'red'
      if (this.client) this.client.end()

      this.setEvent(props)
    })

    element.appendChild(eventElement)
  }

  setEvent(props) {
    let { hostname, port, path, topic, status, edukit } = props

    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
    this.client = mqtt.connect({
      clientId,
      clean: true,
      protocol: 'ws',
      reconnectPeriod: 1000,
      hostname: hostname,
      port: port,
      path: path
    })

    this.client.on('connect', () => {
      console.log('MQTT Connected')
      status.color = 'green'

      this.client.subscribe([topic], () => {
        console.log(`토픽 연결 완료: ${topic}`)
      })
      this.client.on('message', (topic, payload) => {
        console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`)

        let message = JSON.parse(payload)
        let data = message.Wrapper.filter(p => p.tagId === '21' || p.tagId === '22')
        data = data.map(p => parseInt(p.value))

        edukit['yAxis'] = data[0]
        edukit['xAxis'] = data[1]
      })
    })
  }
}

export { Event }
