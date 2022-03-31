<template>
  <div>
    <div class="text-center" style="margin-top: 200px">
      <b-spinner variant="secondary" style="width: 3rem; height: 3rem" label="Logout..."></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.TokenLoading
    }
  },
  watch: {
    loading(value) {
      if (value === false) {
        // 로그아웃 처리 후 이동
        this.$router.push('/auth/login')
      }
    }
  },
  created() {
    this.$store.dispatch('authLogout')
  }
}
</script>
