<template>
  <div>
    <b-modal id="modal-user-inform" :title="'품목 등록'" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="id" label-for="code" label-cols="3">
          <b-form-input id="id" v-model="items.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="품목" label-for="item" label-cols="3">
          <b-form-input id="item" v-model="items.item"></b-form-input>
        </b-form-group>
        <b-form-group label="수량" label-for="num" label-cols="3">
          <b-form-input id="num" v-model="items.num"></b-form-input>
        </b-form-group>
        <b-form-group v-if="inputMode === 'update'" label="등록일" label-for="createdAt" label-cols="3">
          <b-form-input id="createdAt" :value="getCreatedAt" disabled></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: {
        id: null,
        item: null,
        num: null
      },
      userRole: {
        default: 'member' // 기본값
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.User
    },
    inputMode() {
      return this.$store.getters.UserInputMode
    },
    품목등록() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '사용자정보 입력'
      } else if (this.inputMode === 'update') {
        title = '사용자정보 수정'
      }

      return title
    },
    getCreatedAt() {
      return this.user.createdAt && this.item.createdAt.substring(0, 10)
    },
    departmentList() {
      return this.$store.getters.DepartmentList
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.item = { ...value }

      this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.item = { ...this.infoData }

    this.setDefaultValues() // 기본값 세팅

    this.$store.dispatch('actDepartmentList') // 부서정보 조회
  },
  methods: {
    onSubmit() {
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actUserInsert', this.item) // 입력 실행
      }

      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actUserUpdate', this.item) // 수정 실행
      }
    },
    setDefaultValues() {
      // 기본값 세팅
      if (this.inputMode === 'insert') {
        this.item.role = this.userRole.default // 사용자 권한
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
