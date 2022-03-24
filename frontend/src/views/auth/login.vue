<template>
  <div>
    <div style="margin-top: 80px">
      <b-row align-h="center">
        <b-col cols="4">
          <b-card title="로그인">
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
        this.$router.push('/dashboard')
      }
    },
    error(errValue) {
      if (errValue !== null) {
        this.$bvToast.toast('아이디 또는 비밀번호 확인하3', {
          title: '로그인 에러',
          variant: 'danger',
          solid: true
        })
      }
    }
  },
  created() {
    const token = window.localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      const today = new Date()
      const expDate = new Date(decodedToken.exp * 1000)

      if (expDate && expDate >= today) {
        this.$router.push('/dashboard') // 메인 페이지 이동
      } else {
        window.localStorage.removeItem('token')
      }
    }
  },

  methods: {
    onSubmit() {
      this.$store.dispatch('authLogin', { userid: this.name, password: this.password })
    }
  }
}
</script>
<style>
#login {
  float: right;
}
</style>
