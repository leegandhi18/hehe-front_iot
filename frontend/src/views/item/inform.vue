<template>
  <div>
    <b-modal id="modal-item-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="id" label-for="id" label-cols="3">
          <b-form-input id="id" v-model="item.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="품목" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="item.name"></b-form-input>
        </b-form-group>
        <b-form-group label="수량" label-for="quantity" label-cols="3">
          <b-form-input id="quantity" v-model="item.quantity"></b-form-input>
        </b-form-group>
        <b-form-group label="품목계정" label-for="itemId" label-cols="3">
          <b-form-input id="itemId" v-model="item.itemId"></b-form-input>
        </b-form-group>
        <b-form-group label="설비코드" label-for="machineCode" label-cols="3">
          <b-form-input id="machineCode" v-model="item.machineCode"></b-form-input>
        </b-form-group>
        <!-- <b-form-group v-if="inputMode === 'update'" label="등록일" label-for="createdAt" label-cols="3">
          <b-form-input id="createdAt" :value="getCreatedAt" disabled></b-form-input>
        </b-form-group> -->
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        id: null,
        name: null,
        quantity: null,
        itemId: null,
        machineCode: null
      },
      userRole: {
        default: 'member' // 기본값
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Item
    },
    inputMode() {
      return this.$store.getters.ItemInputMode
    },
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '품목 등록'
      } else if (this.inputMode === 'update') {
        title = '품목 수정'
      }

      return title
    }
    // getCreatedAt() {
    //   return this.Item.createdAt && this.work.createdAt.substring(0, 10)
    // },
    // ItemList() {
    //   return this.$store.getters.ItemList
    // }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.item = { ...value }

      this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.item = { ...this.infoData }

    // this.setDefaultValues() // 기본값 세팅

    // this.$store.dispatch('actItemList') // 부서정보 조회
  },
  methods: {
    onSubmit() {
      // this.$store.dispatch('actItemInsert', this.Item) // 입력 실행
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actItemInsert', this.item) // 입력 실행
      }
      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actItemUpdate', this.item) // 수정 실행
      }
    },
    setDefaultValues() {
      // 기본값 세팅
      if (this.inputMode === 'insert') {
        this.item.role = this.ItemRole.default // 사용자 권한
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
