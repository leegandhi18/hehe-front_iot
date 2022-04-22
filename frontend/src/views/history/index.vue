<template>
  <div class="test">
    <h2 style="margin-bottom: 50px; color: LightGray">완료이력</h2>
    <div>
      <b-table :items="workHistoryList" :fields="fields" style="color: LightGray; text-align: center">
        <template #cell(startTime)="row">
          {{ row.item.startTime.substring(0, 16) }}
        </template>
        <template #cell(endTime)="row">
          {{ row.item.startTime.substring(0, 16) }}
        </template>
        <template #cell(emoHistory)="row">
          <b-button class="emoHistory" size="sm" variant="dark" @click="onClickRead(row.item.id)">중단이력</b-button>
        </template>
      </b-table>
    </div>
    <inform />
  </div>
</template>
<script>
import inform from './inform.vue'
export default {
  components: {
    inform: inform
  },
  data() {
    return {
      workStop: {
        id: null,
        workNum: null,
        name: null,
        machineCode: null,
        time: null,
        workStatus: null
      },
      workHistory: {
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
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: '작업자' },
        // { key: 'machineCode', label: '설비코드' },
        { key: 'itemName', label: '품목명' },
        { key: 'totalQuantity', label: '생산량' },
        { key: 'goodQuantity', label: '양품' },
        { key: 'badQuantity', label: '불량품' },
        { key: 'startTime', label: '시작시간' },
        { key: 'endTime', label: '종료시간' },
        // { key: 'workStatus', label: '작업완료상태' },
        { key: 'emoHistory', label: '중단이력' }
        // { key: 'deleteBtn', label: '삭제' }
      ]
    }
  },
  computed: {
    workHistoryList() {
      return this.$store.getters.WorkHistoryList
    },
    infoData() {
      return this.$store.getters.WorkStop
    }
  },
  created() {
    this.searchWorkHistoryList()
  },
  methods: {
    searchWorkHistoryList() {
      this.$store.dispatch('actWorkHistoryList')
    },
    async onClickRead(id) {
      // 중단이력 조회
      await this.$store.dispatch('actWorkStopInfo', id)
      await this.$store.dispatch('actWorkHistoryInfo', id)
      this.workHistory = this.$store.getters.WorkHistory
      // console.log('this.workHistory', this.workHistory)
      // console.log('this.workHistory.workStatus', this.workHistory.workStatus)

      if (this.workHistory.workStatus == 3) {
        this.$bvModal.show('modal-stop-inform')
      } else {
        alert('중단이력이 없습니다.')
      }
    }
  }
}
</script>
<style>
.test {
  margin-top: 50px;
  margin-left: 100px;
  margin-right: 100px;
}
</style>
