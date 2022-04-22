<template>
  <div>
    <b-modal id="modal-stop-inform" title="중단이력">
      <div>
        <b-form-group label="작업자" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="workStop.name" disabled></b-form-input>
        </b-form-group>
        <!-- <b-form-group label="설비코드" label-for="machineCode" label-cols="3">
          <b-form-input id="machineCode" v-model="workStop.machineCode" disabled></b-form-input>
        </b-form-group> -->
        <b-form-group label="중단이력시간" label-for="time" label-cols="3">
          <b-form-input id="time" v-model="workStop.time" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="중단 사유" label-for="description" label-cols="3">
          <b-form-input id="description" v-model="workStop.description" disabled></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      WorkHistory: {
        id: null,
        workNum: null,
        name: null,
        machineCode: null,
        itemName: null,
        totalQuantity: null,
        goodQuantity: null,
        badQuantity: null,
        startTime: null,
        endTime: null,
        time: null,
        workStatus: null,
        emoHistory: null
      },
      workStop: {
        workNum: null,
        name: null,
        machineCode: null,
        time: null,
        description: null
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
      // console.log('모달 열리고 감지되는 데이터', this.workStop)
    }
  },
  created() {
    this.workStop = { ...this.infoData }
  }
}
</script>

<style lang="scss" scoped></style>
