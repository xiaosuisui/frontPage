<template>
	<a-card :bordered="false" class="card-area">
	  <div :class="advanced ? 'search' : null">
	  	<a-row style="margin-top: 10px;">
			<a-col :md="8">
				<a-button type="primary" style="margin-left: 5px;height: 40px;line-height: 40px;">原料库管理</a-button>
			</a-col>
		</a-row>
      <!-- 搜索区域 -->
      <a-form style="margin-top:20px" layout="horizontal">
        <a-row >
        <div :class="advanced ? null: 'fold'">
            <a-col :md="12" :sm="24" >
              <a-form-item
                label="名称"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <a-input v-model="queryParams.rawmaterialName"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24" >
              <a-form-item
                label="编号"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
               	 <a-input v-model="queryParams.rawmaterialNo"/>
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
        <a-button type="primary"  @click="add" v-hasPermission="'rawmaterial:add'">新增</a-button>
        <a-button type="primary" @click="batchDelete" v-hasPermission="'rawmaterial:delete'">删除</a-button>
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
        <template slot="email" slot-scope="text, record">
          <a-popover placement="topLeft">
            <template slot="content">
              <div>{{text}}</div>
            </template>
            <p style="width: 150px;margin-bottom: 0">{{text}}</p>
          </a-popover>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-icon v-hasPermission="'rawmaterial:update'" type="setting" theme="twoTone" twoToneColor="#4a9ff5" @click="edit(record)" title="修改原材料"></a-icon>
          &nbsp;
          <a-icon v-hasPermission="'rawmaterial:view'" type="eye" theme="twoTone" twoToneColor="#42b983" @click="view(record)" title="查看"></a-icon>
          <a-badge v-hasNoPermission="'rawmaterial:update','rawmaterial:view'" status="warning" text="无权限"></a-badge>
        </template>
      </a-table>
    </div>
        <!-- 用户信息查看 -->
    <rawmaterial-info
      :rawmaterialInfoData="rawmaterialInfo.data"
      :rawmaterialInfoVisiable="rawmaterialInfo.visiable"
      @close="handleRawmaterialInfoClose">
    </rawmaterial-info>
    <!--原材料信息增加-->
    <rawmaterial-add
      @close="handleRawmaterialAddClose"
      @success="handleRawmaterialAddSuccess"
      :rawmaterialAddVisiable="rawmaterialAdd.visiable">
    </rawmaterial-add>
    <!--原材料信息编辑-->
    <rawmaterial-edit
      ref="rawmaterialEdit"
      @close="handleRawmaterialEditClose"
      @success="handleRawmaterialEditSuccess"
      :rawmaterialEditVisiable="rawmaterialEdit.visiable">
    </rawmaterial-edit>
    
	</a-card>
</template>

<script>
  import RawmaterialInfo from './RawmaterialInfo'
  import RawmaterialAdd from './RawmaterialAdd'
  import RawmaterialEdit from './RawmaterialEdit'
  export default{
  	name:'Rawmaterial',
  	components: {RawmaterialInfo,RawmaterialAdd,RawmaterialEdit},
	data(){
      return{
      	rawmaterialInfo: {
       	 	visiable: false,
         	data: {}
        },
        rawmaterialAdd: {//默认为关闭状态
        	visiable: false
        },
        rawmaterialEdit: {
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
        pageSizeOptions: ['10', '12','15'],
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
        title: '原材料名称',
        dataIndex: 'rawmaterialName',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'rawmaterialName' && sortedInfo.order
      }, {
        title: '原材料编号',
        dataIndex: 'rawmaterialNo',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'rawmaterialNo' && sortedInfo.order
      },
      {
        title: '重量',
        dataIndex: 'weight',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'weight' && sortedInfo.order
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
        title: '创建人',
        dataIndex: 'userName',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'userName' && sortedInfo.order
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'createDate' && sortedInfo.order
      }, {
        title: '编辑时间',
        dataIndex: 'editDate',
        sorter: true,
        ortOrder: sortedInfo.columnKey === 'createDate' && sortedInfo.order
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
    batchDelete () {
      if (!this.selectedRowKeys.length) {
        this.$message.warning('请选择需要删除的记录')
        return
      }
      let that = this
      this.$confirm({
        title: '确定删除所选中的记录?',
        content: '当您点击确定按钮后，这些记录将会被彻底删除',
        centered: true,
        onOk () {
          let rawmaterialIds = []
          console.log(that.selectedRowKeys)
          for (let key of that.selectedRowKeys) {
            rawmaterialIds.push(key)
          }
          that.$delete('rawmaterial/' + rawmaterialIds.join(',')).then(() => {
            that.$message.success('删除成功')
            that.selectedRowKeys = []
            that.search()
          })
        },
        onCancel () {
          that.selectedRowKeys = []
        }
      })
    },
    handleTableChange (pagination, filters, sorter) {
      // 将这三个参数赋值给Vue data，用于后续使用
      this.paginationInfo = pagination
      this.filteredInfo = filters
      this.sortedInfo = sorter
      this.rawmaterialInfo.visiable = false
      this.fetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...this.queryParams,
        ...filters
      })
    },
    edit (record) {
      this.$refs.rawmaterialEdit.setFormValues(record)
      this.rawmaterialEdit.visiable = true
    },
    handleRawmaterialEditClose () {
      this.rawmaterialEdit.visiable = false
    },
    handleRawmaterialEditSuccess () {
      this.rawmaterialEdit.visiable = false
      this.$message.success('修改原材料成功')
      this.search()
    },
    handleRawmaterialInfoClose(){
    	this.rawmaterialInfo.visiable = false
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
      this.rawmaterialInfo.data = record
      this.rawmaterialInfo.visiable = true
    },
     handleRawmaterialAddClose () {
      this.rawmaterialAdd.visiable = false
    },
    handleRawmaterialAddSuccess () {
      this.rawmaterialAdd.visiable = false
      this.$message.success('新增原材料成功')
      this.search()
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
      this.$get('rawmaterial', {
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
    add () {
      this.rawmaterialAdd.visiable = true
    }
    
	}
	}
 </script>
<style lang="less" scoped>
@import "../../../../static/less/Common";
</style>