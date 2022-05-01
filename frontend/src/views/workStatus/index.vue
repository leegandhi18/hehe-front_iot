<template>
  <div class="test">
    <h2>작업현황</h2>
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
      <h2>작업중 리스트</h2>
      <b-table :items="workingList" :fields="workingFields" style="color: LightGray; text-align: center">
        <template #cell(startTime)="row">
          {{ row.item.startTime.substring(0, 16) }}
        </template>
        <template #cell(control)="row" class="control">
          <b-button size="sm" variant="dark" class="item_btn" @click="onClickStop(row.item.id)">작업 중단</b-button>
          <b-button size="sm" variant="dark" class="item_btn" @click="onClickComplete(row.item.id)">작업 완료</b-button>
        </template>
        <!-- <template #cell(btn)="row" class="btn">
          <b-button size="sm" variant="dark" class="item_btn" @click="onClickEdit(row.item.id)">수정</b-button>
          <b-button size="sm" variant="dark" @click="onClickDelete(row.item.id)">삭제</b-button>
        </template> -->
      </b-table>
    </div>
    <div>
      <h2>작업전 리스트</h2>
      <!-- {{ Date.now() }} -->
      <!-- {{ new Date().toISOString() }} -->
      <b-table :items="beforeWorkingList" :fields="beforeWorkingFields" style="color: LightGray; text-align: center">
        <template #cell(startTime)="row">
          {{ row.item.startTime.substring(0, 16) }}
        </template>
        <template #cell(control)="row" class="control">
          <b-button size="sm" variant="dark" class="item_btn" @click="onClickStart(row.item.id)">작업 시작</b-button>
        </template>
        <template #cell(btn)="row" class="btn">
          <b-button size="sm" variant="dark" class="item_btn" @click="onClickEdit(row.item.id)">수정</b-button>
          <b-button size="sm" variant="dark" @click="onClickDelete(row.item.id)">삭제</b-button>
        </template>
      </b-table>
    </div>
    <inform />
    <inform2 />
  </div>
</template>

<script>
import inform from './inform.vue'
import inform2 from './inform2.vue'
import mqtt from 'mqtt'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    inform: inform,
    inform2: inform2
  },
  data() {
    return {
      work: {
        id: null,
        workNum: null,
        name: null,
        machineCode: null,
        itemName: null,
        productQuantity: null,
        totalQuantity: null,
        goodQuantity: null,
        badQuantity: null,
        startTime: null,
        endTime: null,
        time: null,
        workStatus: null,
        description: null
      },
      item: {
        id: null,
        name: null,
        quantity: null,
        itemId: null,
        machineCode: null,
        No2Mode: null,
        DiceComparisonValue: null
      },
      beforeWorkingFields: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: '작업자' },
        // { key: 'machineCode', label: '설비' },
        { key: 'itemName', label: '품목' },
        { key: 'productQuantity', label: '수량' },
        { key: 'startTime', label: '시작시간' },
        { key: 'control', label: '작업상태 제어' },
        { key: 'btn', label: '비고' }
        // { key: 'workStatus', label: '작업상태' }
        // { key: 'deleteBtn', label: '삭제' }
      ],
      workingFields: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: '작업자' },
        // { key: 'machineCode', label: '설비' },
        { key: 'itemName', label: '품목' },
        { key: 'productQuantity', label: '수량' },
        { key: 'startTime', label: '시작시간' },
        { key: 'control', label: '작업상태 제어' }
        // { key: 'btn', label: '비고' }
        // { key: 'workStatus', label: '작업상태' }
        // { key: 'deleteBtn', label: '삭제' }
      ],
      connection: {
        host: '220.90.129.47',
        port: 8088,
        reconnectPeriod: 10 * 1000,
        // Certification Information
        clientId: 'mqtt_buttons_from_workStatus'
      },
      client: {
        connected: false
      }
    }
  },
  computed: {
    beforeWorkingList() {
      return this.$store.getters.BeforeWorkingList
    },
    workingList() {
      return this.$store.getters.WorkingList
    },
    insertedResult() {
      return this.$store.getters.WorkInsertedResult
    },
    updatedResult() {
      return this.$store.getters.WorkUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.WorkDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
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
          this.searchBeforeWorkingList()
          this.searchWorkingList()
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
    updatedResult(value) {
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
          this.searchBeforeWorkingList()
          this.searchWorkingList()
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
          this.searchBeforeWorkingList()
          this.searchWorkingList()
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
    this.searchBeforeWorkingList()
    this.searchWorkingList()
    this.createConnection()
  },
  methods: {
    // Create connection
    createConnection() {
      const { host, port, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}/mqtt`
      try {
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        // console.log('버튼 연결 완료!')
      })
      this.client.on('error', error => {
        console.log('버튼 연결 실패', error)
      })
    },
    searchBeforeWorkingList() {
      this.$store.dispatch('actBeforeWorkingList')
    },
    searchWorkingList() {
      this.$store.dispatch('actWorkingList')
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
    },
    async onClickStart(id) {
      // console.log('작업 시작')
      // 작업 시작 버튼을 누른 해당 리스트 상세 조회
      await this.$store.dispatch('actWorkInfo', id)
      this.work = this.$store.getters.Work
      // console.log('work.itemName', this.work.itemName)
      // 작업 시작 버튼을 누르면 해당 품목의 정보를 가져온다
      await this.$store.dispatch('actProductInfo', this.work.itemName)
      this.item = this.$store.getters.Item
      console.log('this.item info', this.item)
      // console.log('real itemName', this.item.name)
      console.log('this.work.productQuantity', this.work.productQuantity)
      console.log('this.item.No2Mode', this.item.No2Mode)
      console.log('this.item.DiceComparisonValue', this.item.DiceComparisonValue)

      // workStatus의 작업상태를 1로 바꿔준다.
      this.work.workStatus = 1
      this.work.workNum = id
      // console.log('시작버튼 누를 시 workNum', this.work.workNum)

      // 바꿔준 work의 값을 수정해준다.
      await this.$store.dispatch('actWorkUpdate', this.work) // 수정 실행
      // console.log('시작버튼 누를 시 데이터', this.work)

      // 작업물품 조건 전달 (조건1, 2, 개수)
      // await this.client.publish('UVC-EDU-outside', `{"tagId":"38", "value":"${this.item.DiceComparisonValue}"}`) // DiceComparisonValue
      // setTimeout(() => {
      //   this.client.publish('UVC-EDU-outside', `{"tagId":"31", "value":"${this.item.No2Mode}"}`) // No2Mode
      // }, 500)
      // setTimeout(() => {
      //   this.client.publish('UVC-EDU-outside', `{"tagId":"36", "value":"${this.work.productQuantity}"}`) // OutputLimit
      // }, 1000)
      // setTimeout(() => {
      //   this.client.publish('UVC-EDU-outside', '{"tagId":"1", "value":"1"}')
      //   if (this.client.publish) {
      //     this.$bvToast.toast('작업을 시작합니다.', {
      //       title: 'SUCCESS',
      //       variant: 'info',
      //       solid: true
      //     })
      //   }
      // }, 1500)
      let plcPublish = `{"tagId":"31", "value":"${this.item.No2Mode}"}-{"tagId":"38", "value":"${this.item.DiceComparisonValue}"}-{"tagId":"36", "value":"${this.work.productQuantity}"}-{"tagId":"1", "value":"1"}`
      await this.client.publish('UVC-EDU-outside', plcPublish)
      if (this.client.publish) {
        this.$bvToast.toast('작업을 시작합니다.', {
          title: 'SUCCESS',
          variant: 'info',
          solid: true
        })
      }
      // await this.client.publish('UVC-EDU-outside', `{"tagId":"31", "value":"${this.item.No2Mode}"}`) // No2Mode
      // await this.client.publish('UVC-EDU-outside', `{"tagId":"38", "value":"${this.item.DiceComparisonValue}"}`) // DiceComparisonValue
      // await this.client.publish('UVC-EDU-outside', `{"tagId":"36", "value":"${this.work.productQuantity}"}`) // OutputLimit

      // // 시작 publish
      // await this.client.publish('UVC-EDU-outside', '{"tagId":"1", "value":"1"}')
      // if (this.client.publish) {
      //   this.$bvToast.toast('작업을 시작합니다.', {
      //     title: 'SUCCESS',
      //     variant: 'info',
      //     solid: true
      //   })
      // }
    },
    async onClickComplete(id) {
      // console.log('작업 완료')
      // 작업 완료 버튼을 누른 해당 리스트 상세 조회
      await this.$store.dispatch('actWorkInfo', id)
      this.work = this.$store.getters.Work

      // workStatus의 작업상태를 바꿔준다. (작업 완료)
      this.work.workStatus = 2
      this.work.workNum = id
      // console.log('완료버튼 누를 시 workNum', this.work.workNum)
      this.work.endTime = new Date().toISOString()
      // console.log('work.endTime', this.work.endTime)

      // 바꿔준 work의 값을 수정해준다.
      await this.$store.dispatch('actWorkUpdate', this.work)
      await this.$store.dispatch('actItemQuantityUpdate', this.work) // 품목 수량 최신화
      await this.$store.dispatch('actWorkHistoryInsert', this.work) // 작업 완료
      // console.log('완료 이력에 넘겨준 데이터', this.work)

      // 완료 되었으니 리셋하도록!
      await this.client.publish('UVC-EDU-outside', '{"tagId":"8", "value":"1"}')
      if (this.client.publish) {
        this.$bvToast.toast('완료된 작업을 확인하였습니다. 기기를 리셋합니다.', {
          title: 'SUCCESS',
          variant: 'info',
          solid: true
        })
      }
    },
    async onClickStop(id) {
      // 작업 중단 버튼을 누른 해당 리스트 상세 조회
      await this.$store.dispatch('actWorkInfo', id)
      // 상세정보 초기화
      await this.$store.dispatch('actWorkStopInit')
      // 작업 중단 모달 생성
      this.$bvModal.show('modal-stop-inform')
      // console.log('작업 중단')
      this.work = this.$store.getters.Work
      this.work.workNum = id
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
div {
  color: LightGray;
}
</style>
