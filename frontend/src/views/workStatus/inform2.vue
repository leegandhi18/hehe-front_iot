<template>
  <div>
    <b-modal id="modal-stop-inform" title="작업 중단" @ok="onSubmit">
      <div>
        <b-form-group label="작업 중단 사유" label-for="description" label-cols="3">
          <b-form-input id="description" v-model="workStop.description"></b-form-input>
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
        workNum: null,
        name: null,
        machineCode: null,
        itemName: null,
        productQuantity: null,
        totalQuantity: null,
        goodQuantity: null,
        badQuantity: null,
        startTime: null,
        endTime: null,
        time: null,
        description: null,
        workStatus: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Work
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.workStop = { ...value }
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.workStop = { ...this.infoData }
  },
  methods: {
    async onSubmit() {
      console.log('작업 중단')
      // 작업 중단 버튼을 누른 해당 리스트 상세 조회
      this.work = this.$store.getters.Work
      console.log('작업 정보', this.work)

      // workStatus의 작업상태를 바꿔준다.
      // 작업 중단
      this.work.workStatus = 3
      console.log('this.work', this.work)
      this.work.workNum = this.work.id
      console.log('this.work.id', this.work.id)
      console.log('중단버튼 누를 시 workNum', this.work.workNum)
      this.work.endTime = new Date().toISOString()
      this.work.time = new Date().toISOString()
      this.work.description = this.workStop.description
      console.log('work.endTime', this.work.endTime)
      console.log('work.Time', this.work.time)

      // 바꿔준 work의 값을 수정해준다.
      await this.$store.dispatch('actWorkUpdate', this.work)
      await this.$store.dispatch('actWorkHistoryInsert', this.work) // 완료이력에 남긴다
      console.log('중단 이력에 넘겨준 데이터', this.work)

      // 바꿔준 work의 값을 수정해준다.
      await this.$store.dispatch('actWorkStopInsert', this.work) // 작업 중단
    }
  }
}
</script>

<style lang="scss" scoped></style>
