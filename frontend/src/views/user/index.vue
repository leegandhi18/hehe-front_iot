<template>
  <div>
    <b-button class="btn" id="update" variant="dark" @click="onClickUpdate">작업자 정보 수정</b-button>
    <inform />
    {{ row }}
  </div>
</template>

<script>
import inform from './inform.vue'
export default {
  components: {
    inform: inform
  },
  data() {
    return {
      user: {
        name: null,
        password: null,
        role: null,
        phone: null
      }
    }
  },
  computed: {
    userUpdatedResult() {
      return this.$store.getters.UserUpdatedResult
    }
  },
  watch: {
    userUpdatedResult(value) {
      // 수정 후 처리
      if (value !== null) {
        if (value > 0) {
          // 수정이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('수정 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })
        } else {
          // 수정이 실패한 경우
          this.$bvToast.toast('수정이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  methods: {
    onClickUpdate(id) {
      // 작업자 조회
      this.$store.dispatch('actUserInfo', id)
      // 모달 출력
      this.$bvModal.show('modal-user-inform')
    }
  }
}
</script>

<style>
#update {
  float: right;
}
</style>
