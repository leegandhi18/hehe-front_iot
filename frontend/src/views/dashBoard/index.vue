<template>
  <div>
    <edukit />
    <iframe
      src="http://localhost:3005/d-solo/Xat2J48nk/influxdb-metrics?orgId=1&from=1649394807572&to=1649394987572&kiosk=tv&refresh=5s&panelId=1"
      width="450"
      height="200"
      frameborder="0"
    ></iframe>
    <iframe
      src="http://localhost:3005/d-solo/Xat2J48nk/influxdb-metrics?orgId=1&from=1649394857956&to=1649395037956&kiosk=tv&refresh=5s&panelId=2"
      width="450"
      height="200"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import edukit from './edukit.vue'

export default {
  components: {
    edukit
  }
}
</script>
