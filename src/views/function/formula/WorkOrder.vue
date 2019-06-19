<template>
	<a-card :bordered="false" class="card-area">
	<div :class="advanced ? 'search' : null">
		<a-row style="margin-top: 10px;">
			<a-col :md="8">
				<a-button type="primary" style="margin-left: 5px;height: 40px;line-height: 40px;">工单管理</a-button>
			</a-col>
		</a-row>
      <!-- 搜索区域 -->
      <a-form style="margin-top: 20px;" layout="horizontal">
        <a-row >
        <div :class="advanced ? null: 'fold'">
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="配方名称"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <a-input v-model="queryParams.formulaName"/>
              </a-form-item>
            </a-col>
           <a-col :md="8" :sm="24" >
              <a-form-item
                label="工单名称"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
               	 <a-input v-model="queryParams.workOrder"/>
              </a-form-item>
            </a-col>
        </div>
          <span style="float: right; margin-top: 3px;">
            <a-button type="primary" @click="search">查询</a-button>
            <a-button type="primary" style="margin-left: 8px" @click="reset">重置</a-button>
          </span>
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
               @change="handleTableChange">
              <template v-for="col in ['workOrder','batchNo']" :slot="col" slot-scope="text, record, index">
	      		<div :key="col">
	       			 <a-input
	          			v-if="record.editable"
	          			:value="text"
	         			 @change="e => handleChange(e.target.value, record.key, col)"
	        			/>
	        		<template v-else>{{text}}</template>
	      		</div>
	    	  </template>
 
        <template slot="download" slot-scope="text, record">
        	<a-icon type="download" twoToneColor="#4a9ff5" style="cursor:hand;"  @click="downloadorder(record.key)" title="下载工单"></a-icon>
        </template>
        <template slot="operation" slot-scope="text, record">
        	<a @click="() => deleteRecord(record)">删除</a>
            <span v-if="record.editable">
		          <a @click="() => save(record.key)">保存</a>
		          <a-popconfirm title='Sure to cancel?' @confirm="() => cancel(record.key)">
		            <a>取消</a>
		          </a-popconfirm>
		        </span>
		        <span v-else-if="record.status!=='4'">
		          <a @click="() => edit(record.key)">编辑</a>
		    </span>
        </template>
        
      </a-table>
    </div>
	</a-card>
</template>
<script>
	export default{
		name:'WorkOrder',
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
        pageSizeOptions: ['12', '18','24'],
        defaultCurrent: 1,
        defaultPageSize: 12,
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
        title: '配方编号',
        dataIndex: 'formulaName',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'formularName' && sortedInfo.order
      }, {
        title: '偏差值',
        dataIndex: 'offsetValue',
        sorter: true,
        scopedSlots: { customRender: `offsetValue`},
        sortOrder: sortedInfo.columnKey === 'offsetValue' && sortedInfo.order
      }, 
       {
        title: '工单编号',
        dataIndex: 'workOrder',
        sorter: true,
        scopedSlots: { customRender: `workOrder`},
        sortOrder: sortedInfo.columnKey === 'workOrder' && sortedInfo.order
      },
      {
        title: '批次',
        dataIndex: 'batchNo',  
        scopedSlots: { customRender: `batchNo`}
      },
       {
        title: '状态',
        dataIndex: 'status',
        sorter: true,
        customRender: (text, row, index) => {
          switch (text) {
            case '0':
              return <a-tag color="red">未下载</a-tag>
            case '1':
              return <a-tag color="cyan">已下载</a-tag>
            case '2':
              return <a-tag color="cyan">进行中</a-tag> 
            case '3':
              return <a-tag color="cyan">暂停中</a-tag>
            case '4':
              return <a-tag color="cyan">已完成</a-tag>   
            default:
              return text
          }
        },
        filters: [
          { text: '未下载', value: '0' },
          { text: '已下载', value: '1' },
           { text: '进行中', value: '2' },
          { text: '暂停中', value: '3' },
           { text: '已完成', value: '4' }
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value)
        
      },
      {
        title: '用户',
        dataIndex: 'operator',
        sorter: true,
        ortOrder: sortedInfo.columnKey === 'operator' && sortedInfo.order
      },
      {
       title: '创建时间',
        dataIndex: 'createDate',
        sorter:true,
         ortOrder: sortedInfo.columnKey === 'createDate' && sortedInfo.order
      },
      {
       title: '下载',
        dataIndex: 'download',
        scopedSlots: { customRender: 'download' }
      },
          {
       title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }
      ]
    }
  },
 mounted () {
    this.fetch()
  },
  methods:{
	checkRate(input) { 
　	　var re = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
　　	 if (!re.test(input)) { 
　　　　 return false
　　       }
	return true
	},
  	//下载工单
  	downloadorder(key){
  	  const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if(target.status=='1'||target.status=='2'||target.status=='3'||target.status=='4'){
      	this.$message.error('当前工单已经下载到排程,无需重复下载')
      	return
      }
      if(target){
      	if(target.workOrder && this.checkRate(target['batchNo'])){
  		this.$get('formular/updateState', {
        	...target
      	}).then((r) => {
          this.fetch()
       })
  		}else{
  			 this.$message.error('工单批次数据不合法！请修改')
  		}
     }
  	},
  	 save (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
      	//储存入库
      	 this.$post('formular/updateWorkOrder', {
            ...target
          }).then((r) => {
          	  delete target.editable
        	  this.dataSource = newData
        	  this.fetch()
          }).catch(() => {
          })
   
      }
    },
  	  handleChange (value, key, column) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
      }
    },
  	 handleTableChange (pagination, filters, sorter) {
      // 将这三个参数赋值给Vue data，用于后续使用
      this.paginationInfo = pagination
      this.filteredInfo = filters
      this.sortedInfo = sorter
      this.fetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...this.queryParams,
        ...filters
      })
    },
  	search () {
      let {sortedInfo, filteredInfo} = this
      let sortField, sortOrder
      // 获取当前列的排序和列的过滤规则
      if (sortedInfo) {
        sortField = sortedInfo.field
        sortOrder = sortedInfo.order
      }
      this.fetch({
        sortField: sortField,
        sortOrder: sortOrder,
        ...this.queryParams,
        ...filteredInfo
      })
    },
    deleteRecord(record){
		const params={}
    	params[`formularId`]= record.key
    	console.log(record)
    	console.log(params)
    	this.$get('formular/deteteFormula', {
        ...params
      }).then((r) => {
      	let data= r.data
      	if(data.status=='fail'){
      		this.$message.success('当前工单正在进行中,稍后删除')
      	}
      	if(data.status !='fail'){
      		this.$message.success(data.status+'删除成功')
      	}
      	this.fetch()
    }
      )},
    edit (key) {
      const newData = [...this.dataSource]
      console.log(newData)
      const target = newData.filter(item => key === item.key)[0]
      console.log(target)
      if (target) {
        target.editable = true
        this.dataSource = newData
      }
    },
    cancel (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        //Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.dataSource = newData
      }
    },
  	reset () {
      // 取消选中
      this.selectedRowKeys = []
      // 重置分页
      this.$refs.TableInfo.pagination.current = this.pagination.defaultCurrent
      if (this.paginationInfo) {
        this.paginationInfo.current = this.pagination.defaultCurrent
        this.paginationInfo.pageSize = this.pagination.defaultPageSize
      }
      // 重置列过滤器规则
      this.filteredInfo = null
      // 重置列排序规则
      this.sortedInfo = null
      // 重置查询参数
      this.queryParams = {}
      this.fetch()
    },
  	 fetch (params = {}) {
      // 显示loading
      	this.loading = true
      if (this.paginationInfo) {
        // 如果分页信息不为空，则设置表格当前第几页，每页条数，并设置查询分页参数
        this.$refs.TableInfo.pagination.current = this.paginationInfo.current
        this.$refs.TableInfo.pagination.pageSize = this.paginationInfo.pageSize
        params.pageSize = this.paginationInfo.pageSize
        params.pageNum = this.paginationInfo.current
      } else {
        // 如果分页信息为空，则设置为默认值
        params.pageSize = this.pagination.defaultPageSize
        params.pageNum = this.pagination.defaultCurrent
      }
      this.$get('formular/workOrder', {
        ...params
      }).then((r) => {
        let data = r.data
        const pagination = { ...this.pagination }
        pagination.total = data.total
        this.dataSource = data.rows
        this.pagination = pagination
        // 数据加载完毕，关闭loading
        this.loading = false
      })
    }
  }
  }
</script>
<style>
</style>