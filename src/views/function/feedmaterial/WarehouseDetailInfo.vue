<template>
   <a-modal
    v-model="show"
    :centered="true"
    :keyboard="false"
    :footer="null"
    :width="750"
    @cancel="handleCancleClick"
    title="料仓详细信息">
    <a-layout class="rawmaterial-info">
      <a-layout-sider class="rawmaterial-info-side">
      	<create-code :content="content" :contentName="contentName"></create-code>
      </a-layout-sider>
      <a-layout-content class="rawmaterial-content-one">
        <p><a-icon type="user"/>料仓名称：{{warehouseDetailInfoData.warehouseDetailName}}</p>
        <p><a-icon type="skin"/>原材料名称：{{warehouseDetailInfoData.rawmaterialName}}</p>
         <p><a-icon type="skin"/>原材料编号：{{warehouseDetailInfoData.rawmaterialNo}}</p>
      </a-layout-content>
       <a-layout-content class="user-content-two">
        <p>
          <a-icon type="smile" v-if="warehouseDetailInfoData.status === '1'"/>
          <a-icon type="frown" v-else/>状态：
          <template v-if="warehouseDetailInfoData.status === '0'">
            <a-tag color="red">锁定</a-tag>
          </template>
          <template v-else-if="warehouseDetailInfoData.status === '1'">
            <a-tag color="cyan">有效</a-tag>
          </template>
          <template v-else>
            {{warehouseDetailInfoData.status}}
          </template>
        </p>
        <p><a-icon type="clock-circle"/>物料重量：{{warehouseDetailInfoData.rawmaterialWeight}}</p>
        <p><a-icon type="login" />预警值：{{warehouseDetailInfoData.warnWeight}}</p>
      </a-layout-content>
    </a-layout>
    <a-button type="primary" style="margin-left:5px" @click="printer" >打印条码</a-button>
    </a-modal>
     
</template>

<script>
import CreateCode from './Qrcode'
import {mapState } from 'vuex'
export default {
  name: 'WarehousedetailInfo',
  components: {CreateCode},
  data(){
  	return{
  	  content:{},
  	  contentName:''
  	}
  },
  props: {
    warehouseDetailInfoVisiable: {
      require: true,
      default: false
    },
    warehouseDetailInfoData: {
      require: true
    }
  },
  computed: {
  	...mapState({
      user: state => state.account.user
    }),
    show: {
      get: function () {
      	this.content=this.warehouseDetailInfoData
      	this.contentName=this.warehouseDetailInfoData.warehouseDetailName
        return this.warehouseDetailInfoVisiable
      },
      set: function () {
      }
    }
  },
  methods: {
    handleCancleClick () {
      this.$emit('close')
    },
    printer(params={}){
     this.warehouseDetailInfoData.operator=this.user.username
     params=this.warehouseDetailInfoData
     this.$get('barcodeWarehouse/print', {
        ...params
      }).then((r) => {
       	 this.$message.success('请求打印成功')
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "WarehouseDetailInfo";
</style>