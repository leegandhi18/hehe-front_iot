<template>
  <div>
    <b-modal id="modal-stop-inform" title="작업 중단" @ok="onSubmit">
      <div>
        <b-form-group label="작업 중단 사유" label-for="description" label-cols="3">
          <b-form-input
            id="description"
            v-model="workStop.description"
            placeholder="중단 사유를 입력하시오."
          ></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import mqtt from 'mqtt'

export default {
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
        description: null,
        workStatus: null
      },
      connection: {
        host: '220.90.129.47',
        port: 8088,
        reconnectPeriod: 10 * 1000,
        // Certification Information
        clientId: 'mqtt_buttons_from_stopinform'
      },
      client: {
        connected: false
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Work
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.workStop = { ...value }
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.workStop = { ...this.infoData }
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
    async onSubmit() {
      // console.log('작업 중단')
      // 작업 중단 버튼을 누른 해당 리스트 상세 조회
      this.work = this.$store.getters.Work
      // console.log('중단된 작업 정보', this.work)

      // workStatus의 작업상태를 바꿔준다.
      // 작업 중단
      this.work.workStatus = 3
      // console.log('this.work', this.work)
      this.work.workNum = this.work.id
      // console.log('this.work.id', this.work.id)
      // console.log('중단버튼 누를 시 workNum', this.work.workNum)
      this.work.endTime = new Date().toISOString()
      this.work.time = new Date().toISOString()
      this.work.description = this.workStop.description
      // console.log('work.endTime', this.work.endTime)
      // console.log('work.Time', this.work.time)

      // 정지 후 리셋하도록 publish
      let plcPublish = `{"tagId":"50", "value":"1"}-{"tagId":"8", "value":"1"}`
      await this.client.publish('UVC-EDU-outside', plcPublish)
      if (this.client.publish) {
        this.$bvToast.toast('작업을 시작합니다.', {
          title: 'SUCCESS',
          variant: 'info',
          solid: true
        })
      }

      // // 정지 후 리셋하도록 publish
      // await this.client.publish('UVC-EDU-outside', '{"tagId":"50", "value":"1"}')
      // if (this.client.publish) {
      //   this.$bvToast.toast('작업을 중단하였습니다.', {
      //     title: '작업 중단',
      //     variant: 'danger',
      //     solid: true
      //   }),
      //     this.client.publish('UVC-EDU-outside', '{"tagId":"8", "value":"1"}')
      // }

      // 바꿔준 work의 값을 수정해준다.
      await this.$store.dispatch('actWorkUpdate', this.work)
      await this.$store.dispatch('actItemQuantityUpdate', this.work) // 품목 수량 최신화
      await this.$store.dispatch('actWorkHistoryInsert', this.work) // 완료이력에 남긴다
      // console.log('중단 이력에 넘겨준 데이터', this.work)

      // 바꿔준 work의 값을 수정해준다.
      await this.$store.dispatch('actWorkStopInsert', this.work) // 작업 중단
    }
  }
}
</script>

<style lang="scss" scoped></style>
