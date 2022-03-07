<template>
  <div>
    <app-header />
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
