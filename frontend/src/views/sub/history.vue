<template>
  <div class="test">
    <h2>완료이력</h2>
    <b-col>
      <b-button class="btn1" variant="dark" size="sm" @click="onClickAddNew">신규등록</b-button>
    </b-col>
    <div>
      <b-table small hover striped :items="items" :fields="fields">
        <template #cell(btn)="row" class="btn">
          <b-button size="sm" variant="dark" @click="onClickEdit(row.item.id)">중단이력</b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
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
      ],
      items: [
        {
          id: '1',
          name: '이주현',
          device: 'ASP001',
          item: '마스크',
          num: '1004',
          good: '1004',
          bad: '0',
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
          good: '0',
          bad: '104',
          startTime: '2022-03-22 09:00',
          btn: ''
        },
        {
          id: '3',
          name: '유지영',
          device: 'ASP003',
          item: '마스크',
          num: '10',
          good: '5',
          bad: '5',
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
          good: '998',
          bad: '1',
          startTime: '2022-03-22 09:00',
          endTime: '2022-03-22 18:00',
          btn: ''
        }
      ]
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
.btn {
  float: right;
  margin-right: 30px;
}
.btn1 {
  text-align: right;
  margit-right: ;
}
</style>
