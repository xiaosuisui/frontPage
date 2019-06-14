<template>
	<a-card :bordered="false" class="card-area">
      <div :class="advanced ? 'search' : null">
      	<a-row style="margin-top: 10px;">
			<a-col :md="8">
				<a-button type="primary" style="margin-left: 5px;height: 40px;line-height: 40px;">料仓模板管理</a-button>
			</a-col>
		</a-row>
      <!-- 搜索区域 -->
      <a-form style="margin-top:20px" layout="horizontal">
        <a-row>
        <div :class="advanced ? null: 'fold'">
            <a-col :md="12" :sm="24">
              <a-form-item
                label="名称"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <a-input v-model="queryParams.warehouseName"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24" >
              <a-form-item
                label="类型"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
               	 <a-input v-model="queryParams.warehouseType"/>
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
   <!--新增按钮,删除按钮-->
   <div>
   	  <div class="operator">
       <!-- <a-button type="primary" ghost @click="add" v-hasPermission="'warehouse:add'">新增</a-button>
        <a-button @click="batchDelete" v-hasPermission="'warehouse:delete'">删除</a-button>-->
      </div>
      <!-- 表格区域 -->
      <a-table ref="TableInfo"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="pagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               :scroll="{ x: 900 }"
               @change="handleTableChange">
          <template slot="operation" slot-scope="text, record">
          <a-icon v-hasPermission="'warehouse:update'" type="setting" theme="twoTone" twoToneColor="#4a9ff5" @click="edit(record)" title="修改模板"></a-icon>       
        </template>
      </a-table>
   </div>
    <!--模板信息编辑-->
    <warehouse-edit
      ref="warehouseEdit"
      @close="handleWarehouseEditClose"
      @success="handleWarehouseEditSuccess"
      :warehouseEditVisiable="warehouseEdit.visiable">
    </warehouse-edit>
	</a-card>
</template>

<script>
	import WarehouseEdit from './WarehouseEdit'
	export default{
		name:'Warehouse',
		components: {WarehouseEdit},
		data(){
			return{
				queryParams: {},
		        advanced: false,
		        paginationInfo: null,
		        filteredInfo: null,
                sortedInfo: null,
        		dataSource: [],
        		selectedRowKeys: [],
        		warehouseEdit: {
         			visiable: false
        		},
        		loading: false,
        		pagination: {
        			pageSizeOptions: ['10', '20', '30', '40', '100'],
        			defaultCurrent: 1,
        			defaultPageSize: 10,
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
        			title: '模板名称',
        			dataIndex: 'warehouseName',
        			sorter: true,
        			sortOrder: sortedInfo.columnKey === 'warehouseName' && sortedInfo.order
      				}, 
      				{
        			title: '模板类型',
        			dataIndex: 'warehouseType',
        			sorter: true,
        			sortOrder: sortedInfo.columnKey === 'warehouseType' && sortedInfo.order
      				}, 
      				{
        			title: '状态',
        			dataIndex: 'status',
        			customRender: (text, row, index) => {
          			switch (text) {
            			case '0':
              				return <a-tag color="red">锁定</a-tag>
            			case '1':
              				return <a-tag color="cyan">有效</a-tag>
           				default:
              			return text
          			}
        		},
       				 filters: [
          				 { text: '有效', value: '1' },
         				 { text: '锁定', value: '0' }
        				],
       			 filterMultiple: false,
       			 filteredValue: filteredInfo.status || null,
       			 onFilter: (value, record) => record.status.includes(value)
     			 },
			      {
			        title: '编辑时间',
			        dataIndex: 'editDate',
			        sorter: true,
			        ortOrder: sortedInfo.columnKey === 'editDate' && sortedInfo.order
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
  			onCellChange (key, dataIndex, value) {
        		const dataSource = [...this.dataSource]
        		console.log(dataSource)
        		const target = dataSource.find(item => item.key === key)
        		if (target) {
          			target[dataIndex] = value
          		this.dataSource = dataSource
        	}
    		},
  		  onSelectChange (selectedRowKeys) { 
     		 this.selectedRowKeys = selectedRowKeys
   			},
   			edit (record) {
		      this.$refs.warehouseEdit.setFormValues(record)
		      this.warehouseEdit.visiable = true
		    },
		    handleWarehouseEditClose () {
		      this.warehouseEdit.visiable = false
		    },
		    handleWarehouseEditSuccess () {
		      this.warehouseEdit.visiable = false
		      this.$message.success('修改模板成功')
		      this.search()
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
		      this.$get('warehouse', {
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
    	},
	}
  		
	}
</script>
<style lang="less" scoped>
@import "../../../../static/less/Common";
</style>
