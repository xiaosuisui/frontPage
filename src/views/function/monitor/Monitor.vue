<template>
  <div style="background:#1d2437;padding: 0; width:100%;height:100%;" :class="routePath==='/home'?'homeStyle':''">
    <!-- 头部-->
    <a-row>
      <a-col :span="24">
        <div class="tubiao2">
          <div class="system-btn">
            <a href="javascript:void(0)" @click="start()"
               class="system-btn-start"></a>
            <!--            <a href="javascript:void(0)" @click="stop()"-->
            <!--               class="system-btn-stop"></a>-->
          </div>
          <div class="logo-text"></div>
          <div class="run-timer" style="right: 282px; font-size: 14px">
            <span :style="{color:plc===1?'#00d48d':'#dd2121'}">PLC通讯</span>
            <img :src="[plc === 1?'./static/img/plc-on.gif':'./static/img/plc-off.png']" alt=""
                 style="margin-left: 10px">
          </div>
          <div class="run-timer">
            <div>
              <img src="../../../assets/images/run-time.png"/>&nbsp;
            </div>
            <div style="font-size: 16px;color: #0f7291">运行时长</div>&nbsp;
            <div class="run-timer-bg">{{plcRunTime}}</div>&nbsp;
            <div style="font-size: 16px;color: #0f7291">分钟</div>
          </div>
        </div>
      </a-col>
    </a-row>

    <a-row style="margin:20px 20px 0 20px">
      <!--存放监控画面-->
      <a-col :span="16" style="max-width: 1241px">
        <!--默认显示12的单页面-->
        <a-row :gutter="3" type="flex" class="singular-item">
          <a-col class="card-item" :span="1">
            <div class="card-item-title card-item-title-underline"><span>料仓编号</span></div>
            <div class="card-item-title card-item-title-underline"><span>原料名称</span></div>
            <div class="card-item-title card-item-title-underline"><span>原料储量</span></div>
            <div class="card-item-title"><span>配方数据</span></div>
          </a-col>
          <a-col class="card-item" :span="1" v-for="(monitor, index) in monitorSingle" :key="index">
            <div class="card-item-title card-item-title-underline item-no-bg">
              <div style="position: relative;">
                <span style="font-size: 24px">{{monitor.warehouseNo}}</span>
                <img class="lock" :src="[monitor.status==0?'./static/img/lock-off.png':'./static/img/lock-on.png']">
              </div>
            </div>
            <div class="card-item-title card-item-title-underline"><span>{{monitor.rawmaterialName?monitor.rawmaterialName:'空'}}</span>
            </div>
            <div class="card-item-title card-item-title-underline"><span
              :class="reserves(monitor.currentWeight,monitor.warnWeight)">{{monitor.currentWeight}}</span></div>
            <div class="card-item-title"><span>{{monitor.standardWeight?monitor.standardWeight:0}}</span></div>

          </a-col>
        </a-row>
        <div style="margin-top:5px;"></div>
        <!--双数-->
        <a-row :gutter="3" type="flex" class="double-item">
          <a-col class="card-item" :span="1">
            <div class="card-item-title card-item-title-underline"><span>料仓编号</span></div>
            <div class="card-item-title card-item-title-underline"><span>原料名称</span></div>
            <div class="card-item-title card-item-title-underline"><span>原料储量</span></div>
            <div class="card-item-title"><span>配方数据</span></div>
          </a-col>
          <a-col class="card-item" :span="1" v-for="(monitor, index) in monitorDouble" :key="index">
            <div class="card-item-title card-item-title-underline item-no-bg">
              <div style="position: relative;">
                <span style="font-size: 24px">{{monitor.warehouseNo}}</span>
                <img class="lock" :src="[monitor.status==0?'./static/img/lock-off.png':'./static/img/lock-on.png']">
              </div>
            </div>
            <div class="card-item-title card-item-title-underline"><span>{{monitor.rawmaterialName?monitor.rawmaterialName:'空'}}</span>
            </div>
            <div class="card-item-title card-item-title-underline"><span
              :class="reserves(monitor.currentWeight)">{{monitor.currentWeight}}</span></div>
            <div class="card-item-title"><span>{{monitor.standardWeight?monitor.standardWeight:0}}</span></div>
          </a-col>
        </a-row>

        <!--显示称的重量-->
        <div style="margin-top: 5px"></div>
        <a-row :gutter="5" type="flex" class="scale">
          <a-col class="scale-item" :span="1">
            <div class="scale-item-title scale-item-title-underline"><span>秤盘编号</span></div>
            <div class="scale-item-title"><span>实际计量</span></div>
          </a-col>
          <a-col class="scale-item" :span="1" v-for="(monitor, index) in monitorWeight" :key="index">
            <div class="scale-item-title scale-item-title-underline scale-no-bg">
              <div style="position: relative;">
                <span style="font-size: 24px">{{monitor.weightNo}}</span>
              </div>
            </div>
            <div class="scale-item-title"><span>{{monitor.nowWeight?monitor.nowWeight:0}}</span></div>
          </a-col>

        </a-row>
        <!--当前执行的工单-->
        <div style="margin-top: 5px"></div>
        <div class="order-header">执行工单</div>
        <a-row :gutter="3" class="order">
          <a-col :span="4" class="order-item">
            工单号
          </a-col>
          <a-col :span="4" class="order-item order-double">
            {{selectedRow.name}}
          </a-col>
          <a-col :span="4" class="order-item">
            目标批次
          </a-col>
          <a-col :span="4" class="order-item order-double">
            {{selectedRow.batch}}
          </a-col>
          <a-col :span="4" class="order-item">
            当前批次
          </a-col>
          <a-col :span="4" class="order-item order-double">
            {{selectedRow.currentBatch}}
          </a-col>
        </a-row>
      </a-col>


      <!--存放工单列表-->
      <a-col :span="8" style="max-width:630px;max-height:851px">
        <div style="margin-left: 10px;width: 630px">
          <a-row>
            <a-col :span="24" style="height: 566px;background: #2d354e">
              <a-table :columns="columns" :dataSource="data" size="large"
                       :pagination="false"
                       :scroll="{y:460}"
                       :customRow="customRow"
              >
                <template slot="title" slot-scope="currentPageData">
                  <div class="product-header">
                    生产排程表
                  </div>
                </template>
              </a-table>
            </a-col>
          </a-row>
          <a-row class="btn-view" type="flex" align="middle" style="height: 82px">
            <a-col :span="8">
              <div :class="selectedProduction===null?'down-none-btn':'down-btn'" @click="showConfirm()"></div>
            </a-col>
            <a-col :span="8">
              <div @click="control()" :class="status==='start'?'start-btn':'pause-btn'"></div>
            </a-col>
            <a-col :span="8">
              <div @click="shutdown()" class="shutdown-btn"></div>
            </a-col>
          </a-row>
          <a-row class="material">
            <a-col>
              <div class="material-header">
                原料条码
              </div>
              <a-row style="height: 153px;">
                <a-col :span="24" v-for="(material,index) of material_code" :key="index" class="material-item">
                  {{index+1}}&nbsp;&nbsp;&nbsp;&nbsp;{{material}}
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <a-row style="margin:10px 0">
      <a-col :span="24" class="system-warning">
        <a-icon type="warning"/>&nbsp;<span>系统警告提示:</span>&nbsp;<span>无报警</span>
      </a-col>
    </a-row>

  </div>
</template>
<script>
  import SockJS from 'sockjs-client'
  import Stomp from 'stompjs'
  import {mapMutations, mapState} from 'vuex'
  import Icons from '../../system/menu/Icons'
  import ACol from 'ant-design-vue/es/grid/Col'
  import ARow from 'ant-design-vue/es/grid/Row'
  import HeadInfo from '@/views/common/HeadInfo'

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      width: 90,
      scopedSlots: {customRender: 'index'},
    }, {
      title: '工单号',
      dataIndex: 'name',
      align: 'center',
      width: 150,
      scopedSlots: {customRender: 'name'},
    },
    {
      title: '批次',
      dataIndex: 'batch',
      align: 'center',
      width: 90,
      scopedSlots: {customRender: 'batch'},
    },
    {
      title: '生产状态',
      dataIndex: 'status',
      align: 'center',
      width: 100,
    },
    {
      title: '排程时间',
      dataIndex: 'createDate01',
      align: 'center',
      width: 200,
    }
  ]
  const data = []
  const monitorSingle = []
  const monitorDouble = []
  const colClass = 'six6'
  const monitorWeight = []
  const plcRunTime = 0
  export default {
    name: 'Monitor',
    components: {ARow, ACol, Icons, HeadInfo},
    data () {
      return {
        monitorSingle,
        monitorDouble,
        monitorWeight,
        columns,
        data,
        selectedRowKeys: [],
        selectedRows: [],
        selectedRow: {},
        colClass: 'six6',
        plcRunTime: '0',
        stompClient: '',
        timer: '',
        selectedProduction: null,
        runTimeReq: null,
        material_code: ['碳酸氢铵1117155684519196116845981', 'WPBS20190513180788', 'WPBS20190513180788', 'WPBS20190513180788', 'WPBS20190513180788'],
        loading: false,
        error: '',
        plc: 1,
        plcRequest: null,
        status: 'start',
        routePath: this.$route.path
      }
    },
    activated () {
      this.getData()
      this.getFormula()
    },
    mounted () {
      this.getData()//初始化列
      this.getFormula()//初始化数据库的数据
      this.initWebSocket()
      this.runTimeReq = setInterval(() => {
        this.$get('formular/runTime').then((r) => {
          this.plcRunTime = r.data
        })
      }, 60000)
      this.plcRequest = setInterval(() => {
        this.$get('formular/plc').then((r) => {
          this.plc = r.data
          console.log('plc' + this.plc)
        })
      }, 20000)
    },
    computed: {
      reserves () {
        return (num, num1) => {
          console.log(num1)
          if (num > num1) {
            return 'card-item-title-white'
          }
          return 'card-item-title-red'
        }
      },
      customRow () {
        return (record) => {
          return {
            props: {},
            on: { // 事件
              click: () => {
                this.selectedProduction = record
                console.log(record)
              },       // 点击行
            },
            style: {
              background: this.selectedProduction && this.selectedProduction.key === record.key ? '#2d9184' : '#2d354e'
            }
          }
        }
      },
      ...mapState({
        user: state => state.account.user
      })
    },
    beforeDestroy: function () {
      console.log('websocket destroy')
      // 页面离开时断开连接,清除定时器
      this.disconnect()
      clearInterval(this.timer)
      if (this.runTimeReq) {
        clearInterval(this.runTimeReq)
      }
      if (this.plcRequest) {
        clearInterval(this.plcRequest)
      }
    },
    methods: {
      initWebSocket () {
        this.connection()
        let that = this
      },
      onSelectChange (selectedRowKeys, selectedRows) {
        console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows)
        this.selectedRowKeys = selectedRowKeys
      },
      connection () {
        // 建立连接对象
        let socket = new SockJS('http://101.132.139.133:9527/webSocketServer')
        // 获取STOMP子协议的客户端对象
        this.stompClient = Stomp.over(socket)
        // 定义客户端的认证信息,按需求配置
        let headers = {
          'Content-Type': 'application/json;charset=utf-8',
          'withCredentials': false
        }
        // 向服务器发起websocket连接
        this.stompClient.connect(headers, () => {
          this.stompClient.subscribe('/topic/monitor/info', (msg) => { // 订阅服务端提供的某个topic
          })  //用户加入接口

          this.stompClient.subscribe('/topic/monitor/warehouseWeight', (msg) => { // 订阅服务端提供的某个重量
            const repObj = JSON.parse(msg.body)
            const houseNo = parseInt(repObj.warehouseDetailName)
            if (houseNo % 2 == 1) {//表明是奇数
              //获取角标
              let indexNo = (houseNo - 1) / 2
              const tempHouseInfo = this.monitorSingle[indexNo]
              tempHouseInfo.currentWeight = parseInt(tempHouseInfo.currentWeight) + parseInt(repObj.rawmaterialWeight)
            } else if (houseNo % 2 == 0) {//偶数个
              let indexNo = houseNo / 2 - 1
              const tempHouseInfo = this.monitorDouble[indexNo]
              tempHouseInfo.currentWeight = parseInt(tempHouseInfo.currentWeight) + parseInt(repObj.rawmaterialWeight)
            }
          })
          this.stompClient.subscribe('/topic/monitor/warehouseWeightLess', (msg) => {
            const repObj = JSON.parse(msg.body)
            const houseNo = parseInt(repObj.warehouseDetailName)
            if (houseNo % 2 == 1) {//表明是奇数
              let indexNo = (houseNo - 1) / 2
              const tempHouseInfo = this.monitorSingle[indexNo]
              tempHouseInfo.currentWeight = parseInt(tempHouseInfo.currentWeight) - parseInt(repObj.rawmaterialWeight)
            } else if (houseNo % 2 == 0) {
              let indexNo = houseNo / 2 - 1
              const tempHouseInfo = this.monitorDouble[indexNo]
              tempHouseInfo.currentWeight = parseInt(tempHouseInfo.currentWeight) - parseInt(repObj.rawmaterialWeight)
            }
          })
          this.stompClient.subscribe('/topic/monitor/fornumarFinish', (msg) => {
            this.getFormula()
          })

          this.stompClient.subscribe('/topic/monitor/weight', (msg) => {
            let data = JSON.parse(msg.body)
            this.monitorWeight[data.index].nowWeight = data.weight
          })

          this.stompClient.subscribe('/topic/monitor/barcode', (msg) => {//新的条码的信息的扫描
            let data = JSON.parse(msg.body)
            this.material_code = data

          })

          this.stompClient.subscribe('/topic/monitor/currentBatchNo', (msg) => {//更新当前的生产批次
            const repObj = JSON.parse(msg.body)
            this.selectedRow.currentBatch = repObj.currentBatch
          })
          this.stompClient.subscribe('/topic/monitor/warehouseStatus', (msg) => { // 订阅服务端提供的某个topic
            const repObj = JSON.parse(msg.body)
            const houseNo = parseInt(repObj.warehouseDetailName)
            if (houseNo % 2 == 1) {//表明是奇数
              //获取角标
              let indexNo = (houseNo - 1) / 2
              const tempHouseInfo = this.monitorSingle[indexNo]
              tempHouseInfo.status = repObj.status
            } else if (houseNo % 2 == 0) {//偶数个
              let indexNo = houseNo / 2 - 1
              const tempHouseInfo = this.monitorDouble[indexNo]
              tempHouseInfo.status = repObj.status
            }
          })
        }, (err) => {
          console.log('失败')
          window.setTimeout(this.connection, 3000)
        })
      },
      disconnect () {
        if (this.stompClient) {
          this.stompClient.disconnect()
        }
      },
      showConfirm () {
        this.$confirm({
          title: '下载工单',
          content: '确定下载工单吗?',
          okText: '确定',
          cancelText: '取消',
          iconType: 'download',
          onOk: () => {
            this.download()
          },
          onCancel: () => {
          },
        })
      },
      download () {
        if (this.selectedProduction) {
          let record = this.selectedProduction
          const params = {id: record['key'], 'userName': this.user.username}
          this.$get('formular/downLoadFormula', {
            ...params
          }).then((r) => {
            let data = r.data
            if (data.status == 'fail') {
              this.$message.success('工单' + data.reason + '在执行中,请稍后执行')
            }
            if (data.status == 'success') {
              this.getFormula()
              this.getData()
              this.$message.success('工单' + data.reason + '下载成功！！！')
            }
          })
        } else {
          this.$message.error('请先选择工单')
        }
      },
      control () {
        if (this.status !== 'start') {
          this.stop()
        } else {
          this.start()
        }
      },
      start () {
        // this.status = 'pause'
        this.$get('formular/start').then((r) => {
          this.$message.success('工单' + record.name + '启动成功')
          this.status = 'pause'
        })
      },
      //暂停
      stop () {
        // this.status = 'start'
        this.$get('formular/stop').then((r) => {
          this.getFormula()
          this.$message.success('工单' + record.name + '暂停成功')
          this.status = 'start'
        })
      },
      //guang
      shutdown () {
        this.$get('formular/shutdown').then((r) => {
          this.$message.success('系统关机')
        })
      },
      getData () {
        this.$get('formular/getMonitor').then((r) => {
          let data = r.data.fornumaData
          let monitorData = r.data.monitorWeight
          let monitorSingleTemp = []
          let monitorDoubleTemp = []
          monitorSingleTemp = data.filter((key, index) => {
            if (index % 2 !== 0) {
              return false
            }
            return true
          })
          this.monitorSingle = monitorSingleTemp
          monitorDoubleTemp = data.filter((key, index) => {
            if (index % 2 !== 0) {
              return true
            }
            return false
          })
          this.monitorDouble = monitorDoubleTemp
          this.colClass = 'six' + this.monitorSingle.length
          this.monitorWeight = monitorData
          if (r.data.currentFormuma) {//如果存在当前的工单
            this.selectedRow = r.data.currentFormuma
          }
        })
      },
      getFormula () {
        this.$get('formular/getProductionFormula').then((r) => {
          let data = r.data
          this.data = data
        })
      },
      ...mapMutations({
        setToken: 'account/setToken',
        setExpireTime: 'account/setExpireTime',
        setPermissions: 'account/setPermissions',
        setRoles: 'account/setRoles',
        setUser: 'account/setUser',
        setTheme: 'setting/setTheme',
        setLayout: 'setting/setLayout',
        setMultipage: 'setting/setMultipage',
        fixSiderbar: 'setting/fixSiderbar',
        fixHeader: 'setting/fixHeader',
        setColor: 'setting/setColor'
      }),
      saveLoginData (data) {
        this.setToken(data.token)
        this.setExpireTime(data.exipreTime)
        this.setUser(data.user)
        this.setPermissions(data.permissions)
        this.setRoles(data.roles)
        this.setTheme('light')
        this.setLayout(data.config.layout)
        this.setMultipage(data.config.multiPage === '1')
        this.fixSiderbar(data.config.fixSiderbar === '1')
        this.fixHeader(data.config.fixHeader === '1')
        this.setColor(data.config.color)
      }
    }
  }
</script>
<style lang="less" scoped>
  .ant-checkbox-indeterminate {
    display: none !important
  }

  .ant-table-selection {
    display: none !important
  }

  .item-text {
    line-height: 30px;
    font-size: 14px;
    text-align: left;
    color: white;
  }

  .ant-card-body {
    padding: 0 !important;
  }

  .ant-tag {
    padding: 0 5px !important;
  }

  .tubiao {
    text-align: center;
    margin-top: 18px;
    margin-bottom: 18px;
  }

  .tubiao1 {
    text-align: center;
    line-height: 40px;
    height: 40px !important;
    color: white;
    font-size: 16px;
    font-weight: bold;
  }

  .tubiao2 {
    text-align: center;
    height: 86px !important;
    color: white;
    font-size: 20px;
    font-weight: 600;
    background-image: url("../../../assets/images/logo-bg.png");

  }

  .project-avatar {
    background: green !important;
    font-family: "微软雅黑";
  }

  .ant-card-hoverable {
    background-color: darkblue !important;
  }

  .ant-card-actions {
    background-color: darkblue !important;

  }

  .ant-card-actions > li {
    margin-left: 2px !important;
  }

  .page-content {
    height: 100%;
  }

  .single-page {
    height: 100%;
  }

  .detail {
    height: 100% !important;
    padding: 0 0 0 0 !important;
  }

  .page-header-wide {
    height: 100%;
  }

  .ant-layout-has-sider {
    height: 99%
  }

  .page-content {
    padding: 14px 0px !important;
  }

  .fixed-header-content {
    margin: 0 0 !important;
  }

  .six6 {
    width: 16.66%;
    float: left;
    height: 100%;
  }

  .six7 {
    width: 14.28%;
    float: left;
    height: 100%;
  }

  .six8 {
    width: 12.5%;
    float: left;
    height: 100%;
  }

  .six9 {
    width: 11.11%;
    float: left;
    height: 100%;
  }

  .six10 {
    width: 10%;
    float: left;
    height: 100%;
  }

  .six11 {
    width: 9.09%;
    float: left;
    height: 100%;
  }

  .lock {
    width: 20px;
    height: 25px;
    color: chartreuse;
  }

  /*.singleRow {*/
  /*  height: 320px !important;*/
  /*}*/


  .single-action {
    margin-top: 10px !important;
  }

  .tubiao4 {
    text-align: center;
  }

  .ant-card-bordered {
    height: 100%;
  }

  .logo-text {
    height: 100%;
    background-image: url("../../../assets/images/logo-text.png");
    background-repeat: no-repeat;
    /*background-size: cover;*/
    background-position: center center;

  }

  .system-btn {
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .system-btn-start {
    width: 140px;
    height: 52px;
    margin-top: 4px;
    background-image: url("../../../assets/images/system-btn-start.png");
    background-repeat: no-repeat;
  }

  .system-btn-stop {
    width: 140px;
    height: 52px;
    margin-top: 4px;
    margin-left: 15px;
    background-image: url("../../../assets/images/system-btn-stop.png");
    background-repeat: no-repeat;
  }

  .run-timer {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
  }

  .run-timer-bg {
    font-size: 16px;
    width: 100px;
    height: 28px;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("../../../assets/images/run-time-bg.png");
    background-repeat: no-repeat;
  }

  .card-item {
    flex: 1;
    height: 284px;
    background: #2d354e;
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .card-item-title {
    flex: 1;
    width: 100%;
    color: #fff;
    font-size: 18px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-item-title-red {
    color: #dd2121;
  }

  .card-item-title-white {
    color: #fff;
  }

  .card-item-title-underline {
    border-bottom: 1px solid #2c3b66;
  }

  .scale-item {
    flex: 1;
    height: 154px;
    background: #2d354e;
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .scale-item-title {
    flex: 1;
    width: 100%;
    color: #fff;
    font-size: 18px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .scale-item-title-underline {
    border-bottom: 1px solid #2c3b66;
  }

  .singular-item {
    border-radius: 5px;
    width: 100%;
    margin: 0 !important;
  }

  .singular-item .card-item:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .singular-item .card-item:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .double-item {
    border-radius: 5px;
    width: 100%;
    margin: 0 !important;
  }

  .double-item .card-item:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .double-item .card-item:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .scale {
    border-radius: 5px;
    width: 100%;
    margin: 0 !important;
  }

  .scale .scale-item:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .scale .scale-item:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .item-no-bg {
    background-image: url("../../../assets/images/item-no-bg.png");
    background-repeat: no-repeat;
    background-position: center center;
  }

  .scale-no-bg {
    background-image: url("../../../assets/images/scale-no-bg.png");
    background-repeat: no-repeat;
    background-position: center center;
  }

  .lock {
    position: absolute;
    top: -10px;
    right: -36px;
    width: 28px;
    height: 28px;
  }

  .order-header {
    width: 100%;
    font-size: 18px;
    color: #fff;
    text-align: center;
    height: 48px;
    line-height: 48px;
    background-image: url("../../../assets/images/order-header.png");
    background-repeat: no-repeat;
    background-position: center center;
  }

  .order {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .order-item {
    height: 66px;
    background: #2d354e;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 66px;
  }

  .order .order-item:first-child {
    border-bottom-left-radius: 5px;
  }

  .order .order-item:last-child {
    border-bottom-right-radius: 5px;
  }

  .order-double {
    color: #2d9184;
  }

  .product-header {
    width: 100%;
    font-size: 18px;
    color: #fff;
    text-align: center;
    height: 48px;
    line-height: 48px;
    background-image: url("../../../assets/images/product-header.png");
    background-repeat: no-repeat;
    background-position: center center;
  }

  /deep/ .ant-table-title {
    padding: 0;
  }

  /deep/ .ant-table-title + .ant-table-content {
    border-top-right-radius: 0 !important;
    border-top-left-radius: 0 !important;

  }

  /deep/ .ant-table-thead > tr:first-child > th:last-child {
    border-top-right-radius: 0 !important;
  }

  /deep/ .ant-table-thead > tr:first-child > th:first-child {
    border-top-left-radius: 0 !important;
  }

  /deep/ .ant-table-thead > tr > th {
    background: #2d354e !important;
    color: #fff !important;
    font-size: 16px !important;
    border-bottom: none !important;
    max-height: 42px !important;
    padding: 9px 16px !important;
  }

  /deep/ .ant-table-tbody > tr > td {
    /*background: #2d354e !important;*/
    color: #fff !important;
    font-size: 16px !important;
    border-bottom: none !important;
    max-height: 42px !important;
    padding: 11px 16px !important;
  }

  /deep/ .ant-table-wrapper {
    background: #252d43;
  }

  /deep/ .ant-table-pagination.ant-pagination {
    margin: 5.5px 0;
  }

  .down-btn {
    height: 44px;
    background-image: url("../../../assets/images/down-btn.png");
    background-repeat: no-repeat;
    background-position: center center;
  }

  .down-none-btn {
    height: 44px;
    background-image: url("../../../assets/images/down-none-btn.png");
    background-repeat: no-repeat;
    background-position: center center;
  }

  .pause-btn {
    height: 44px;
    background-image: url("../../../assets/images/pause-btn.png");
    background-repeat: no-repeat;
    background-position: center center;
  }

  .start-btn {
    height: 44px;
    background-image: url("../../../assets/images/start-bg.png");
    background-repeat: no-repeat;
    background-position: center center;
  }

  .shutdown-btn {
    height: 44px;
    background-image: url("../../../assets/images/shutdown-btn.png");
    background-repeat: no-repeat;
    background-position: center center;
  }

  .btn-view {
    height: 82px;
    background: #252d43;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .material {
    margin-top: 5px;
    height: 197px;
    background: #2d354e;
    border-radius: 5px;
  }

  .material-header {
    font-size: 18px;
    height: 44px;
    background: #283047;
    text-align: center;
    line-height: 44px;
    color: #fff;
  }

  .material-item {
    font-size: 16px;
    color: #fff;
    line-height: 30px;
    text-align: center;
  }

  .material-item:hover {
    background: #3d607c;
  }

  .table-item-checked {
    /*background: #2d9184 !important;*/
  }

  .table-item {
    /*background: #2d354e !important;*/
  }

  /deep/ .ant-table-tbody > tr.ant-table-row-selected td {
    background: #2d9184 !important;;
  }

  .system-warning {
    height: 58px;
    line-height: 58px;
    font-size: 16px;
    text-align: center;
    color: #fff;
    background: #90181c;
  }

  /deep/ .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #2d9184 !important;;
  }

  /deep/ .ant-table-fixed-header .ant-table-scroll .ant-table-header {
    background: #2d354e !important;
  }

  /deep/ .ant-table-fixed-header > .ant-table-content > .ant-table-scroll > .ant-table-body {
    background: #2d354e !important;
    overflow: auto !important;
  }


  /deep/ .ant-table-fixed-header > .ant-table-content > .ant-table-scroll > .ant-table-body::-webkit-scrollbar {
    width: 8px;
    border-radius: 20px;
    /*width: 6px;*/
    /*background-color: #F5F5F5;*/
  }

  /deep/ .ant-table-fixed-header > .ant-table-content > .ant-table-scroll > .ant-table-body::-webkit-scrollbar-track {
    width: 8px;
    background-image: url("../../../assets/images/scroll-bar-bg.png");
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 20px;
    /*border-radius: 6px;*/
    /*background-color: #F5F5F5*/

  }

  /*/deep/ .ant-table-fixed-header > .ant-table-content > .ant-table-scroll > .ant-table-body::-webkit-scrollbar-track-piece {*/
  /*  height: 367px;*/

  /*}*/

  /deep/ .ant-table-fixed-header > .ant-table-content > .ant-table-scroll > .ant-table-body::-webkit-scrollbar-thumb {
    width: 20px;
    background-image: url("../../../assets/images/scroll-bar-thumb.png");
    background-repeat: no-repeat;
    border-radius: 10px;
    background-size: 100% 100%;
    /*border-radius: 6px;*/
    /*background-color: #000000;*/
  }

  /deep/ .ant-table-fixed-header .ant-table-scroll .ant-table-header::-webkit-scrollbar {
    width: 0;
  }


  .homeStyle {
    height: 100%;
    margin: 0;
    padding: 44px 0 0 0 !important;
  }

</style>
