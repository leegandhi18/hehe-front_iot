<template>
  <div class="test">
    <h2>품목관리</h2>
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
      <b-table :items="itemList" :fields="fields" style="color: LightGray; text-align: center">
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
        { key: 'id', label: 'ID' },
        { key: 'name', label: '품목' },
        { key: 'quantity', label: '수량' },
        { key: 'itemId', label: '품목계정' },
        { key: 'machineCode', label: '설비코드' },
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
    itemList() {
      return this.$store.getters.ItemList
    },
    insertedResult() {
      return this.$store.getters.ItemInsertedResult
    },
    updatedResult() {
      return this.$store.getters.ItemUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.ItemDeletedResult
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

          this.searchItemList()
        } else {
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updatedResult(value) {
      if (value !== null) {
        if (value > 0) {
          // 수정이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('수정 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchItemList()
        } else {
          // 수정이 실패한 경우
          this.$bvToast.toast('수정이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    deletedResult(value) {
      // 삭제 후 처리
      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('삭제 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchItemList()
        } else {
          // 삭제가 실패한 경우
          this.$bvToast.toast('삭제가 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchItemList()
  },
  methods: {
    searchItemList() {
      this.$store.dispatch('actItemList')
    },
    onClickAddNew() {
      this.$store.dispatch('actItemInputMode', 'insert') // 모달을 띄운다.
      this.$store.dispatch('actItemInit')
      this.$bvModal.show('modal-item-inform')
    },
    onClickEdit(id) {
      // (수정을 위한)상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actItemInputMode', 'update')

      // 2. 상세정보 호출
      this.$store.dispatch('actItemInfo', id)

      // 3. 모달 출력
      this.$bvModal.show('modal-item-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$bvModal.msgBoxConfirm('삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actItemDelete', id)
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
