<template>
  <div>
    <div style="margin-top: 80px">
      <b-row align-h="center">
        <b-col cols="4">
          <b-card class="text-center" title="작업자 정보 수정">
            <b-form>
              <b-form-group label-cols="4" label-cols-lg="3" label="이름" label-for="name">
                <b-form-input id="name" v-model="user.name" disabled></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="3" label="비밀번호" label-for="password">
                <b-form-input id="password" v-model="user.password" type="password"></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="3" label="권한" label-for="role">
                <b-form-input id="role" v-model="user.role" disabled></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="3" label="전화번호" label-for="phone">
                <b-form-input id="phone" v-model="user.phone"></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="3" label="">
                <!-- <b-button id="login" variant="dark" :disabled="loading" @click="onSubmit"
                  ><b-spinner v-if="loading" small></b-spinner>수정</b-button
                > -->
                <b-button id="update" variant="dark" @click="onSubmit">수정</b-button>
              </b-form-group>
            </b-form>
            {{ infoData }}
          </b-card>
        </b-col>
      </b-row>
    </div>
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
    infoData() {
      return this.$store.getters.User
    },
    userList() {
      return this.$store.getters.UserList
    },
    userUpdatedResult() {
      return this.$store.getters.UserUpdatedResult
    }
  },
  created() {
    this.user = { ...this.infoData }
    this.$store.dispatch('actUserInfo') // 수정 실행
  },
  beforeCreate() {
    console.log('beforeCreate')
    // infoData(value) {
    //   this.user = { ...value }
    // }
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

<style>
#update {
  float: right;
}
</style>
