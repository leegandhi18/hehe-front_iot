<template>
  <div>
    <b-modal id="modal-admin-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="ID" label-for="code" label-cols="3">
          <b-form-input id="id" v-model="admin.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="이름" label-for="device" label-cols="3">
          <b-form-input id="name" v-model="admin.name" placeholder="이름을 입력하시오."></b-form-input>
        </b-form-group>
        <b-form-group label="비밀번호" label-for="password" label-cols="3">
          <b-form-input
            id="password"
            v-model="admin.password"
            type="password"
            placeholder="비밀번호를 입력하시오."
          ></b-form-input>
        </b-form-group>
        <b-form-group label="권한" label-for="role" label-cols="3">
          <b-form-radio-group id="role" v-model="admin.role" :options="adminRole.options" />
          <!-- <b-form-input id="role" v-model="admin.role"></b-form-input> -->
        </b-form-group>
        <b-form-group label="전화번호" label-for="phone" label-cols="3">
          <b-form-input id="phone" v-model="admin.phone" type="tel" placeholder="전화번호를 입력하시오."></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      admin: {
        id: null,
        name: null,
        password: null,
        role: null,
        phone: null
      },
      adminRole: {
        default: '0', // 기본값
        options: [
          { value: '관리자', text: '관리자' },
          { value: '작업자', text: '작업자' }
        ]
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Admin
    },
    inputMode() {
      return this.$store.getters.AdminInputMode
    },
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '신규 등록'
      } else if (this.inputMode === 'update') {
        title = '수정'
      }

      return title
    },
    tokenUserRole() {
      return this.$store.getters.TokenUser && this.$store.getters.TokenUser.role
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.admin = { ...value }
      this.admin.password = '' // 비밀번호 자료 공백으로 바꿔주기
      // this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.admin = { ...this.infoData }

    // this.setDefaultValues() // 기본값 세팅

    // this.$store.dispatch('actAdminList') // 부서정보 조회
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      // 1. 등록인 경우
      if (
        this.admin.name &&
        this.admin.password &&
        this.admin.role &&
        this.admin.phone &&
        this.inputMode === 'insert'
      ) {
        await this.$store.dispatch('actAdminInsert', this.admin) // 입력 실행
        this.$bvModal.hide('modal-admin-inform')
        return true
      } else if (!this.admin.name && !this.admin.password && !this.admin.role && !this.admin.phone) {
        return false
      }
      // 2. 수정인 경우
      if (
        this.admin.name &&
        this.admin.password &&
        this.admin.role &&
        this.admin.phone &&
        this.inputMode === 'update'
      ) {
        await this.$store.dispatch('actAdminUpdate', this.admin) // 입력 실행
        this.$bvModal.hide('modal-admin-inform')
        return true
      } else if (!this.admin.name && !this.admin.password && !this.admin.role && !this.admin.phone) {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
