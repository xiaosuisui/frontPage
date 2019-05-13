<template>
  <div style="background-color:dodgerblue; padding: 0px; width:100%;height:100%;">

  	<a-row>
  		<a-col :span="24">
		 		<a-card hoverable :bordered=true>
							<div class="tubiao2">
								智能微量配料计量监控系统
							</div>
	    		</a-card>
    	</a-col>
  	</a-row>
  	<a-row style="margin-top:10px;">
  		<a-col :span="10" :offset="1">
				<a href="javascript:void(0)" @click="start()" style="color: black;font-size: 20px;font-weight: 400;" class="button button-3d button-action button-pill">系统运行</a>
    		<a href="javascript:void(0)" @click="stop()" style="color: black;font-size: 20px;font-weight: 400;" class="button button-3d button-action button-pill">系统暂停</a>
  		</a-col>
    	<a-col :span="5" :offset="8">
    		 <a href="javascript:void(0)" style="color: white;font-size: 16px;" class="button button-uppercase button-primary">运行时间:10分钟</a>
    	</a-col>
  	</a-row>
  	<a-row style="margin-top:15px">
  		<!--存放监控画面-->
  		 <a-col :span="17">
  		 	<!--默认显示12的单页面-->
  					<a-row :gutter="3" style="height:320px" class="singleRow">
  						<a-col :class="colClass" style="height: 100%;" v-for="(monitor, index) in monitorSingle" :key="index">
        					<a-card hoverable :bordered=true>
	            			<template class="ant-card-actions" slot="actions">
							 				<div class="item-text">
							 					<div style="height: 25px;"></div>
							 					<span>存量:</span>
							 					<span><a-tag color="#174703" style="font-weight: bold;font-size: 14px;color: white;">{{monitor.currentWeight}}</a-tag>
							 					</span>
							 					<div style="height: 15px;"></div>
							 					<span>配方:</span>
							 					<span>	
							 						<a-tag color="#174703" style="font-weight: bold;font-size: 14px;color: white;">{{monitor.standardWeight?monitor.standardWeight:0}}</a-tag>
							 					</span>
							 				</div>
		
	  								</template>
	  								<div style="text-align: right;">
	  									<img class="lock" :src="[monitor.status==0?'./static/img/lock.jpg':'./static/img/lock2.jpg']"/>
	  								</div>
	  										<div style="margin-left:-20px;margin-right: -20px;text-align: center;">
												<span style="color: white;">{{monitor.rawmaterialName?monitor.rawmaterialName:'空'}}</span>
										</div>
					          <div class="tubiao">
								       <a-avatar class="project-avatar">{{monitor.warehouseNo}}</a-avatar>
							      </div>
        		      </a-card>
      		    </a-col>
  					</a-row>
  					<div style="margin-top:5px;"></div>
  					<!--双数-->
					  <a-row :gutter="3" style="height:320px" class="singleRow">
						  <a-col :class="colClass" v-for="(monitor, index) in monitorDouble" :key="index">
								<a-card hoverable :bordered=true>
			    			<template class="ant-card-actions," slot="actions" >
							 				<div class="item-text">
							 					<div style="height: 25px;"></div>
							 					<span>存量:</span>
							 					<span><a-tag color="#174703" style="font-weight: bold;font-size: 14px;color: white;">{{monitor.currentWeight}}</a-tag>
							 					</span>
							 					<div style="height: 15px;"></div>
							 					<span>配方:</span>
							 					<span>	
							 						<a-tag color="#174703" style="font-weight: bold;font-size: 14px;color: white;">{{monitor.standardWeight?monitor.standardWeight:0}}</a-tag>
							 					</span>
<!--							 					存量:
							 						<a-tag color="#174703" style="font-weight: bold;font-size: 14px;color: white;">{{monitor.currentWeight}}</a-tag>
							 						<br>
							 						配方:	<a-tag color="#174703" style="font-weight: bold;font-size: 14px;color: white;">{{monitor.standardWeight?monitor.standardWeight:0}}</a-tag>-->
							 				</div>
									</template>
									<div style="text-align: right;">
										<img class="lock" :src="[monitor.status==0?'./static/img/lock.jpg':'./static/img/lock2.jpg']"/>
									</div>
											<div style="margin-left:-20px;margin-right: -20px;text-align: center;">
												<span style="color: white;">{{monitor.rawmaterialName?monitor.rawmaterialName:'空'}}</span>
										</div>
					          <div class="tubiao">
								       <a-avatar class="project-avatar">{{monitor.warehouseNo}}</a-avatar>
							      </div>
				      	</a-card>
			      	</a-col>
					  </a-row>
					  <!--显示称的重量-->
					  <div style="height:5px;"></div>
					  <a-row :gutter="5">
      				<a-col :class="colClass" v-for="(monitor, index) in monitorWeight" :key="index">
        				<a-card hoverable :bordered=true>
	            		<template class="ant-card-actions" slot="actions">
							 			<span class="item-text">
							 				<a-tag color="#174703" style="font-weight: bold;font-size: 14px; color: white;">{{monitor.nowWeight?monitor.nowWeight:0}}</a-tag>
							 			</span>
	  							</template>
									<div class="tubiao">
										<a-avatar class="project-avatar">{{monitor.weightNo}}</a-avatar>
									</div>
        				</a-card>
      				</a-col>
    				</a-row>
    				<!--当前执行的工单-->
    				<div style="height: 5px;background: floralwhite;"></div>
    			  <a-row :gutter="3">
    					<a-col :span="4">
        				<a-card hoverable :bordered=true>  		
									<div class="tubiao1">
										工单名称
									</div>
        				</a-card>
      				</a-col>
      				<a-col :span="4" >
        				<a-card hoverable :bordered=true>  		
									<div class="tubiao1">
										{{selectedRow.name}}
								</div>
        				</a-card>
      				</a-col>
      				<a-col :span="4">
        				<a-card hoverable :bordered=true>  		
									<div class="tubiao1">
										目标批次
									</div>
        				</a-card>
      				</a-col>
      				<a-col :span="4">
        				<a-card hoverable :bordered=true>  		
									<div class="tubiao1">
										{{selectedRow.batch}}
									</div>
        				</a-card>
      				</a-col>
      				<a-col :span="4">
        				<a-card hoverable :bordered=true>  		
									<div class="tubiao1">
										当前批次
									</div>
        				</a-card>
      				</a-col>
      				<a-col :span="4">
        				<a-card hoverable :bordered=true>  		
									<div class="tubiao1">
										{{selectedRow.currentBatch}}
									</div>
        				</a-card>
      				</a-col>
    			</a-row>  
  		 </a-col>
  		<!--存放工单列表-->
  		<a-col :span="7">
  			<template>
  				<a-table  :columns="columns" :dataSource="data" size="large" :scroll="{ x: 450}" >
    				<template slot="operation" slot-scope="text, record">
    				  <a-popconfirm title="确定下载工单么?"  @confirm="download(record)" okText="确定" cancelText="取消">
       					  <a-icon  type="download"  title="下载工单"></a-icon>       
      				</a-popconfirm>
        		</template>
  				</a-table>
				</template>
  		</a-col>
  	</a-row>

  </div>
</template>
<script>
import SockJS from  'sockjs-client';
import  Stomp from 'stompjs';
import {mapState } from 'vuex'
const columns = [
 	{
    title: '下载',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
	},
  {
  title: '序号',
  dataIndex: 'index',
  scopedSlots: { customRender: 'index' },
	}, {
  title: '工单名称',
  dataIndex: 'name',
 scopedSlots: { customRender: 'name' },
	}, 
	{title: '批次',
  dataIndex: 'batch',
 	scopedSlots: { customRender: 'batch' },
}, 
	{
  title: '状态',
  dataIndex: 'status',
	},
	{
  title: '时间',
  dataIndex: 'createDate01',
	}
	]
  const data = []
	const monitorSingle=[]
	const monitorDouble=[]
  const colClass="six6" 
	const monitorWeight=[]
	export default{
		name:'Monitor',
		data(){
			return{
				 monitorSingle,
				 monitorDouble,
				 monitorWeight,
				 columns,
				 data,
				 selectedRowKeys: [],
				 selectedRows:[],
				 selectedRow:{},
				 colClass:"six6",
				  stompClient:'',
            timer:''
			}
		},
		activated() {
     this.getData()
     this.getFormula()
  	},
  	mounted (){
		 this.getData()//初始化列
		 this.getFormula()//初始化数据库的数据
		 this.initWebSocket()
   },
    computed: {
    ...mapState({
      user: state => state.account.user
    })},
    beforeDestroy: function () {
    	console.log("websocket destroy")
        // 页面离开时断开连接,清除定时器
        this.disconnect();
        clearInterval(this.timer);
    },
    methods: {
    	initWebSocket() {
        this.connection();
        let that= this;
        },
      connection() {
        // 建立连接对象
        let socket = new SockJS('http://127.0.0.1:9527/webSocketServer');
        // 获取STOMP子协议的客户端对象
        this.stompClient = Stomp.over(socket);
        // 定义客户端的认证信息,按需求配置
        let headers = {
 					"Content-Type": "application/json;charset=utf-8",
 					"withCredentials":false
		 		}
        // 向服务器发起websocket连接
        this.stompClient.connect(headers,() => {
            this.stompClient.subscribe('/topic/monitor/info', (msg) => { // 订阅服务端提供的某个topic
            });  //用户加入接口
            
            this.stompClient.subscribe('/topic/monitor/warehouseWeight', (msg) => { // 订阅服务端提供的某个重量        	
            	const repObj = JSON.parse(msg.body)
              const houseNo=parseInt(repObj.warehouseDetailName)
            	if(houseNo%2==1){//表明是奇数
            		//获取角标
            		let indexNo=(houseNo-1)/2
            		const tempHouseInfo=this.monitorSingle[indexNo]
            		tempHouseInfo.currentWeight=parseInt(tempHouseInfo.currentWeight)+parseInt(repObj.rawmaterialWeight)
            	}else if(houseNo%2==0){//偶数个
            		let indexNo=houseNo/2-1
            		const tempHouseInfo=this.monitorDouble[indexNo]
            		tempHouseInfo.currentWeight=parseInt(tempHouseInfo.currentWeight)+parseInt(repObj.rawmaterialWeight)
            	}	
            }); 
            this.stompClient.subscribe('/topic/monitor/warehouseStatus', (msg) => { // 订阅服务端提供的某个topic
            	const repObj = JSON.parse(msg.body)
              const houseNo=parseInt(repObj.warehouseDetailName)
            	if(houseNo%2==1){//表明是奇数
            		//获取角标
            		let indexNo=(houseNo-1)/2
            		const tempHouseInfo=this.monitorSingle[indexNo]
            		tempHouseInfo.status=repObj.status
            	}else if(houseNo%2==0){//偶数个
            		let indexNo=houseNo/2-1
            		const tempHouseInfo=this.monitorDouble[indexNo]
            		tempHouseInfo.status=repObj.status
            	}
            }); 
        }, (err) => {
        	console.log('失败')
        	window.setTimeout(this.connection,3000);    
        });
    }, 
       disconnect() {
        if (this.stompClient) {
            this.stompClient.disconnect();
        }
        }, 
    	download(record){
    		const params={id:record['key'],'userName':this.user.username}
    		this.$get('formular/downLoadFormula',{
    		...params
    		}).then((r) => {
    			  let data=r.data
    			  if(data.status=='fail'){
    			  	this.$message.success('工单'+data.reason+'在执行中,请稍后执行')
    			  }
    			  if(data.status=='success'){
    			  	this.getFormula()
    			  	this.getData()
    			  	this.$message.success('工单'+data.reason+'下载成功！！！')
    			  }
	     })
    	},
    	start(){
    		  this.$get('formular/start').then((r) => {
	           this.$message.success('工单'+record.name+'启动成功')
	     		})
    	},
    	stop(){
    		 this.$get('formular/stop').then((r) => {
	           this.$message.success('工单'+record.name+'启动成功')
	     		})
    	},
    	getData(){
	    	this.$get('formular/getMonitor').then((r) => {
	        let data = r.data.fornumaData
	        let monitorData=r.data.monitorWeight
	        let monitorSingleTemp = []
	        let monitorDoubleTemp=[]
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
      		this.colClass="six"+this.monitorSingle.length
      		this.monitorWeight=monitorData
      		if(r.data.currentFormuma){//如果存在当前的工单
      			this.selectedRow=r.data.currentFormuma
      		}
	     })
    	},
    	getFormula(){
    		  this.$get('formular/getProductionFormula').then((r) => {
	        let data = r.data
	        this.data=data
	     })
    	}
    }
	}
</script>
<style>
.ant-checkbox-indeterminate {
	display:none !important
}
.ant-table-selection{
	display:none !important
}
.item-text{
		line-height: 30px;
		font-size: 14px;
	 	text-align: left;
		color: white;
	}
	.ant-card-body{
		padding: 0 !important;
	}

	.ant-tag{
		padding: 0 5px !important;
	}
	.tubiao{
		text-align: center;
		margin-top:18px;
		margin-bottom: 18px;
	}
 .tubiao1{
		text-align: center;
		line-height: 40px;
		height: 40px !important;
		color: white;
		font-size: 16px;
		font-weight: bold;
	}
	 .tubiao2{
		text-align: center;
		line-height: 46px;
		height: 46px !important;
		color: white;
		font-size: 20px;
		font-weight: 600;
	
	}
	.project-avatar{
		background: green !important;
		font-family: "微软雅黑";
	} 
	.ant-card-hoverable{
		background-color: darkblue !important;
	}
	.ant-card-actions{
		background-color: darkblue !important;
		
	}
	.ant-card-actions >li{
		margin-left: 2px !important;
	}
	.page-content{
		height: 100%;
	}
	.single-page{
		height: 100%;
	}
	.detail{
		height: 100% !important;
		padding:0 0 0 0 !important;
	}
	.page-header-wide{
		height: 100%;
	}
.ant-layout-has-sider{
	height:99%
}
.page-content{
	padding: 14px 0px !important;
}

.fixed-header-content{
	margin:  20px 1px 0px !important;
}
.six6{
	width:16.66%;
	float: left;
	height:100%;
}
.six7{
	width:14.28%;
	float: left;
	height:100%;
}
.six8{
	width:12.5%;
	float: left;
	height:100%;
}
.six9{
	width:11.11%;
	float: left;	
	height:100%;
}
.six10{
	width: 10%;
	float: left;
	height:100%;
}
.six11{
	width: 9.09%;
	float: left;
	height:100%;
}
.lock{
	width: 20px;
	height:25px;
	color: chartreuse;
}
.singleRow{
	height:320px !important;
	}
	

.single-action{
	margin-top: 10px !important;
}
.tubiao4{
		text-align: center;
	}
.ant-card-bordered{
		height:100%;
}

</style>