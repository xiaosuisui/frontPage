<template>
  <div :class="[multipage === true ? 'multi-page':'single-page', 'not-menu-page', 'home-page']">
    <a-row :gutter="8" class="head-info">
      <a-card class="head-info-card">
        <a-col :span="12">
          	<span style="font-size: 30px;font-weight: 400;">生产查询</span>
        </a-col>
        <a-col :span="12">
          <div>
            <a-row class="more-info">
              <a-col :span="4"></a-col>
              <a-col :span="4"></a-col>
              <a-col :span="4"></a-col>
              <a-col :span="4">
                <head-info title="日产量" :content="todayIp" :center="true" :bordered="true"/>
              </a-col>
              <a-col :span="3">
                <head-info title="消耗量" :content="todayVisitCount" :center="true" :bordered="false"/>
              </a-col>
              <a-col :span="3">
                <head-info title="不良数" :content="totalVisitCount" :center="true" />
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-card>
    </a-row>
    <a-row :gutter="8" class="count-info">
      <a-col :span="10" class="visit-count-wrapper">
        <a-card class="visit-count">
          <apexchart ref="count" type=bar height=350 :options="chartOptions" :series="series" />
        </a-card>
        <a-card class="visit-count">
        <a-col :span=8 :offset=6>
           <apexchart ref="pie" type=donut width=300 :options="chartOptions1" :series="series1" />
         </a-col>
        </a-card>
      </a-col>
      <a-col :span="14" class="project-wrapper">
        <a-card  class="project-card">
        <a-form layout="horizontal">
        	<div :class="advanced ? null: 'fold'">
          		<a-row >
            <a-col :md="16" :sm="24" :offset=8 >
              <a-form-item
                label="创建时间"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}">
                <range-date @change="handleDateChange" ref="createTime"></range-date>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="search">查询</a-button>
          <a-button style="margin-left: 8px" @click="reset">重置</a-button>
        </span>
      </a-form>
          	<a-table ref="TableInfo"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="pagination"
               :size="small"
               :loading="loading"
               @change="handleTableChange" >
    		</a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import HeadInfo from '@/views/common/HeadInfo'
import RangeDate from '@/components/datetime/RangeDate'
import {mapState} from 'vuex'
import moment from 'moment'
moment.locale('zh-cn')
export default {
  name: 'Production',
  components: {HeadInfo,RangeDate},
  data () {
    return {
    	advanced:false,
    	queryParams: {},
      	filteredInfo: null,
    	dataSource:[],
 		loading: false,
		pagination: {
			pageSizeOptions: ['10', '20', '30', '40', '100'],
			defaultCurrent: 1,
			defaultPageSize: 10,
			showQuickJumper: true,
			showSizeChanger: true,
			showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`

		},
       series1: [44, 55],
        chartOptions1: {
          dataLabels: {
            enabled: false
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: true
              }
            }
          }],
          legend: {
              position: 'right',
              offsetY: 0,
              height: 230,
          }
          ,  
          labels: ["合格数", "不合格数"],
        },
      series: [],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '35%'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: []
        },
        fill: {
          opacity: 1

        }
      },
      todayIp: '',
      todayVisitCount: '',
      totalVisitCount: ''
    }
  },
 activated(){
  	this.fetch()
 },
  computed: {
    ...mapState({
      multipage: state => state.setting.multipage,
      user: state => state.account.user
    }),
   columns () {
		let { sortedInfo, filteredInfo } = this
		sortedInfo = sortedInfo || {}
		filteredInfo = filteredInfo || {}
		return [{
			title: '工单名称',
			dataIndex: 'formularName',
			sorter: true,
			sortOrder: sortedInfo.columnKey === 'formularName' && sortedInfo.order
			}, 
			{
			title: '操作人',
			dataIndex: 'author',
			sorter: true,
			sortOrder: sortedInfo.columnKey === 'author' && sortedInfo.order
			}, 
		   {
			title: '批次',
			dataIndex: 'batchNo',
			sorter: true,
			sortOrder: sortedInfo.columnKey === 'batchNo' && sortedInfo.order
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
	        sorter: true,
	        ortOrder: sortedInfo.columnKey === 'createDate' && sortedInfo.order
	      },
      		]
    		}
 	 },
  methods: { 
  	reset(){},
 
  	/*获取数据*/
  	fetch(params = {}){
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
      this.$get('productionData', {
        ...params
      }).then((r) => {
        let data = r.data
        const pagination = { ...this.pagination }
        pagination.total = data.listData.length
        this.dataSource = data.listData
        this.pagination = pagination
        // 数据加载完毕，关闭loading
        this.loading = false
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
	handleDateChange (value) {
      if (value) {
        this.queryParams.createTimeFrom = value[0]
        this.queryParams.createTimeTo = value[1]
      }
    }
  },
  mounted () {
  	this.fetch(),
    this.$get(`index/${this.user.username}`).then((r) => {
      let data = r.data.data
      this.todayIp = data.todayIp
      this.todayVisitCount = data.todayVisitCount
      this.totalVisitCount = data.totalVisitCount
      let sevenVisitCount = []
      let dateArr = []
      for (let i = 6; i >= 0; i--) {
        let time = moment().subtract(i, 'days').format('MM-DD')
        let contain = false
        for (let o of data.lastSevenVisitCount) {
          if (o.days === time) {
            contain = true
            sevenVisitCount.push(o.count)
          }
        }
        if (!contain) {
          sevenVisitCount.push(0)
        }
        dateArr.push(time)
      }
      let sevenUserVistCount = []
      for (let i = 6; i >= 0; i--) {
        let time = moment().subtract(i, 'days').format('MM-DD')
        let contain = false
        for (let o of data.lastSevenUserVisitCount) {
          if (o.days === time) {
            contain = true
            sevenUserVistCount.push(o.count)
          }
        }
        if (!contain) {
          sevenUserVistCount.push(0)
        }
      }
      this.$refs.count.updateSeries([
        {
          name: '您',
          data: sevenUserVistCount
        },
        {
          name: '总数',
          data: sevenVisitCount
        }
      ], true)
      this.$refs.count.updateOptions({
        xaxis: {
          categories: dateArr
        },
        title: {
          text: '工单生产图表',
          align: 'left'
        }
      }, true, true),
      this.$refs.pie.updateOptions({
        title: {
          text: '良品率',
          align: 'left'
        }
      }, true, true)
    }).catch((r) => {
      console.error(r)
      this.$message.error('获取首页信息失败')
    })
  }
}
</script>
<style lang="less">
	.single-page{
		width:100%
	}
	.fold{
		display: inline-block;
		width: calc(100% - 216px);
	}
	    
  .home-page {
    .head-info {
      margin-bottom: .5rem;
      .head-info-card {
        padding: .5rem;
        border-color: #f1f1f1;
        .head-info-avatar {
          display: inline-block;
          float: left;
          margin-right: 1rem;
          img {
            width: 5rem;
            border-radius: 2px;
          }
        }
        .head-info-count {
          display: inline-block;
          float: left;
          .head-info-welcome {
            font-size: 1.05rem;
            margin-bottom: .1rem;
          }
          .head-info-desc {
            color: rgba(0, 0, 0, 0.45);
            font-size: .8rem;
            padding: .2rem 0;
            p {
              margin-bottom: 0;
            }
          }
          .head-info-time {
            color: rgba(0, 0, 0, 0.45);
            font-size: .8rem;
            padding: .2rem 0;
          }
        }
      }
    }
    .count-info {
      .visit-count-wrapper {
        padding-left: 0 !important;
        .visit-count {
          padding: .5rem;
          border-color: #f1f1f1;
          .ant-card-body {
            padding: .5rem 1rem !important;
          }
        }
      }
      .project-wrapper {
        padding-right: 0 !important;
        .project-card {
          border: none !important;
          .ant-card-head {
            border-left: 1px solid #f1f1f1 !important;
            border-top: 1px solid #f1f1f1 !important;
            border-right: 1px solid #f1f1f1 !important;
          }
          .ant-card-body {
            padding: 0 !important;
            table {
              width: 100%;
              td {
                border: 1px solid #f1f1f1;
                padding: .6rem;
                .project-avatar-wrapper {
                  display:inline-block;
                  float:left;
                  margin-right:.7rem;
                  .project-avatar {
                    color: #42b983;
                    background-color: #d6f8b8;
                  }
                }
              }
            }
          }
          .project-detail {
            display:inline-block;
            float:left;
            text-align:left;
            width: 78%;
            .project-name {
              font-size:.9rem;
              margin-top:-2px;
              font-weight:600;
            }
            .project-desc {
              color:rgba(0, 0, 0, 0.45);
              p {
                margin-bottom:0;
                font-size:.6rem;
                white-space:normal;
              }
            }
          }
        }
      }
    }
  }
</style>
