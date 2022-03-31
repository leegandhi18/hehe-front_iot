<template>
  <div>
    <b-modal id="modal-work-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="ID" label-for="id" label-cols="3">
          <b-form-input id="id" v-model="work.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="작업자" label-for="name" label-cols="3">
          <b-form-input v-if="tokenUserRole == '1'" id="name" v-model="work.name" disabled></b-form-input>
          <b-form-input v-else-if="tokenUserRole == '0'" id="name" v-model="work.name"></b-form-input>
        </b-form-group>
        <!-- {{ infoData }} -->
        <b-form-group label="설비" label-for="code" label-cols="3">
          <b-form-select
            id="code"
            v-model="work.machineCode"
            :options="machineList"
            value-field="code"
            text-field="code"
          >
            <template #first>
              <b-form-select-option :value="null">-- 설비를 선택해 주세요 --</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <!-- <b-form-group label="작업상태" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="work.name"></b-form-input>
        </b-form-group> -->
        <b-form-group label="품목" label-for="name" label-cols="3">
          <b-form-select id="name" v-model="work.itemName" :options="itemList" value-field="name" text-field="name">
            <template #first>
              <b-form-select-option :value="null">-- 품목을 선택해 주세요 --</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group label="수량" label-for="productQuantity" label-cols="3">
          <b-form-input id="productQuantity" v-model="work.productQuantity"></b-form-input>
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
        machineCode: null
      }
      // userRole: {
      //   default: 'member' // 기본값
      // }
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
    getStartTime() {
      return this.work.startTime && this.work.startTime.substring(0, 10)
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
      return this.$store.getters.ItemList
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
      console.log('value', value)
      console.log('this.work', this.work)

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
    // onSubmit() {
    //   this.$store.dispatch('actWorkInsert', this.work) // 부서입력 실행
    //   console.log(this.work)
    // }
    onSubmit() {
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actWorkInsert', this.work) // 입력 실행
      }

      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actWorkUpdate', this.work) // 수정 실행
      }
    }
    // setDefaultValues() {
    //   // 기본값 세팅
    //   if (this.inputMode === 'insert') {
    //     this.work.role = this.workRole.default // 사용자 권한
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped></style>
