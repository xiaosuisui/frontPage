<template>
	<a-card :bordered="false" class="card-area">
	  <div :class="advanced ? 'search' : null">
      <!-- 搜索区域 -->
      <a-form layout="horizontal">
        <a-row >
        <div :class="advanced ? null: 'fold'">
            <a-col :md="12" :sm="24">
              <a-form-item
                label="料仓编号"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <a-input v-model="queryParams.warehouseDetailName"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item
                label="名称"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
               	 <a-input v-model="queryParams.rawmaterialName"/>
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
   <!--新增按钮，删除按钮-->
     <div>
      <div class="operator">
      </div>
      <!--表格操作区域-->
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
          <a-icon v-hasPermission="'warehousedetail:update'" type="setting" theme="twoTone" twoToneColor="#4a9ff5" @click="edit(record)" title="修改原材料"></a-icon>
          &nbsp;
          <a-icon v-hasPermission="'warehousedetail:view'" type="eye" theme="twoTone" twoToneColor="#42b983" @click="view(record)" title="查看"></a-icon>
          <a-badge v-hasNoPermission="'warehousedetail:update','warehousedetail:view'" status="warning" text="无权限"></a-badge>
        </template>
      </a-table>
    </div>
        <!-- 用户信息查看 -->
    <warehousedetail-info
      :warehouseDetailInfoData="warehouseDetailInfo.data"
      :warehouseDetailInfoVisiable="warehouseDetailInfo.visiable"
      @close="handleWarehouseDetailInfoClose">
    </warehousedetail-info>
    
    <!--仓库信息编辑-->
    <warehousedetail-edit
      ref="warehousedetailEdit"
      @close="handlerClose"
      @success="handlerSuccess"
      :warehouseDetailEditVisiable="warehousedetailEdit.visiable">
    </warehousedetail-edit>
    
	</a-card>
</template>

<script>
  import WarehousedetailInfo from './WarehouseDetailInfo'
  import WarehousedetailEdit from './WarehouseDetailEdit'
  export default{
  	name:'WarehouseDetail',
  	components: {WarehousedetailInfo,WarehousedetailEdit},
	data() {
      return{
      	warehouseDetailInfo: {
       	 	visiable: false,
         	data: {}
       },
        warehousedetailEdit: {
         visiable: false
        },
		queryParams: {},
		advanced: false,
		filteredInfo: null,
        sortedInfo: null,
        paginationInfo: null,
        dataSource: [],
        selectedRowKeys: [],
        loading: false,
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
  computed: {
  
    columns () {
      let { sortedInfo, filteredInfo } = this
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}
      return [{
        title: '料仓编号',
        dataIndex: 'warehouseDetailName',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'warehouseDetailName' && sortedInfo.order
      }, {
        title: '原材料名称',
        dataIndex: 'rawmaterialName',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'rawmaterialName' && sortedInfo.order
      },
       {
        title: '原材料编号',
        dataIndex: 'rawmaterialNo',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'rawmaterialNo' && sortedInfo.order
      }, 
      {
        title: '状态',
        dataIndex: 'status',
        customRender: (text, row, index) => {
          switch (text) {
            case '0':
              return <a-tag color="red">关闭</a-tag>
            case '1':
              return <a-tag color="cyan">开启</a-tag>
            default:
              return text
          }
        },
        filters: [
          { text: '开启', value: '1' },
          { text: '锁定', value: '0' }
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value)
      },
       {
        title: '物料重量',
        dataIndex: 'rawmaterialWeight',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'rawmaterialWeight' && sortedInfo.order
      },
      {
        title: '总重量',
        dataIndex: 'currentWeight',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'currentWeight' && sortedInfo.order
      },
       {
        title: '预警值',
        dataIndex: 'warnWeight',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'warnWeight' && sortedInfo.order
      },
      {
        title:'数量',
        dataIndex: 'quantity',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'quantity' && sortedInfo.order
      },
      
      {
       title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }
      ]
    }
  },
  activated(){
  	this.fetch()
  },
  methods:{
	onSelectChange (selectedRowKeys) { 
      this.selectedRowKeys = selectedRowKeys
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
      this.warehouseDetailInfo.visiable = false
      this.fetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...this.queryParams,
        ...filters
      })
    },
    edit (record) {
      console.log(record)
      this.$refs.warehousedetailEdit.setFormValues(record)
      this.warehousedetailEdit.visiable = true
    },
    
    handlerClose () {
      this.warehousedetailEdit.visiable = false
    },
    handlerSuccess (){
      this.warehousedetailEdit.visiable = false
      this.$message.success('修改料仓成功')
      this.search()
    },
    handleWarehouseDetailInfoClose() {
    	this.warehouseDetailInfo.visiable = false
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
    view (record) {
      this.warehouseDetailInfo.data = record
      this.warehouseDetailInfo.visiable = true
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
      this.$get('warehousedetail', {
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
<style lang="less" scoped>
@import "../../../../static/less/Common";
</style>