<template>
  <div class="test">
    <h2>작업현황</h2>
    <b-col style="text-align: right">
      <b-button style="text-align: right; display: inline-block" variant="dark" size="sm" @click="onClickAddNew"
        >신규등록</b-button
      >
    </b-col>
    <div>
      <b-table small hover striped :items="items" :fields="fields">
        <template #cell(btn)="row">
          <b-button size="sm" variant="dark" @click="onClickEdit(row.item.id)">수정</b-button>
          <b-button size="sm" variant="dark" @click="onClickDelete(row.item.id)">삭제</b-button>
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
        { key: 'name', label: '이름' },
        { key: 'last_name', label: '몰라' },
        { key: 'age', label: '나이' },
        { key: 'btn', label: '비고' }
        // { key: 'deleteBtn', label: '삭제' }
      ],
      items: [
        {
          id: '1',
          first_name: 'sfdsa',
          last_name: 'dfs',
          age: '30',
          btn: ''
        },
        {
          id: '2',
          first_name: 'sfdsa',
          last_name: 'dfs',
          age: '30',
          btn: ''
        },
        {
          id: '3',
          first_name: 'sfdsa',
          last_name: 'dfs',
          age: '30',
          btn: ''
        },
        {
          id: '4',
          first_name: 'sfdsa',
          last_name: 'dfs',
          age: '30',
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
</style>
