<template>
	<a-card :bordered="false" class="card-area">
	<div :class="advanced ? 'search' : null">
		<a-row style="margin-top: 10px;">
			<a-col :md="8">
				<a-button type="primary" style="margin-left: 5px;height: 40px;line-height: 40px;">批次称量查询</a-button>
			</a-col>
		</a-row>
      <!-- 搜索区域 -->
      <a-form style="margin-top: 20px;" layout="horizontal">
        <a-row >
        <div :class="advanced ? null: 'fold'">
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="工单编号"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <a-input v-model="queryParams.formularName"/>
              </a-form-item>
            </a-col>
        </div>
          <span style="float: right; margin-top: 3px;">
            <a-button type="primary" @click="search">查询</a-button>
            <a-button type="primary" style="margin-left: 8px" @click="reset">重置</a-button>
               <a-button type="primary" style="margin-left: 8px" @click="exportExcel">导出</a-button>
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
               :loading="loading">
      </a-table>
    </div>
	</a-card>
</template>
<script>
	export default{
		name:'BatchWeight',
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
        title: '工单编号',
        dataIndex: 'formularName',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'formularName' && sortedInfo.order
      }, {
        title: '批次',
        dataIndex: 'batchNo',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'batchNo' && sortedInfo.order
      }, 
       {
        title: '原料名称',
        dataIndex: 'rawmaterialName',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'rawmaterialName' && sortedInfo.order
      },
      {
        title: '配方重量',
        dataIndex: 'standWeight',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'standWeight' && sortedInfo.order
      }, {
        title: '计量重量',
        dataIndex: 'actualWeight',
        sorter: true,
        ortOrder: sortedInfo.columnKey === 'actualWeight' && sortedInfo.order
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
    this.fetch()
  },
  methods:{
  	exportExcel () {
      let {sortedInfo} = this
      let sortField, sortOrder
      // 获取当前列的排序和列的过滤规则
      if (sortedInfo) {
        sortField = sortedInfo.field
        sortOrder = sortedInfo.order
      }
      this.$export('productionData/bwexport', {
        sortField: sortField,
        sortOrder: sortOrder,
        ...this.queryParams
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
      this.$get('productionData/batchWeight', {
        ...params
      }).then((r) => {
        let data = r.data
        const pagination = { ...this.pagination }
        pagination.total = data.total
        this.dataSource = data.rows
        console.log(this.dataSource)
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