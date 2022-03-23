<template>
  <div class="test">
    <h2>설비관리</h2>
    <b-col style="text-align: right; padding: 0; margin-bottom: 10px">
      <b-col style="text-align: left"><b-button variant="primary" size="sm">검색</b-button></b-col>
      <b-button
        class="btn1"
        variant="dark"
        size="sm"
        style="display: inline-block; float: none; margin: 0"
        @click="onClickAddNew"
        >신규등록</b-button
      >
    </b-col>
    <div>
      <b-table small hover striped :items="machineList" :fields="fields" style="text-align: center">
        <template #cell(btn)="row" class="btn">
          <b-button size="sm" variant="dark" class="item_btn" @click="onClickEdit(row.item.id)">수정</b-button>
          <b-button size="sm" variant="dark" @click="onClickDelete(row.item.id)">삭제</b-button>
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
      fields: [
        { key: 'id', label: 'id' },
        { key: 'device', label: '설비' },
        { key: 'state', lable: '작동상태' },
        { key: 'btn', label: '비고' }
      ]
      // items: [
      //   { id: '1', 설비: 'ASP001', state: '작동' },
      //   { id: '2', 설비: 'ASP002', state: '작동' },
      //   { id: '3', 설비: 'ASP003', state: '중지' }
      // ]
    }
  },
  computed: {
    machineList() {
      return this.$store.getters.MachineList
    },
    insertedResult() {
      return this.$store.getters.MachineInsertedResult
    }
  },
  watch: {
    insertedResult(value) {
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast('등록 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          this.searchMachineList()
        } else {
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchMachineList()
  },
  methods: {
    searchMachineList() {
      this.$store.dispatch('actMachineList')
    },
    onClickAddNew() {
      this.$bvModal.show('modal-machine-inform') // 모달을 띄운다.
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
table td:last-child {
  width: 17%;
}
.item_btn {
  margin-right: 5px;
}
</style>
