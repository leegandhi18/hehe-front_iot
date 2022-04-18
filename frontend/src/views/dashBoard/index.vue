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
        src="http://localhost:3005/d-solo/fIZ4z6s7z/influxdb-metrics?orgId=1&from=1650259940810&to=1650259945810&panelId=1"
        width="450"
        height="200"
        frameborder="0"
      ></iframe>
      <iframe
        class="test3"
        src="http://localhost:3005/d-solo/fIZ4z6s7z/influxdb-metrics?orgId=1&refresh=5s&from=1650256950610&to=1650257250610&panelId=2"
        width="450"
        height="200"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import edukit from './edukit.vue'

export default {
  components: {
    edukit
  },
  methods: {
    start() {
      this.$bvToast.toast('가즈아~', {
        title: 'SUCCESS',
        variant: 'success',
        solid: true
      })
    },
    stop() {
      this.$bvToast.toast('멈춰!', {
        title: 'SUCCESS',
        variant: 'success',
        solid: true
      })
    },
    reset() {
      this.$bvToast.toast('초기화!', {
        title: 'SUCCESS',
        variant: 'success',
        solid: true
      })
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
  margin-top: 25px;
}
</style>
