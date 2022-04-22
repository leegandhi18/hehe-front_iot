<template>
  <div>
    <div style="color: LightGray; margin-top: 80px">
      <b-row align-h="center">
        <b-col cols="4">
          <b-card title="작업자 정보 수정">
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
              <b-button id="update" variant="dark" @click="onClickUpdate">수정하기</b-button>
            </b-form-group>
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
        id: null,
        name: null,
        password: null,
        role: null,
        phone: null
      }
    }
  },
  computed: {
    // tokenUser() {
    //   return this.$store.getters.TokenUser
    // },
    userList() {
      return this.$store.getters.UserList
    },
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
      this.$router.push('../dashboard')
    }
  },
  created() {
    // this.$store.dispatch('actUserInfo')
    // 로그인이 성공하면 토큰이 발급되는 유저의 정보를 가져온다.
    // 사용자 정보 수정 폼에 토큰 유저의 정보를 불러온다.
    this.user = this.$store.getters.TokenUser
    this.user.password = ''
    // console.log('login tokenUser', this.user)
  },
  methods: {
    // 작업자 정보 수정하기 버튼 클릭 시
    onClickUpdate(e) {
      e.preventDefault()
      if (this.user.password && this.user.phone) {
        // console.log('update this.user', this.user)
        this.$store.dispatch('actUserUpdate', this.user)
        return true
      } else if (!this.user.password || !this.user.phone) {
        alert('입력을 완료하지 않았습니다. 다시 확인해주세요.')
        return false
      }
    }
  }
}
</script>

<style>
#update {
  float: right;
}
</style>
