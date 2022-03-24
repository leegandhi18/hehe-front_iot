<template>
  <div class="test">
    <h2>완료이력</h2>
    <div>
      <b-table small hover striped :items="workHistoryList" :fields="fields" style="text-align: center">
        <template #cell(btn)="row">
          <b-button class="btn" size="sm" variant="dark" @click="onClickRead(row.item.id)">중단이력</b-button>
        </template>
      </b-table>
      {{ workHistoryList }}
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
        { key: 'id' },
        { key: 'name', label: '작업자' },
        { key: 'device', label: '설비' },
        { key: 'item', label: '품목' },
        { key: 'num', label: '생산 수량' },
        { key: 'good', label: '양품' },
        { key: 'bad', label: '불량품' },
        { key: 'startTime', label: '시작시간' },
        { key: 'endTime', label: '종료시간' },
        { key: 'btn', label: '중단이력' }
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
