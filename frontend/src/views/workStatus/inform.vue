<template>
  <div>
    <b-modal id="modal-work-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="ID" label-for="id" label-cols="3">
          <b-form-input id="id" v-model="work.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="작업자" label-for="name" label-cols="3">
          <b-form-select
            v-if="tokenUserRole == '관리자'"
            id="name"
            v-model="work.name"
            :options="userList"
            value-field="name"
            text-field="name"
          >
          </b-form-select>
          <b-form-select
            v-else-if="tokenUserRole == '작업자'"
            id="name"
            v-model="work.name"
            :options="userList"
            value-field="name"
            text-field="name"
            disabled
          >
          </b-form-select>
          <!-- <b-form-input v-if="tokenUserRole == '관리자'" id="name" v-model="work.name"></b-form-input>
          <b-form-input v-else-if="tokenUserRole == '작업자'" id="name" v-model="work.name" disabled></b-form-input> -->
        </b-form-group>
        <!-- <b-form-group label="설비" label-for="code" label-cols="3">
          <b-form-select
            id="code"
            v-model="work.machineCode"
            :options="machineList"
            value-field="code"
            text-field="code"
          >
            <template #first>
              <b-form-select-option :value="null">-- 설비를 선택해 주세요. --</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group> -->
        <!-- <b-form-group label="작업상태" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="work.name"></b-form-input>
        </b-form-group> -->
        <b-form-group label="품목" label-for="name" label-cols="3">
          <b-form-select
            id="name"
            v-model="work.itemName"
            :options="itemList.filter(item => item.itemId === '완제품')"
            value-field="name"
            text-field="name"
          >
            <template #first>
              <b-form-select-option :value="null">-- 품목을 선택해 주세요. --</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group label="수량" label-for="productQuantity" label-cols="3">
          <b-form-select id="productQuantity" v-model="work.productQuantity" :options="options">
            <template #first>
              <b-form-select-option :value="null">-- 수량을 선택해 주세요. --</b-form-select-option>
            </template>
          </b-form-select>
          <!-- <b-form-input
            id="productQuantity"
            v-model="work.productQuantity"
            type="number"
            min="1"
            max="5"
            placeholder="1 ~ 5 사이의 숫자를 넣으시오."
          >
          </b-form-input> -->
        </b-form-group>
        <b-form-group label="작업시작 시간" label-for="startTime" label-cols="3">
          <input v-model="work.startTime" type="datetime-local" style="width: 100%" />
          <!-- <b-form-input v-model="work.startTime" type="datetime" start-time-></b-form-input> -->
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 }
      ],
      work: {
        id: null,
        name: null,
        machineCode: null,
        itemName: null,
        productQuantity: null,
        startTime: null,
        endTime: null
      },
      user: {
        id: null,
        name: null,
        password: null,
        role: null,
        phone: null
      },
      machine: {
        id: null,
        code: null
      },
      item: {
        id: null,
        name: null,
        quantity: null,
        itemId: null,
        machineCode: null,
        No2Mode: null,
        DiceComparisonValue: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Work
    },
    inputMode() {
      return this.$store.getters.WorkInputMode
    },
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '작업지시서 등록'
      } else if (this.inputMode === 'update') {
        title = '작업지시서 수정'
      }
      return title
    },
    workStatusList() {
      return this.$store.getters.WorkStatusList
    },
    userList() {
      return this.$store.getters.UserList
    },
    machineList() {
      return this.$store.getters.MachineList
    },
    itemList() {
      return this.$store.getters.ItemList && this.$store.getters.ItemList.itemId == '완제품'
    },
    tokenUserRole() {
      return this.$store.getters.TokenUser && this.$store.getters.TokenUser.role
    },
    tokenUser() {
      return this.$store.getters.TokenUser
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.work = { ...value }
      // console.log('value', value)
      // console.log('this.work', this.work)
      // const aaa = this.$store.getters.TokenUser
      // console.log('aaa', aaa)
      // 로그인한 사용자의 name(이름값)을 신규등록 폼에 세팅한다.
      if (this.inputMode == 'update') {
        this.work.name = value.name
      } else if (this.inputMode == 'insert') {
        this.work.name = this.$store.getters.TokenUser.name
      }
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.work = { ...this.infoData }

    // this.setDefaultValues() // 기본값 세팅

    this.$store.dispatch('actUserList') // 사용자 정보 조회
    this.$store.dispatch('actMachineList') // 설비 정보 조회
    this.$store.dispatch('actItemList') // 품목 정보 조회
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      // 1. 등록인 경우
      if (
        this.work.name &&
        this.work.itemName &&
        this.work.productQuantity &&
        this.work.startTime &&
        this.inputMode === 'insert'
      ) {
        await this.$store.dispatch('actWorkInsert', this.work) // 입력 실행
        this.$bvModal.hide('modal-work-inform')
        return true
      } else if (!this.work.name || !this.work.itemName || !this.work.productQuantity || !this.work.startTime) {
        alert('입력을 완료하지 않았습니다. 다시 확인해주세요.')
        return false
      }
      // 2. 수정인 경우
      if (
        this.work.name &&
        this.work.itemName &&
        this.work.productQuantity &&
        this.work.startTime &&
        this.inputMode === 'update'
      ) {
        await this.$store.dispatch('actWorkUpdate', this.work) // 입력 실행
        this.$bvModal.hide('modal-work-inform')
        return true
      } else if (!this.work.name || !this.work.itemName || !this.work.productQuantity || !this.work.startTime) {
        alert('입력을 완료하지 않았습니다. 다시 확인해주세요.')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
