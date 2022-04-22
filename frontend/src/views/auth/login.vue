<template>
  <div style="color: LightGray; padding-top: 150px">
    <div style="color: LightGray">
      <b-row align-h="center" style="width: 100%">
        <b-col cols="4">
          <b-card style="color: black" title="로그인">
            <b-form-group label-cols="4" label-cols-lg="3" label="이름" label-for="input-name">
              <b-form-input id="input-name" v-model="name"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="3" label="비밀번호" label-for="input-password">
              <b-form-input id="input-password" v-model="password" type="password"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="3" label="">
              <b-button id="login" variant="dark" :disabled="loading" @click="onSubmit"
                ><b-spinner v-if="loading" small></b-spinner> 로그인</b-button
              >
            </b-form-group>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'

export default {
  data() {
    return {
      name: null,
      password: null
    }
  },
  computed: {
    tokenUser() {
      return this.$store.getters.TokenUser
    },
    loading() {
      return this.$store.getters.TokenLoading
    },
    error() {
      return this.$store.getters.TokenError
    }
  },
  watch: {
    tokenUser(value) {
      if (value && value.id && value.id > 0) {
        // 로그인이 완료된 상황
        // console.log('login token value', value)
        this.$router.push('/dashboard') // 메인 대시보드 페이지로 이동
      }
    },
    error(errValue) {
      if (errValue !== null) {
        // 메세지 출력
        this.$bvToast.toast('아이디 또는 비밀번호 확인해 주세요.', {
          title: '로그인 에러',
          variant: 'danger',
          solid: true
        })
      }
    }
  },
  created() {
    // 이미 토큰을 가지고 있는 경우 처리를 위한 로직
    const token = window.localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      // console.log('decodedToken', decodedToken)
      const today = new Date()
      const expDate = new Date(decodedToken.exp * 1000)

      if (expDate && expDate >= today) {
        this.$router.push('/dashboard') // 메인 대시보드 페이지로 이동
      } else {
        window.localStorage.removeItem('token') // 토큰 삭제
      }
    }
  },
  methods: {
    onSubmit() {
      // console.log('onSubmit', this.name, this.password)
      this.$store.dispatch('authLogin', { name: this.name, password: this.password })
    }
  }
}
</script>
<style>
#login {
  float: right;
}
</style>
