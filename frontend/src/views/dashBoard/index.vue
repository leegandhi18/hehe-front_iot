<template>
  <helloEdukit />
</template>

<script>
import Three from "../../webgl/webgl";

let helloEdukit = {
    template: '<div ref="webgl"></div>',
    mounted(){
        Three(this.$refs.webgl);
    }
}

export default {
    name: "edukit",
    components: {
        helloEdukit
    }
}
</script>

<style scoped>
</style>