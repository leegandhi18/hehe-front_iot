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
        <template #cell(updateBtn)="row">
          <b-button size="sm" variant="success" @click="onClickEdit(row.item.id)">수정</b-button>
        </template>
        <template #cell(deleteBtn)="row">
          <b-button size="sm" variant="danger" @click="onClickDelete(row.item.id)">삭제</b-button>
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
      fields: ['first_name', 'last_name', 'age', 'test'],
      items: [
        {
          id: '1',
          first_name: 'sfdsa',
          last_name: 'dfs',
          age: '30',
          test: ''
        },
        {
          id: '2',
          first_name: 'sfdsa',
          last_name: 'dfs',
          age: '30',
          test: ''
        },
        {
          id: '3',
          first_name: 'sfdsa',
          last_name: 'dfs',
          age: '30',
          test: ''
        },
        {
          id: '4',
          first_name: 'sfdsa',
          last_name: 'dfs',
          age: '30',
          test: ''
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
