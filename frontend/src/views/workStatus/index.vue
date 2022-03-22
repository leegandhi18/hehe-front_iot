<template>
  <div class="test">
    <h2>작업현황</h2>
    <b-col style="text-align: right; padding: 0; margin-bottom: 10px">
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
      <b-table small hover striped :items="items" :fields="fields" style="text-align: center">
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
    // eslint-disable-next-line vue/no-unused-components
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
        { key: 'num', label: '수량' },
        { key: 'startTime', label: '시작시간' },
        { key: 'endTime', label: '종료시간' },
        { key: 'btn', label: '비고' }
        // { key: 'deleteBtn', label: '삭제' }
      ],
      items: [
        {
          id: '1',
          name: '이주현',
          device: 'ASP001',
          item: '마스크',
          num: '1004',
          startTime: '2022-03-22 09:00',
          endTime: '2022-03-22 18:00',
          btn: ''
        },
        {
          id: '2',
          name: '이다운',
          device: 'ASP002',
          item: '마스크',
          num: '104',
          startTime: '2022-03-22 09:00',
          btn: ''
        },
        {
          id: '3',
          name: '유지영',
          device: 'ASP003',
          item: '마스크',
          num: '10',
          startTime: '2022-03-22 09:00',
          endTime: '2022-03-22 18:00',
          btn: ''
        },
        {
          id: '4',
          name: '김예찬',
          device: 'ASP004',
          item: '마스크',
          num: '999',
          startTime: '2022-03-22 09:00',
          endTime: '2022-03-22 18:00',
          btn: ''
        }
      ]
    }
  },
  methods: {
    onClickAddNew() {
      // 신규등록

      // 1. 입력모드 설정
      this.$store.dispatch('actUserInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actUserInit')

      // 3. 모달 출력
      this.$bvModal.show('modal-user-inform')
    },
    onClickEdit(id) {
      // (수정을 위한)상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actUserInputMode', 'update')

      // 2. 상세정보 호출
      this.$store.dispatch('actUserInfo', id)

      // 3. 모달 출력
      this.$bvModal.show('modal-user-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$bvModal.msgBoxConfirm('삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actUserDelete', id)
        }
      })
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
