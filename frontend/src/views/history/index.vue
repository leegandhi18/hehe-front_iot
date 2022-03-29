<template>
  <div class="test">
    <h2 style="margin-bottom: 50px">완료이력</h2>
    <div>
      <b-table small hover striped :items="workHistoryList" :fields="fields" style="text-align: center">
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
      // Note `isActive` is left out and will not appear in the rendered table
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: '작업자' },
        { key: 'machineCode', label: '설비코드' },
        { key: 'itemName', label: '품목명' },
        { key: 'totalQuantity', label: '생산 수량' },
        { key: 'goodQuantity', label: '양품' },
        { key: 'badQuantity', label: '불량품' },
        { key: 'startTime', label: '시작시간' },
        { key: 'endTime', label: '종료시간' },
        { key: 'workStatus', label: '작업완료상태' },
        { key: 'emoHistory', label: '중단이력' }
        // { key: 'deleteBtn', label: '삭제' }
      ]
    }
  },
  computed: {
    workHistoryList() {
      return this.$store.getters.WorkHistoryList
    }
  },
  created() {
    this.searchWorkHistoryList()
  },
  methods: {
    searchWorkHistoryList() {
      this.$store.dispatch('actWorkHistoryList')
    },
    onClickRead(id) {
      // 중단이력 조회
      this.$store.dispatch('actWorkStopInfo', id)
      // 모달 출력
      this.$bvModal.show('modal-stop-inform')
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
