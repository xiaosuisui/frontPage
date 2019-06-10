<template>
	<a-card :bordered="false" class="card-area">
	<div :class="advanced ? 'search' : null">
      <!-- 搜索区域 -->
      <a-form layout="horizontal">
        <a-row >
        <div :class="advanced ? null: 'fold'">
            <a-col :md="6" :sm="24" >
              <a-form-item
                label="工单编号"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <a-input v-model="queryParams.formularName"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24" >
              <a-form-item
                label="批次号"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
               	 <a-input v-model="queryParams.batchNo"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24" >
              <a-form-item
                label="操作员"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
               	 <a-input v-model="queryParams.author"/>
              </a-form-item>
            </a-col>
        </div>
        </a-row>
      </a-form>
   </div>
    <div>
      <!--表格操作区域-->
            <!-- 表格区域 -->
      <a-table ref="TableInfo"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="pagination"
               :loading="loading"
               >
      </a-table>
    </div>
	</a-card>
</template>
<script>
  import SockJS from 'sockjs-client'
  import Stomp from 'stompjs'
	export default{
		name:'BatchBarcode',
		data(){
			return{
		queryParams: {},
		advanced: false,
		filteredInfo: null,
        sortedInfo: null,
        paginationInfo: null,
        dataSource: [],
        selectedRowKeys: [],
        loading: false,
        pagination: {
        pageSizeOptions: ['25'],
        defaultCurrent: 1,
        defaultPageSize: 25,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
      	}
		}
	},
	  computed: {
    columns () {
      let { sortedInfo, filteredInfo } = this
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}
      return [{
        title: '料仓名称',
        dataIndex: 'warehouseNo',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'warehouseNo' && sortedInfo.order
      }, {
        title: '原材料号',
        dataIndex: 'rawmaterialName',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'rawmaterialName' && sortedInfo.order
      }, 
        {
        title: '配方重量',
        dataIndex: 'standWeight',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'standWeight' && sortedInfo.order
      },
       {
        title: '称重重量',
        dataIndex: 'actualWeight',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'actualWeight' && sortedInfo.order
      },
      {
        title: '状态',
        dataIndex: 'remark',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'remark' && sortedInfo.order
      },
      {
       title: '完成时间',
        dataIndex: 'createDate',
        sorter:true,
         ortOrder: sortedInfo.columnKey === 'createDate' && sortedInfo.order
      }
      ]
    }
  },
  mounted () {
   this.initWebSocket()
    //this.fetch()
  },
  beforeDestroy: function () {
      console.log('websocket destroy')
      // 页面离开时断开连接,清除定时器
      this.disconnect()
    },
  methods:{
  	 initWebSocket () {
        this.connection()
        let that = this
      },
            connection () {
        // 建立连接对象
        let socket = new SockJS('http://127.0.0.1:9527/webSocketServer')
        // 获取STOMP子协议的客户端对象
        this.stompClient = Stomp.over(socket)
        // 定义客户端的认证信息,按需求配置
        let headers = {
          'Content-Type': 'application/json;charset=utf-8',
          'withCredentials': false
        }
        // 向服务器发起websocket连接
        this.stompClient.connect(headers, () => {

          this.stompClient.subscribe('/topic/monitor/batchBarcode',(msg)=>{
        			let data= JSON.parse(msg.body)
        			this.dataSource = data.records
        			this.queryParams['formularName']=data.records[0]['formularName']
        			this.queryParams['batchNo']=data.records[0]['batchNo']
        			this.queryParams['author']=data.records[0]['author']
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
      }
  }
  }
</script>
<style>
</style>