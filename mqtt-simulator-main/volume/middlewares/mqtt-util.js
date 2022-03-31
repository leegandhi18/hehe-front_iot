const mqtt = require('mqtt')

//시간 추가
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

const mqttConnectionCheck = (req, res, next) => {
  const client = mqtt.connect('mqtt://mqtt:1883')
  client.on('connect', () => {
    console.log('connected')
    next()
  })
  client.on('error', (err) => {
    console.error(err)
    next(err)
    client.end()
  })
}

const simulatorStart = (req, res, next) => {
  const client = mqtt.connect('mqtt://mqtt:1883')
  client.on('connect', () => {
    console.log('connected')
    next()
  })
  client.subscribe('metacamp/sensor')
  const message_listner = (topic, message, packet) => {
    console.log(`topic:${topic} message is ` + message)
  }
  client.on('message', message_listner)
  
  client.on('error', (err) => {
    console.error(err)
    next(err)
    client.end()
  })
  const timedefault = req.body.endtime ? req.body.endtime : 2
  const datainterval = req.body.datainterval ? req.body.datainterval : 1
  const dataPublish = setInterval(() => {
    const koreanTime = new Date().addHours(9)
    const json = {
      'temperature': (Math.random() * (26 - 19) + 19).toFixed(2),
      'humidity': (Math.random() * (60 - 64) + 60).toFixed(2),
      'datetime': koreanTime
    }
    client.publish('metacamp/sensor', JSON.stringify(json))
  }, 1000 * datainterval);
  if (timedefault) {
    setTimeout(() => {
      clearInterval(dataPublish)
      client.removeListener('message', message_listner)
      console.log("타이머 종료")
      next()
    }, timedefault * 1000);
  }

}


module.exports = { mqttConnectionCheck, simulatorStart }