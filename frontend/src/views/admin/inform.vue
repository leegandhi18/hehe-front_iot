<template>
  <div>
    <b-modal id="modal-admin-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="id" label-for="code" label-cols="3">
          <b-form-input id="id" v-model="admin.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="이름" label-for="device" label-cols="3">
          <b-form-input id="name" v-model="admin.name"></b-form-input>
        </b-form-group>
        <b-form-group label="password" label-for="password" label-cols="3">
          <b-form-input v-model="admin.password" type="password"></b-form-input>
        </b-form-group>
        <b-form-group label="전화번호" label-for="pthone" label-cols="3">
          <b-form-input id="phone" v-model="admin.phone" type="tel"></b-form-input>
        </b-form-group>
        <!-- <b-form-group v-if="inputMode === 'update'" label="등록일" label-for="createdAt" label-cols="3">
          <b-form-input id="createdAt" :value="getCreatedAt" disabled></b-form-input>
        </b-form-group> -->
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
        phone: null
      },
      AdminRole: {
        default: 'member' // 기본값
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
    }
    // getCreatedAt() {
    //   return this.Admin.createdAt && this.work.createdAt.substring(0, 10)
    // },
    // AdminList() {
    //   return this.$store.getters.AdminList
    // }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.admin = { ...value }

      this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.admin = { ...this.infoData }

    // this.setDefaultValues() // 기본값 세팅

    // this.$store.dispatch('actAdminList') // 부서정보 조회
  },
  methods: {
    onSubmit() {
      // this.$store.dispatch('actAdminInsert', this.Admin) // 입력 실행
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actAdminInsert', this.admin) // 입력 실행
      }
      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actAdminUpdate', this.admin) // 수정 실행
      }
    },
    setDefaultValues() {
      // 기본값 세팅
      if (this.inputMode === 'insert') {
        this.work.role = this.AdminRole.default // 사용자 권한
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
