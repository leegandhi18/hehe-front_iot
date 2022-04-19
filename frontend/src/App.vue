<template>
  <div id="app" style="background-color: black; height: 100vh">
    <app-header v-if="this.$route.meta.header !== false" />
    <router-view />
  </div>
</template>

<script>
import Header from './components/layout/Header'
export default {
  components: {
    'app-header': Header
  }
}
</script>
