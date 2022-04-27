<template>
  <div>
    <b-modal id="modal-item-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="ID" label-for="id" label-cols="3">
          <b-form-input id="id" v-model="item.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="품목계정" label-for="itemId" label-cols="3">
          <b-form-select
            id="itemId"
            v-model="item.itemId"
            name="itemId"
            value-field="itemId"
            text-field="itemId"
            placeholder="품목계정을 입력하세요."
          >
            <template #first>
              <b-form-select-option :value="null">-- 품목계정을 선택해 주세요. --</b-form-select-option>
              <b-form-select-option value="완제품">완제품</b-form-select-option>
              <b-form-select-option value="재료">재료</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group label="설비" label-for="code" label-cols="3">
          <b-form-select
            id="code"
            v-model="item.machineCode"
            name="code"
            :options="machineList"
            value-field="code"
            text-field="code"
          >
            <template #first>
              <b-form-select-option :value="null">-- 설비를 선택해 주세요. --</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group label="품목" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="item.name" name="name" placeholder="품목명을 입력하세요."></b-form-input>
        </b-form-group>
        <b-form-group label="수량" label-for="quantity" label-cols="3">
          <b-form-input
            id="quantity"
            v-model="item.quantity"
            type="number"
            name="quantity"
            placeholder="수량을 입력하세요."
          ></b-form-input>
        </b-form-group>
        <b-form-group v-if="item.itemId == '완제품'" label="컬러 센서" label-for="No2Mode" label-cols="3">
          <b-form-radio-group id="No2Mode" v-model="item.No2Mode" :options="no2Mode.options" />
        </b-form-group>
        <b-form-group v-if="item.itemId == '완제품'" label="양품 기준" label-for="DiceComparisonValue" label-cols="3">
          <b-form-select id="DiceComparisonValue" v-model="item.DiceComparisonValue" :options="dice.options">
            <template #first>
              <b-form-select-option :value="null">-- 기준값을 선택해 주세요. --</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
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
        machineCode: null,
        No2Mode: null,
        DiceComparisonValue: null
      },
      machine: {
        id: null,
        code: null
      },
      no2Mode: {
        options: [
          { value: '0', text: '하얀색 선별' },
          { value: '1', text: '비선별' }
        ]
      },
      dice: {
        options: [
          { value: 0, text: 0 },
          { value: 1, text: 1 },
          { value: 2, text: 2 },
          { value: 3, text: 3 },
          { value: 4, text: 4 },
          { value: 5, text: 5 },
          { value: 6, text: 6 }
        ]
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
    },
    machineList() {
      return this.$store.getters.MachineList
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.item = { ...value }

      // this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.item = { ...this.infoData }
    // 설비리스트 조회
    this.$store.dispatch('actMachineList')
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      // 1. 등록인 경우
      if (this.item.itemId == '완제품' && this.inputMode === 'insert') {
        if (
          this.item.name &&
          this.item.quantity !== null &&
          this.item.itemId &&
          this.item.machineCode &&
          this.item.No2Mode &&
          this.item.DiceComparisonValue !== null
        ) {
          await this.$store.dispatch('actItemInsert', this.item) // 입력 실행
          this.$bvModal.hide('modal-item-inform')
          return true
        } else if (
          !this.item.name ||
          this.item.quantity == null ||
          !this.item.itemId ||
          !this.item.machineCode ||
          !this.item.No2Mode ||
          this.item.DiceComparisonValue == null
        ) {
          alert('완제품 입력을 완료하지 않았습니다. 다시 확인해주세요.')
          return false
        }
      } else if (this.item.itemId === '재료' && this.inputMode === 'insert') {
        if (this.item.name && this.item.quantity !== null && this.item.itemId && this.item.machineCode) {
          await this.$store.dispatch('actItemInsert', this.item) // 입력 실행
          this.$bvModal.hide('modal-item-inform')
          return true
        } else if (!this.item.name || this.item.quantity == null || !this.item.itemId || !this.item.machineCode) {
          alert('재료 입력을 완료하지 않았습니다. 다시 확인해주세요.')
          return false
        }
        // 2. 수정인 경우
      } else if (this.item.itemId == '완제품' && this.inputMode === 'update') {
        if (
          this.item.name &&
          this.item.quantity !== null &&
          this.item.itemId &&
          this.item.machineCode &&
          this.item.No2Mode &&
          this.item.DiceComparisonValue !== null
        ) {
          await this.$store.dispatch('actItemUpdate', this.item) // 입력 실행
          this.$bvModal.hide('modal-item-inform')
          return true
        } else if (
          !this.item.name ||
          this.item.quantity == null ||
          !this.item.itemId ||
          !this.item.machineCode ||
          !this.item.No2Mode ||
          this.item.DiceComparisonValue == null
        ) {
          alert('완제품 입력을 완료하지 않았습니다. 다시 확인해주세요.')
          return false
        }
      } else if (this.item.itemId === '재료' && this.inputMode === 'update') {
        if (this.item.name && this.item.quantity !== null && this.item.itemId && this.item.machineCode) {
          await this.$store.dispatch('actItemUpdate', this.item) // 입력 실행
          this.$bvModal.hide('modal-item-inform')
          return true
        } else if (!this.item.name || this.item.quantity == null || !this.item.itemId || !this.item.machineCode) {
          alert('재료 입력을 완료하지 않았습니다. 다시 확인해주세요.')
          return false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
