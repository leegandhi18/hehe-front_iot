<template>
  <div class="test">
    <h2>작업현황</h2>
    <b-col style="text-align: right; padding: 0; margin-bottom: 10px">
      <!-- <b-button
        class="btn1"
        variant="dark"
        size="sm"
        style="display: inline-block; float: none; margin: 0"
        @click="searchWorkStatusList()"
        >검색</b-button
      > -->
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
      <b-table small hover striped :items="workStatusList" :fields="fields" style="text-align: center">
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
      ]
    }
  },
  computed: {
    workStatusList() {
      return this.$store.getters.WorkStatusList
    },
    workInsertedResult() {
      return this.$store.getters.WorkInsertedResult
    },
    workUpdatedResult() {
      return this.$store.getters.WorkUpdatedResult
    },
    workDeletedResult() {
      return this.$store.getters.WorkDeletedResult
    }
  },
  watch: {
    workInsertedResult(value) {
      // 등록 후 처리
      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('등록 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchWorkStatusList()
        } else {
          // 등록이 실패한 경우
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    workUpdatedResult(value) {
      // 수정 후 처리
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
          this.searchWorkStatusList()
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
    workDeletedResult(value) {
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
          this.searchWorkStatusList()
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
    this.searchWorkStatusList()
  },
  methods: {
    searchWorkStatusList() {
      this.$store.dispatch('actWorkStatusList')
    },
    onClickAddNew() {
      // 신규 등록
      // 1. 입력모드 설정
      this.$store.dispatch('actWorkInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actWorkInit')

      // 3. 모달 출력
      this.$bvModal.show('modal-work-inform')
    },
    onClickEdit(id) {
      // (수정을 위한)상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actWorkInputMode', 'update')

      // 2. 상세정보 호출
      this.$store.dispatch('actWorkInfo', id)

      // 3. 모달 출력
      this.$bvModal.show('modal-work-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$bvModal.msgBoxConfirm('삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actWorkDelete', id)
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
