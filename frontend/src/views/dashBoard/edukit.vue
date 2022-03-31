<template>
  <div ref="webgl"></div>
</template>

<script>
import Three from '../../webgl/webgl'

export default {
  mounted() {
    Three(this.$refs.webgl)
  }
}
</script>
