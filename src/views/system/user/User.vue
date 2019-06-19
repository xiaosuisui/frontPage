<!--
<template>
  <a-card :bordered="false" class="card-area" style="background:#1d2437;padding: 0; width:100%;height:100%;">
    <div :class="advanced ? 'search' : null">
      &lt;!&ndash; 搜索区域 &ndash;&gt;
      <a-form layout="horizontal">
        <a-row class="user-header">
          <div :class="advanced ? null: 'fold'">
            <a-col :md="6" :sm="24">
              <a-form-item
                label="角色"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 18 }"
              >
                <a-input v-model="queryParams.username"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item
                label="部门"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 18 }"
              >
                <dept-input-tree @change="handleDeptChange"
                                 ref="deptTree">
                </dept-input-tree>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item
                label="创建时间"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 18 }"
              >
                <range-date @change="handleDateChange" ref="createTime"></range-date>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24" style="margin-top: 3px;">
            <span>
            <a-button type="primary" @click="search" class="bg-gradual-green-search">查询</a-button>
            <a-button style="margin-left: 8px" @click="reset" class="bg-gradual-green-search">重置</a-button>
          </span>
            </a-col>
          </div>

        </a-row>
      </a-form>
    </div>
    <div>
      &lt;!&ndash; 表格区域 &ndash;&gt;
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
          <a-icon v-hasPermission="'user:update'" type="setting" theme="twoTone" twoToneColor="#4a9ff5"
                  @click="edit(record)" title="修改用户"></a-icon>&nbsp;修改用户
          &nbsp;
          <a-icon v-hasPermission="'user:view'" type="eye" theme="twoTone" twoToneColor="#42b983" @click="view(record)"
                  title="查看"></a-icon>&nbsp;查看详情
          <a-badge v-hasNoPermission="'user:update','user:view'" status="warning" text="无权限"></a-badge>
        </template>
        <template slot="title" slot-scope="currentPageData">
            <div class="operator tab-header">
              <a-button @click="add" v-hasPermission="'user:add'" class="bg-gradual-green">新增</a-button>
              <a-button @click="batchDelete" v-hasPermission="'user:delete'" class="bg-gradual-green">删除</a-button>
              <a-button @click="resetPassword" v-hasPermission="'user:reset'" class="bg-gradual-green">密码重置</a-button>
              <a-button @click="exportExcel" v-hasPermission="'user:export'" class="bg-gradual-green">导出Excel</a-button>
            </div>
        </template>
      </a-table>
    </div>
    &lt;!&ndash; 用户信息查看 &ndash;&gt;
    <user-info
      :userInfoData="userInfo.data"
      :userInfoVisiable="userInfo.visiable"
      @close="handleUserInfoClose">
    </user-info>
    &lt;!&ndash; 新增用户 &ndash;&gt;
    <user-add
      @close="handleUserAddClose"
      @success="handleUserAddSuccess"
      :userAddVisiable="userAdd.visiable">
    </user-add>
    &lt;!&ndash; 修改用户 &ndash;&gt;
    <user-edit
      ref="userEdit"
      @close="handleUserEditClose"
      @success="handleUserEditSuccess"
      :userEditVisiable="userEdit.visiable">
    </user-edit>
  </a-card>
</template>

<script>
  import UserInfo from './UserInfo'
  import DeptInputTree from '../dept/DeptInputTree'
  import RangeDate from '@/components/datetime/RangeDate'
  import UserAdd from './UserAdd'
  import UserEdit from './UserEdit'

  export default {
    name: 'User',
    components: {UserInfo, UserAdd, UserEdit, DeptInputTree, RangeDate},
    data () {
      return {
        advanced: false,
        userInfo: {
          visiable: false,
          data: {}
        },
        userAdd: {
          visiable: false
        },
        userEdit: {
          visiable: false
        },
        queryParams: {},
        filteredInfo: null,
        sortedInfo: null,
        paginationInfo: null,
        dataSource: [],
        selectedRowKeys: [],
        loading: false,
        pagination: {
          // pageSizeOptions: ['10', '20', '30', '40', '100'],
          defaultCurrent: 1,
          defaultPageSize: 10,
          // showQuickJumper: true,
          // showSizeChanger: true,
          // showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
        }
      }
    },
    computed: {
      columns () {
        let {sortedInfo, filteredInfo} = this
        sortedInfo = sortedInfo || {}
        filteredInfo = filteredInfo || {}
        return [{
          title: '用户名',
          dataIndex: 'username',
          // sorter: true,
          // sortOrder: sortedInfo.columnKey === 'username' && sortedInfo.order,
          align: 'center'
        }, {
          title: '性别',
          dataIndex: 'ssex',
          align: 'center',
          customRender: (text, row, index) => {
            switch (text) {
              case '0':
                return '男'
              case '1':
                return '女'
              case '2':
                return '保密'
              default:
                return text
            }
          },
          filters: [
            {text: '男', value: '0'},
            {text: '女', value: '1'},
            {text: '保密', value: '2'}
          ],
          filterMultiple: false,
          filteredValue: filteredInfo.ssex || null,
          onFilter: (value, record) => record.ssex.includes(value)
        }, {
          title: '邮箱',
          dataIndex: 'email',
          align: 'center',
          scopedSlots: {customRender: 'email'},
          width: 100
        }, {
          title: '部门',
          align: 'center',
          dataIndex: 'deptName'
        }, {
          title: '电话',
          align: 'center',
          dataIndex: 'mobile'
        }, {
          title: '状态',
          align: 'center',
          dataIndex: 'status',
          customRender: (text, row, index) => {
            switch (text) {
              case '0':
                return <a-tag color='red'> 锁定 </a-tag>
              case '1':
                return <a-tag color='cyan'> 有效 </a-tag>
              default:
                return text
            }
          },
          filters: [
            {text: '有效', value: '1'},
            {text: '锁定', value: '0'}
          ],
          filterMultiple: false,
          filteredValue: filteredInfo.status || null,
          onFilter: (value, record) => record.status.includes(value)
        }, {
          title: '创建时间',
          dataIndex: 'createTime',
          align: 'center',
          // sorter: true,
          // sortOrder: sortedInfo.columnKey === 'createTime' && sortedInfo.order
        }, {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          scopedSlots: {customRender: 'operation'}
        }]
      }
    },
    mounted () {
      this.fetch()
    },
    methods: {
      onSelectChange (selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
        if (!this.advanced) {
          this.queryParams.createTimeFrom = ''
          this.queryParams.createTimeTo = ''
        }
      },
      view (record) {
        this.userInfo.data = record
        this.userInfo.visiable = true
      },
      add () {
        this.userAdd.visiable = true
      },
      handleUserAddClose () {
        this.userAdd.visiable = false
      },
      handleUserAddSuccess () {
        this.userAdd.visiable = false
        this.$message.success('新增用户成功，初始密码为1234qwer')
        this.search()
      },
      edit (record) {
        this.$refs.userEdit.setFormValues(record)
        this.userEdit.visiable = true
      },
      handleUserEditClose () {
        this.userEdit.visiable = false
      },
      handleUserEditSuccess () {
        this.userEdit.visiable = false
        this.$message.success('修改用户成功')
        this.search()
      },
      handleUserInfoClose () {
        this.userInfo.visiable = false
      },
      handleDeptChange (value) {
        this.queryParams.deptId = value || ''
      },
      handleDateChange (value) {
        if (value) {
          this.queryParams.createTimeFrom = value[0]
          this.queryParams.createTimeTo = value[1]
        }
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
            let userIds = []
            for (let key of that.selectedRowKeys) {
              userIds.push(that.dataSource[key].userId)
            }
            that.$delete('user/' + userIds.join(',')).then(() => {
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
      resetPassword () {
        if (!this.selectedRowKeys.length) {
          this.$message.warning('请选择需要重置密码的用户')
          return
        }
        let that = this
        this.$confirm({
          title: '确定重置选中用户密码?',
          content: '当您点击确定按钮后，这些用户的密码将会重置为1234qwer',
          centered: true,
          onOk () {
            let usernames = []
            for (let key of that.selectedRowKeys) {
              usernames.push(that.dataSource[key].username)
            }
            that.$put('user/password/reset', {
              usernames: usernames.join(',')
            }).then(() => {
              that.$message.success('重置用户密码成功')
              that.selectedRowKeys = []
            })
          },
          onCancel () {
            that.selectedRowKeys = []
          }
        })
      },
      exportExcel () {
        let {sortedInfo, filteredInfo} = this
        let sortField, sortOrder
        // 获取当前列的排序和列的过滤规则
        if (sortedInfo) {
          sortField = sortedInfo.field
          sortOrder = sortedInfo.order
        }
        this.$export('user/excel', {
          sortField: sortField,
          sortOrder: sortOrder,
          ...this.queryParams,
          ...filteredInfo
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
        // 清空部门树选择
        this.$refs.deptTree.reset()
        // 清空时间选择
        if (this.advanced) {
          this.$refs.createTime.reset()
        }
        this.fetch()
      },
      handleTableChange (pagination, filters, sorter) {
        // 将这三个参数赋值给Vue data，用于后续使用
        this.paginationInfo = pagination
        this.filteredInfo = filters
        this.sortedInfo = sorter

        this.userInfo.visiable = false
        this.fetch({
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...this.queryParams,
          ...filters
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
        this.$get('user', {
          ...params
        }).then((r) => {
          let data = r.data
          const pagination = {...this.pagination}
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

  .user-header{
    padding: 20px 0;
    background-color: #2c364d;
    border-radius: 4px;
  }

  .tab-header{
    margin-bottom: 0;
    padding: 10px 20px;
  }
  /deep/ .ant-table-title{
    background-color: #1a5154;
    margin-top: 10px;
  }
  /deep/ .ant-form-item{
    margin-bottom: 0;
  }

  /deep/ .ant-table-thead > tr:first-child > th:first-child{
    border-top-left-radius: 0;
  }

  /deep/ .ant-table-thead > tr:first-child > th:last-child{
    border-top-right-radius: 0;
  }

  /deep/ .ant-table-title + .ant-table-content{
    border-radius: 0 0 4px 4px;
  }
  /deep/ .ant-table table{
    border-radius:0;
  }


  /deep/ .ant-form-item-label label {
    color: #fff;
    font-size: 20px;
  }

  .bg-gradual-green-search{
    background-image: linear-gradient(45deg, #5f9c9f, #3a958d);
    color: #ffffff;
    border: none;
    border-radius: 100px !important;
  }

  .bg-gradual-green {
    background-image: linear-gradient(45deg, #5f9c9f, #3a958d);
    color: #ffffff;
    border: none;
    margin-left: 20px;
    border-radius: 4px !important;
  }

  /deep/ .ant-btn {
    padding: 0 20px;
  }

  /deep/ .ant-input{
    background-color: #273146;
    border: none;
    color: #fff;
    box-shadow: inset 0 -1px 0 #4d618c, inset 0 -2px 0 rgba( 0, 0, 0, 0.1);
    border-radius: 4px !important;
  }

  /deep/ .ant-select-selection{
    background-color: #273146;
    border: none;
    box-shadow: inset 0 -1px 0 #4d618c, inset 0 -2px 0 rgba( 0, 0, 0, 0.1);
    border-radius: 4px !important;
  }

  /deep/ .ant-select-arrow .ant-select-arrow-icon{
    color: #fff;
  }

  /deep/ .ant-calendar-picker-icon{
    color: #fff;
  }

  /deep/ .ant-calendar-range-picker-input{
    color: #fff;
  }

  /deep/ .ant-select-selection__rendered{
    color: #fff;
  }

  /deep/ .ant-table-thead > tr > th {
    background-color: #233255;
    color: #fff;
    font-size: 20px;
    border-bottom: none;
  }

  /deep/ .ant-table-tbody > tr > td {
    color: #fff;
    background-color: #2c364d;
    border-bottom: none;
    border-top: 1px solid #2a395b;
  }

  /deep/ .ant-table-thead > tr > th.ant-table-column-has-actions:hover {
    background-color: #233255;
  }

  /deep/ .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters:hover .anticon-filter:hover, .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters:hover .ant-table-filter-icon:hover {
    background-color: #233255;
  }

  /deep/ .ant-table-thead > tr > th.ant-table-column-has-actions:hover .anticon-filter, .ant-table-thead > tr > th.ant-table-column-has-actions:hover .ant-table-filter-icon {
    background-color: #233255;
  }

  /deep/ .ant-table-pagination.ant-pagination {
    float: none;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /deep/ .ant-pagination-prev .ant-pagination-item-link {
    background-color: #9397a3;
    color: #fff;
    border: none;
  }

  /deep/ .ant-pagination-next .ant-pagination-item-link {
    background-color: #9397a3;
    color: #fff;
    border: none;
  }

  /deep/ .ant-pagination-item-active {
    background-color: #00d9aa;
    color: #fff;
    border: none;
  }

  /deep/ .ant-pagination-item-active a {
    color: #fff;
  }

  /deep/ .ant-pagination-item a {
    color: #fff;
  }

  /deep/ .ant-checkbox-inner{
    background-color: #273146;
    border-color:#273146 ;
    box-shadow: inset 0 -1px 0 #4d618c, inset 0 -2px 0 rgba( 0, 0, 0, 0.1);
  }

  /deep/ .ant-checkbox-checked .ant-checkbox-inner{
    background-color: #236769;
    border-color:#236769 ;
    box-shadow: inset 0 -1px 0 #188f85, inset 0 -2px 0 rgba( 0, 0, 0, 0.1);

  }
  /deep/ .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner{
    border-color:  #236769;
  }


  /deep/ .ant-checkbox-indeterminate .ant-checkbox-inner:after{
    background-color: #236769;
  }
  /deep/ .ant-checkbox-checked .ant-checkbox-inner:after{
    border-color: #00dde2;
  }

  /deep/ .ant-table-tbody > tr.ant-table-row-selected td{
    background: #2d9184 !important;;
  }

  /deep/ .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #2d9184 !important;;
  }

  /deep/ .ant-tag-cyan{
    color: #fff;
    background: #2c364d;
    border-color: #2c364d;
  }

  /deep/ .ant-tag-red{
    color: #90181c;
    background: #2c364d;
    border-color: #2c364d;
  }

  /deep/ .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters .anticon-filter.ant-table-filter-open, .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters .ant-table-filter-icon.ant-table-filter-open{
    background-color: #233255;
  }

  /deep/ .ant-radio-inner{
    visibility: hidden;
  }

  /deep/ .ant-dropdown-menu{
    background-color: #3a958d;
  }

  /deep/ .ant-table-filter-dropdown .ant-dropdown-menu-item{
    color: #fff;
  }

  /deep/ .ant-dropdown-menu-item-selected, .ant-dropdown-menu-submenu-title-selected, .ant-dropdown-menu-item-selected > a, .ant-dropdown-menu-submenu-title-selected > a{
    background-color: #188f85;
  }

  /deep/ .ant-dropdown-menu-item:hover, .ant-dropdown-menu-submenu-title:hover{
    background-color: #188f85;
  }



</style>
-->

<template>
  <a-card :bordered="false" class="card-area">
    <div :class="advanced ? 'search' : null">
      <!-- 搜索区域 -->
      <a-form layout="horizontal">
        <a-row >
          <div :class="advanced ? null: 'fold'">
            <a-col :md="12" :sm="24" >
              <a-form-item
                label="用户名"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <a-input v-model="queryParams.username"/>
              </a-form-item>
            </a-col>
<!--            <a-col :md="12" :sm="24" >
              <a-form-item
                label="部门"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <dept-input-tree @change="handleDeptChange"
                                 ref="deptTree">
                </dept-input-tree>
              </a-form-item>
            </a-col>-->
            <template v-if="advanced">
              <a-col :md="12" :sm="24" >
                <a-form-item
                  label="创建时间"
                  :labelCol="{span: 4}"
                  :wrapperCol="{span: 18, offset: 2}">
                  <range-date @change="handleDateChange" ref="createTime"></range-date>
                </a-form-item>
              </a-col>
            </template>
          </div>
          <span style="float: right; margin-top: 3px;">
            <a-button type="primary" @click="search">查询</a-button>
            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
             <a @click="toggleAdvanced" style="margin-left: 8px">
              {{advanced ? '收起' : '展开'}}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </span>
        </a-row>
      </a-form>
    </div>
    <div>
      <div class="operator">
        <a-button type="primary"  @click="add" v-hasPermission="'user:add'">新增</a-button>
        <a-button type="primary" @click="batchDelete" v-hasPermission="'user:delete'">删除</a-button>
        <a-dropdown v-hasAnyPermission="'user:reset','user:export'">
          <a-menu slot="overlay">
            <a-menu-item v-hasPermission="'user:reset'" key="password-reset" @click="resetPassword">密码重置</a-menu-item>
            <a-menu-item v-hasPermission="'user:export'" key="export-data" @click="exportExcel">导出Excel</a-menu-item>
          </a-menu>
          <a-button>
            更多操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
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
        <template slot="email" slot-scope="text, record">
          <a-popover placement="topLeft">
            <template slot="content">
              <div>{{text}}</div>
            </template>
            <p style="width: 150px;margin-bottom: 0">{{text}}</p>
          </a-popover>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-icon v-hasPermission="'user:update'" type="setting" theme="twoTone" twoToneColor="#4a9ff5" @click="edit(record)" title="修改用户"></a-icon>
          &nbsp;
          <a-icon v-hasPermission="'user:view'" type="eye" theme="twoTone" twoToneColor="#42b983" @click="view(record)" title="查看"></a-icon>
          <a-badge v-hasNoPermission="'user:update','user:view'" status="warning" text="无权限"></a-badge>
        </template>
      </a-table>
    </div>
    <!-- 用户信息查看 -->
    <user-info
      :userInfoData="userInfo.data"
      :userInfoVisiable="userInfo.visiable"
      @close="handleUserInfoClose">
    </user-info>
    <!-- 新增用户 -->
    <user-add
      @close="handleUserAddClose"
      @success="handleUserAddSuccess"
      :userAddVisiable="userAdd.visiable">
    </user-add>
    <!-- 修改用户 -->
    <user-edit
      ref="userEdit"
      @close="handleUserEditClose"
      @success="handleUserEditSuccess"
      :userEditVisiable="userEdit.visiable">
    </user-edit>
  </a-card>
</template>

<script>
  import UserInfo from './UserInfo'
  import DeptInputTree from '../dept/DeptInputTree'
  import RangeDate from '@/components/datetime/RangeDate'
  import UserAdd from './UserAdd'
  import UserEdit from './UserEdit'

  export default {
    name: 'User',
    components: {UserInfo, UserAdd, UserEdit, DeptInputTree, RangeDate},
    data () {
      return {
        advanced: false,
        userInfo: {
          visiable: false,
          data: {}
        },
        userAdd: {
          visiable: false
        },
        userEdit: {
          visiable: false
        },
        queryParams: {},
        filteredInfo: null,
        sortedInfo: null,
        paginationInfo: null,
        dataSource: [],
        selectedRowKeys: [],
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
          title: '用户名',
          dataIndex: 'username',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'username' && sortedInfo.order
        }, {
          title: '性别',
          dataIndex: 'ssex',
          customRender: (text, row, index) => {
            switch (text) {
              case '0':
                return '男'
              case '1':
                return '女'
              case '2':
                return '保密'
              default:
                return text
            }
          },
          filters: [
            { text: '男', value: '0' },
            { text: '女', value: '1' },
            { text: '保密', value: '2' }
          ],
          filterMultiple: false,
          filteredValue: filteredInfo.ssex || null,
          onFilter: (value, record) => record.ssex.includes(value)
        }, {
          title: '邮箱',
          dataIndex: 'email',
          scopedSlots: { customRender: 'email' },
          width: 100
        }, {
          title: '电话',
          dataIndex: 'mobile'
        }, {
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
        }, {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'createTime' && sortedInfo.order
        }, {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }]
      }
    },
    mounted () {
      this.fetch()
    },
    methods: {
      onSelectChange (selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
        if (!this.advanced) {
          this.queryParams.createTimeFrom = ''
          this.queryParams.createTimeTo = ''
        }
      },
      view (record) {
        this.userInfo.data = record
        this.userInfo.visiable = true
      },
      add () {
        this.userAdd.visiable = true
      },
      handleUserAddClose () {
        this.userAdd.visiable = false
      },
      handleUserAddSuccess () {
        this.userAdd.visiable = false
        this.$message.success('新增用户成功，初始密码为1234qwer')
        this.search()
      },
      edit (record) {
        this.$refs.userEdit.setFormValues(record)
        this.userEdit.visiable = true
      },
      handleUserEditClose () {
        this.userEdit.visiable = false
      },
      handleUserEditSuccess () {
        this.userEdit.visiable = false
        this.$message.success('修改用户成功')
        this.search()
      },
      handleUserInfoClose () {
        this.userInfo.visiable = false
      },
      handleDeptChange (value) {
        this.queryParams.deptId = value || ''
      },
      handleDateChange (value) {
        if (value) {
          this.queryParams.createTimeFrom = value[0]
          this.queryParams.createTimeTo = value[1]
        }
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
            let userIds = []
            for (let key of that.selectedRowKeys) {
              userIds.push(that.dataSource[key].userId)
            }
            that.$delete('user/' + userIds.join(',')).then(() => {
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
      resetPassword () {
        if (!this.selectedRowKeys.length) {
          this.$message.warning('请选择需要重置密码的用户')
          return
        }
        let that = this
        this.$confirm({
          title: '确定重置选中用户密码?',
          content: '当您点击确定按钮后，这些用户的密码将会重置为1234qwer',
          centered: true,
          onOk () {
            let usernames = []
            for (let key of that.selectedRowKeys) {
              usernames.push(that.dataSource[key].username)
            }
            that.$put('user/password/reset', {
              usernames: usernames.join(',')
            }).then(() => {
              that.$message.success('重置用户密码成功')
              that.selectedRowKeys = []
            })
          },
          onCancel () {
            that.selectedRowKeys = []
          }
        })
      },
      exportExcel () {
        let {sortedInfo, filteredInfo} = this
        let sortField, sortOrder
        // 获取当前列的排序和列的过滤规则
        if (sortedInfo) {
          sortField = sortedInfo.field
          sortOrder = sortedInfo.order
        }
        this.$export('user/excel', {
          sortField: sortField,
          sortOrder: sortOrder,
          ...this.queryParams,
          ...filteredInfo
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
        // 清空部门树选择
        this.$refs.deptTree.reset()
        // 清空时间选择
        if (this.advanced) {
          this.$refs.createTime.reset()
        }
        this.fetch()
      },
      handleTableChange (pagination, filters, sorter) {
        // 将这三个参数赋值给Vue data，用于后续使用
        this.paginationInfo = pagination
        this.filteredInfo = filters
        this.sortedInfo = sorter

        this.userInfo.visiable = false
        this.fetch({
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...this.queryParams,
          ...filters
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
        this.$get('user', {
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

