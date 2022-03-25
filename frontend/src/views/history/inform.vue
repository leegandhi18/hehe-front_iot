<template>
  <div>
    <b-modal id="modal-stop-inform" title="중단이력">
      <div>
        <b-form-group label="작업자" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="workStop.name" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="설비코드" label-for="machineCode" label-cols="3">
          <b-form-input id="machineCode" v-model="workStop.machineCode" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="중단이력시간" label-for="time" label-cols="3">
          <b-form-input id="time" v-model="workStop.time" disabled></b-form-input>
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
      workStop: {
        name: null,
        machineCode: null,
        time: null
      },
      userRole: {
        default: 'member' // 기본값
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.WorkStop
    },
    workStopList() {
      return this.$store.getters.WorkStopList
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.workStop = { ...value }

      this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.workStop = { ...this.infoData }
    console.log(this.infoData)

    this.setDefaultValues() // 기본값 세팅

    this.$store.dispatch('actWorkStopInfo') // 중단이력 조회
  },
  methods: {
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
