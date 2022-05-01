<template>
  <div style="background-color: black; height: 100vh">
    <div>
      <b-button class="btn2" variant="outline-primary" @click="start">START</b-button>
      <b-button class="btn2" variant="outline-primary" @click="stop">STOP</b-button>
      <b-button class="btn2" variant="outline-primary" @click="reset">RESET</b-button>
    </div>
    <div class="test_box">
      <edukit class="test1" />
      <iframe
        class="test2"
        src="http://localhost:3005/d-solo/fIZ4z6s7z/influxdb-metrics?orgId=1&refresh=5s&panelId=1"
        width="450"
        height="285"
        frameborder="0"
      ></iframe>
      <iframe
        class="test3"
        src="http://localhost:3005/d-solo/fIZ4z6s7z/influxdb-metrics?orgId=1&refresh=5s&from=1650417740043&to=1650417750043&panelId=2"
        width="450"
        height="285"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import edukit from './edukit.vue'
import mqtt from 'mqtt'

export default {
  components: {
    edukit
  },
  data() {
    return {
      connection: {
        host: '220.90.129.47',
        port: 8088,
        reconnectPeriod: 10 * 1000,
        // Certification Information
        clientId: 'mqtt_buttons_from_dashboard'
      },
      client: {
        connected: false
      }
    }
  },
  created() {
    this.createConnection()
  },
  methods: {
    // Create connection
    createConnection() {
      const { host, port, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}/mqtt`
      try {
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        console.log('버튼 연결 완료!')
      })
      this.client.on('error', error => {
        console.log('버튼 연결 실패', error)
      })
    },
    start() {
      this.client.publish('UVC-EDU-outside', '{"tagId":"1", "value":"1"}')
      if (this.client.publish) {
        this.$bvToast.toast('시작', {
          title: 'START',
          variant: 'success',
          solid: true
        })
      }
    },
    stop() {
      this.client.publish('UVC-EDU-outside', '{"tagId":"50", "value":"1"}')
      if (this.client.publish) {
        this.$bvToast.toast('정지', {
          title: 'STOP',
          variant: 'warning',
          solid: true
        })
      }
    },
    reset() {
      this.client.publish('UVC-EDU-outside', '{"tagId":"8", "value":"1"}')
      if (this.client.publish) {
        this.$bvToast.toast('리셋', {
          title: 'RESET',
          variant: 'info',
          solid: true
        })
      }
    }
  }
}
</script>
<style>
.btn2 {
  display: inline;
  /* margin-left: 50px;
  margin-top: 30px; */
  text-align: center;
  width: calc(100% / 3);
  border-radius: 0;
  margin-top: 20px;
  margin-bottom: 20px;
}
.test_box::after {
  display: block;
  clear: both;
  content: '';
}
.test1,
.test2,
.test3 {
  float: left;
  margin-left: 33px;
}
.test3 {
  margin-top: 30px;
}
</style>
