<template>
  <div>
    <b-modal id="modal-machine-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="id" label-for="code" label-cols="3">
          <b-form-input id="id" v-model="machine.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="설비" label-for="device" label-cols="3">
          <b-form-input id="device" v-model="machine.device"></b-form-input>
        </b-form-group>
        <b-form-group label="작동상태" label-for="item" label-cols="3">
          <b-form-input id="state" v-model="machine.state"></b-form-input>
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
      machine: {
        id: null,
        device: null,
        state: null
      },
      MachineRole: {
        default: 'member' // 기본값
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Machine
    },
    inputMode() {
      return this.$store.getters.MachineInputMode
    },
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '설비 등록'
      } else if (this.inputMode === 'update') {
        title = '설비 수정'
      }

      return title
    }
    // getCreatedAt() {
    //   return this.Machine.createdAt && this.work.createdAt.substring(0, 10)
    // },
    // machineList() {
    //   return this.$store.getters.MachineList
    // }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.machine = { ...value }

      this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.machine = { ...this.infoData }

    // this.setDefaultValues() // 기본값 세팅

    // this.$store.dispatch('actMachineList') // 부서정보 조회
  },
  methods: {
    onSubmit() {
      // this.$store.dispatch('actMachineInsert', this.machine) // 입력 실행
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actMachineInsert', this.machine) // 입력 실행
      }
      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actMachineUpdate', this.machine) // 수정 실행
      }
    },
    setDefaultValues() {
      // 기본값 세팅
      if (this.inputMode === 'insert') {
        this.work.role = this.MachineRole.default // 사용자 권한
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
