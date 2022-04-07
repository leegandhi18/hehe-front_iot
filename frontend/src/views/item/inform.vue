<template>
  <div>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <b-modal id="modal-item-inform" :title="getTitle" @ok="handleSubmit(onSubmit)">
        <div>
          <b-form-group v-if="inputMode === 'update'" label="ID" label-for="id" label-cols="3">
            <b-form-input id="id" v-model="item.id" disabled></b-form-input>
          </b-form-group>
          <validation-provider name="품목" :rules="{ required: true, min: 2 }" v-slot="validationContext">
            <b-form-group label="품목" label-for="name" label-cols="3">
              <b-form-input
                id="name"
                name="name"
                v-model="item.name"
                :state="getValidationState(validationContext)"
                aria-describedby="input-1-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider name="수량" :rules="{ required: true }" v-slot="validationContext">
            <b-form-group label="수량" label-for="quantity" label-cols="3">
              <b-form-input
                type="number"
                id="quantity"
                name="quantity"
                v-model="item.quantity"
                :state="getValidationState(validationContext)"
                aria-describedby="input-2-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-2-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider name="품목계정" :rules="{ required: true }" v-slot="validationContext">
            <b-form-group label="품목계정" label-for="itemId" label-cols="3">
              <b-form-select
                id="itemId"
                name="itemId"
                v-model="item.itemId"
                :state="getValidationState(validationContext)"
                aria-describedby="input-3-live-feedback"
                value-field="itemId"
                text-field="itemId"
              >
                <template #first>
                  <b-form-select-option :value="null">-- 품목계정을 선택해 주세요 --</b-form-select-option>
                  <b-form-select-option value="완제품">완제품</b-form-select-option>
                  <b-form-select-option value="재료">재료</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-invalid-feedback id="input-3-live-feedback">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </validation-provider>
          <validation-provider name="설비" :rules="{ required: true }" v-slot="validationContext">
            <b-form-group label="설비" label-for="code" label-cols="3">
              <b-form-select
                id="code"
                name="code"
                v-model="item.machineCode"
                :options="machineList"
                :state="getValidationState(validationContext)"
                aria-describedby="input-4-live-feedback"
                value-field="code"
                text-field="code"
              >
                <template #first>
                  <b-form-select-option :value="null">-- 설비를 선택해 주세요 --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-invalid-feedback id="input-4-live-feedback">
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </validation-provider>
        </div>
      </b-modal>
    </validation-observer>
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
      machine: {
        id: null,
        code: null
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
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    resetForm() {
      this.item = {
        id: null
      }

      this.$nextTick(() => {
        this.$refs.observer.reset()
      })
    },
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
