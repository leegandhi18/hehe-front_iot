<template>
  <div>
    <b-modal id="modal-machine-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="id" label-for="code" label-cols="3">
          <b-form-input id="id" v-model="machine.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="설비" label-for="code" label-cols="3">
          <b-form-input id="code" v-model="machine.code" placeholder="설비를 등록하시오."></b-form-input>
        </b-form-group>
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
        code: null,
        state: null
      }
      // MachineRole: {
      //   default: 'member' // 기본값
      // }
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
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.machine = { ...value }

      // this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.machine = { ...this.infoData }

    // this.setDefaultValues() // 기본값 세팅
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      // 1. 등록인 경우
      if (this.machine.code && this.inputMode === 'insert') {
        await this.$store.dispatch('actMachineInsert', this.machine) // 입력 실행
        this.$bvModal.hide('modal-machine-inform')
        return true
      } else if (!this.machine.code) {
        alert('입력을 완료하지 않았습니다. 다시 확인해주세요.')
        return false
        // this.error.push('설비를 등록하셔야 합니다.')
      }
      // 2. 수정인 경우
      if (this.machine.code && this.inputMode === 'update') {
        await this.$store.dispatch('actMachineUpdate', this.machine) // 수정 실행
        this.$bvModal.hide('modal-machine-inform')
        return true
      } else if (!this.machine.code) {
        alert('입력을 완료하지 않았습니다. 다시 확인해주세요.')
        return false
      }
    }
    // setDefaultValues() {
    //   // 기본값 세팅
    //   if (this.inputMode === 'insert') {
    //     this.work.role = this.MachineRole.default // 사용자 권한
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped></style>
