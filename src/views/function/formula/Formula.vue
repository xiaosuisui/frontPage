<template>
	<a-card :bordered="false" class="card-area">
		<a-row style="margin-top: 10px;">
			<a-col :md="8">
				<a-button type="primary" style="margin-left: 5px;height: 40px;line-height: 40px;">配方编辑</a-button>
			</a-col>
		</a-row>
	<a-button style="margin-top: 20px;" class="editable-add-btn" type="primary" @click="handleAdd">新增</a-button>
	<div style="margin-top: 15px;"></div>
     <a-table ref="TableInfo" :columns="columns" :dataSource="data" :scroll="{ x: 1700}" 
     	  :pagination="pagination"
          :loading="loading" size="small" @change="handleTableChange"
          bordered>
       <template slot="front" slot-scope="text, record, index">
       		<span v-if='record.key==999999'>
       			原材料
       		</span>
       		<span v-else>
       			<span v-if='record.key==""'>
       				等待发布
       			</span>
       			<span v-else>
       				<a href="javascript:void(0)" @click="deleteRecord(record)">删除</a>
       			</span>
       		</span>
	    </template>
	    <template v-for="col in editColumns" :slot="col" slot-scope="text, record, index">
	      <div :key="col">
	        <a-input
	          v-if="record.editable"
	          :value="text"
	          @change="e => handleChange(e.target.value, record.key, col)"
	        />
	        <template v-else>{{text}}</template>
	      </div>
	    </template>
	    <template slot="operation" slot-scope="text, record, index">
	      <div class='editable-row-operations'>
	      	<span v-if='record.key!=999999'>
		        <span v-if="record.editable">
		          <a @click="() => save(record.key)">保存</a>
		          <a-popconfirm title='Sure to cancel?' @confirm="() => cancel(record.key)">
		            <a>取消</a>
		          </a-popconfirm>
		        </span>
		        <span v-else>
		          <a @click="() => edit(record.key)">编辑</a>
		        </span>
		    </span>    
	      </div>
	    </template>
  </a-table>
  </a-card>
</template>

<script>
import {mapState } from 'vuex'
const columns = []
const data = []
const dataLength=''//当前模板的类型
export default {
  data () {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      data,
      columns,
      dataLength,
      paginationInfo: null,
      filteredInfo: null,
      sortedInfo: null,
      loading: false,
      editColumns:[],
	  pagination: {
	    pageSizeOptions: ['10','12','15'],
	    defaultCurrent: 1,
	    defaultPageSize: 10,
	    showQuickJumper: true,
	    showSizeChanger: true,
	    showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
	  }
    }
  },
  mounted (){
	this.getColumns()//初始化列
	this.fetch()//初始化数据库的数据
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    })},
   
  methods: {
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    handleTableChange (pagination, filters, sorter) {
		      // 将这三个参数赋值给Vue data，用于后续使用      
      this.paginationInfo = pagination
      this.filteredInfo = filters
      this.sortedInfo = sorter
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
      this.$get('formular', {
        ...params
      }).then((r) => {
        let data = r.data
        const pagination = { ...this.pagination }
        pagination.total = data.total
        this.data.splice(1,this.data.length-1)//删除元素额外的
        this.data = this.data.concat(data.rows)
        this.pagination = pagination
        // 数据加载完毕，关闭loading
        this.loading = false
      })
    },
    getColumns(){
      this.data=[]
	  const params=''
	  const initData={}//初始化的料框物料的数据
	  initData['key']='999999'
	  const column=[]//定义返回值
	  column.push({title: '料仓名称', dataIndex: 'front',scopedSlots: { customRender: 'front'},fixed:'left',width:80})
  	  this.$get('warehousedetail/formulaDetail', {
        ...params
      }).then((r) => {
         const detailData = r.data//详细的数据
         this.dataLength=detailData.length
         for( let i=1;i<=detailData.length;i++){//拼装title
           const titleAddData={title: `${i}`,dataIndex: `house0${i}`, scopedSlots: { customRender: `house0${i}`}}
           column.push(titleAddData)
           initData[`house0${i}`]=detailData[i-1]['rawmaterialName']
           this.editColumns.push(`house0${i}`)
         }
         column.push({title: '配方名称',dataIndex: 'formulaName',scopedSlots: { customRender: 'formulaName'},fixed:'right',width:110})
        // column.push({title: '批次',dataIndex: 'batchNo',scopedSlots: { customRender: 'batchNo'},fixed:'right',width:60})
        // column.push({title: '差值',dataIndex: 'offsetValue',scopedSlots: { customRender: 'offsetValue'},fixed:'right',width:60})
         column.push({title: '操作', dataIndex: 'operation',class:'testClass',scopedSlots: { customRender: 'operation'},fixed:'right',width:60})
     	 this.columns=column
     	 this.editColumns.push(`formulaName`)
     	// this.editColumns.push(`batchNo`)
     	// this.editColumns.push(`offsetValue`)
     	 initData.editable=false;//
     	 this.data.push(initData)
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
    handleAdd () {
      const filterData = [...this.data]
      const target = filterData.filter(item => '' === item.key)[0]
      if(target){
     	this.$message.error("请先保存配方")
     	return
      }
      const {data } = this
      const newData={front:``,key:``}
      for(let i=1;i<=this.columns.length;i++){newData[`house0${i}`]=``}
      newData[`formulaName`]=``
     // newData[`batchNo`]=``
     // newData[`offsetValue`]=``
	  this.data.splice(1, 0, newData);
     // this.data = [...data, newData]
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
      	//储存入库
      	target['warehouseType']=`${this.dataLength}类型 `
      	target['status']='0'
      	target['operator']=this.user.username
      	 this.$post('formular', {
            ...target
          }).then((r) => {
          	 delete target.editable
       		 this.data = newData
        	this.cacheData = newData.map(item => ({ ...item }))
       	 	this.fetch()
          }).catch(() => {
          })
 
      }
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    },
  },
}
</script>
<style  lang="less" scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>