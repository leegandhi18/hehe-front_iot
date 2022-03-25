<template>
  <div>
    <b-modal id="modal-work-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="id" label-for="code" label-cols="3">
          <b-form-input id="id" v-model="work.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="작업자" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="work.name"></b-form-input>
        </b-form-group>
        <b-form-group label="설비" label-for="device" label-cols="3">
          <b-form-input id="device" v-model="work.device"></b-form-input>
        </b-form-group>
        <b-form-group label="품목" label-for="itemName" label-cols="3">
          <b-form-input id="itemName" v-model="work.itemName"></b-form-input>
        </b-form-group>
        <b-form-group label="수량" label-for="productQuantity" label-cols="3">
          <b-form-input id="productQuantity" v-model="work.productQuantity"></b-form-input>
        </b-form-group>
        <b-form-group label="작업시작 시간" label-for="startTime" label-cols="3">
          <input v-model="work.startTime" type="datetime-local" style="width: 100%" />
          <!-- <b-form-input v-model="work.startTime" type="datetime" start-time-></b-form-input> -->
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      work: {
        id: null,
        name: null,
        itemName: null,
        productQuantity: null,
        startTime: null,
        endTime: null
      }
      // userRole: {
      //   default: 'member' // 기본값
      // }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Work
    },
    inputMode() {
      return this.$store.getters.WorkInputMode
    },
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '작업지시서 등록'
      } else if (this.inputMode === 'update') {
        title = '작업지시서 수정'
      }
      return title
    },
    getCreatedAt() {
      return this.work.createdAt && this.work.createdAt.substring(0, 10)
    },
    workStatusList() {
      return this.$store.getters.WorkStatusList
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.work = { ...value }

      this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.work = { ...this.infoData }
    console.log(this.infoData)

    this.setDefaultValues() // 기본값 세팅
  },
  methods: {
    // onSubmit() {
    //   this.$store.dispatch('actWorkInsert', this.work) // 부서입력 실행
    //   console.log(this.work)
    // }
    onSubmit() {
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actWorkInsert', this.work) // 입력 실행
      }

      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actWorkUpdate', this.work) // 수정 실행
      }
    },
    setDefaultValues() {
      // 기본값 세팅
      if (this.inputMode === 'insert') {
        this.work.role = this.workRole.default // 사용자 권한
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
