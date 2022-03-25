<template>
  <div>
    <b-modal id="modal-user-inform" title="작업자 정보 수정">
      <div>
        <b-form-group label="이름" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="user.name" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="비밀번호" label-for="password" label-cols="3">
          <b-form-input id="password" v-model="user.password"></b-form-input>
        </b-form-group>
        <b-form-group label="권한" label-for="role" label-cols="3">
          <b-form-input id="role" v-model="user.role" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="전화번호" label-for="phone" label-cols="3">
          <b-form-input id="phone" v-model="user.phone"></b-form-input>
        </b-form-group>
        {{ infoData }}
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
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
    // infoData() {
    //   return this.$store.getters.User
    // },
    // userList() {
    //   return this.$store.getters.UserList
    // }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.user = { ...value }
    }
  },
  created() {
    this.user = { ...this.infoData }
    console.log(this.infoData)
    // this.$store.dispatch('actUserInfo') // 작업자 정보 조회
  },
  methods: {
    onSubmit(event) {
      this.$store.dispatch('actUserUpdate', this.user) // 수정 실행
      event.preventDefault()
      alert('수정이 완료되었습니다.')
      this.$router.push('./dashboard')
    }
  }
}
</script>

<style lang="scss" scoped></style>
