<template>
	<a-card :bordered="false" class="card-area">
	<div :class="advanced ? 'search' : null">
      <!-- 搜索区域 -->
      <a-form layout="horizontal">
        <a-row >
        <div :class="advanced ? null: 'fold'">
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="原料名称"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <a-input v-model="queryParams.materialName"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="创建时间"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}">
                <range-date @change="handleDateChange" ref="createTime"></range-date>
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
        <template slot="front" slot-scope="text, record, index">
       		<span>{{index+1}}</span>
	    </template>
      </a-table>
    </div>
	</a-card>
</template>
<script>
	import RangeDate from '@/components/datetime/RangeDate'
	export default{
		name:'MaterialIn',
		components: {RangeDate},
		data(){
			return{
		queryParams: {},
		advanced: false,
		filteredInfo: null,
		totalNum:0,
		showCount:0,
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
        title: '序号',
        dataIndex: 'front',
        scopedSlots: { customRender: 'front'}

      },
       {
        title: '原材料名称',
        dataIndex: 'materialName',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'materialName' && sortedInfo.order
      },
      {
        title: '原料重量',
        dataIndex: 'weight',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'weight' && sortedInfo.order
      },
      {
       title: '投料时间',
        dataIndex: 'createDate',
        sorter:true,
         ortOrder: sortedInfo.columnKey === 'createDate' && sortedInfo.order
      }
      ]
    }
  },
 mounted () {
    this.fetch()
  },
  methods:{
   handleDateChange (value) {
      if (value) {
        this.queryParams.startDate = value[0]
        this.queryParams.endDate = value[1]
      }
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
  	reset () {
      // 取消选中
      this.selectedRowKeys = []
      this.$refs.createTime.reset()
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
      this.$get('materialIn', {
        ...params
      }).then((r) => {
        let data = r.data
        const pagination = { ...this.pagination }
        pagination.total = data.total
        this.dataSource = data.rows
        if(data.count){
        	const countData={'materialName':"投料汇总","weight":data.count}
        	this.dataSource.push(countData)
        }
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