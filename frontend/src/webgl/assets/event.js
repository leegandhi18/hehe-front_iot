/**
 * 목표 기기의 실시간 정보 연결하는 파트
 * 본 프로젝트에서는 mqtt를 사용
 */

import mqtt from 'mqtt'

class Event {
  constructor(element, edukit) {
    const eventElement = document.createElement('div')

    // 접속과 동시에 연결하고 받아오기 시작하도록 코드 수정 필요
    const statusElement = eventElement.appendChild(document.createElement('span'))
    statusElement.innerText = 'Connect'
    statusElement.style.color = 'red'

    // HTML과 script가 로드된 시점에 연결 시도
    window.addEventListener('load', () => {
      // 환경설정 값 부여
      const props = {
        // hostname: 'localhost',
        // hostname: '220.90.129.60', // 엣지 컴퓨터 ip address - 김경은님
        hostname: '220.90.129.47', // 엣지 컴퓨터 ip address - 유지영님
        port: '8088',
        topic: 'UVC-EDU-hehe',
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
    let { hostname, port, topic, status, edukit } = props

    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
    this.client = mqtt.connect({
      clientId,
      clean: true,
      protocol: 'ws',
      reconnectPeriod: 1000,
      hostname: hostname,
      port: port
    })

    this.client.on('connect', () => {
      console.log('MQTT Connected')
      status.color = 'green'

      this.client.subscribe([topic], () => {
        console.log(`토픽 연결 완료: ${topic}`)
      })
      this.client.on('message', (topic, payload) => {
        console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`)

        // 들어온 데이터 값 반영하는 부분, 더 필요한 데이터는 tagId 추가하면 됨~~~
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
