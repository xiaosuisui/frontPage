<template>
   <a-modal
    v-model="show"
    :centered="true"
    :keyboard="false"
    :footer="null"
    :width="750"
    @cancel="handleCancleClick"
    title="原材料信息">
    <a-layout class="rawmaterial-info">
      <a-layout-sider class="rawmaterial-info-side">
        <!--<a-avatar shape="square" :size="115" icon="user" :src="`static/avatar/${rawmaterialInfoData.avatar}`"/>-->
      </a-layout-sider>
      <a-layout-content class="rawmaterial-content-one">
        <p><a-icon type="user"/>原材料名称：{{rawmaterialInfoData.rawmaterialName}}</p>
        <p><a-icon type="skin"/>原材料编号：{{rawmaterialInfoData.rawmaterialNo}}</p>
         <p><a-icon type="skin"/>重量：{{rawmaterialInfoData.weight}}</p>
        <p><a-icon type="skin"/>创建人：{{rawmaterialInfoData.userName}}</p>
      </a-layout-content>
       <a-layout-content class="user-content-two">
        <p>
          <a-icon type="smile" v-if="rawmaterialInfoData.status === '1'"/>
          <a-icon type="frown" v-else/>状态：
          <template v-if="rawmaterialInfoData.status === '0'">
            <a-tag color="red">锁定</a-tag>
          </template>
          <template v-else-if="rawmaterialInfoData.status === '1'">
            <a-tag color="cyan">有效</a-tag>
          </template>
          <template v-else>
            {{rawmaterialInfoData.status}}
          </template>
        </p>
        <p><a-icon type="clock-circle"/>创建时间：{{rawmaterialInfoData.createDate}}</p>
        <p><a-icon type="login" />编辑时间：{{rawmaterialInfoData.editDate}}</p>
      </a-layout-content>
    </a-layout>
    </a-modal>
</template>

<script>
export default{
  name: 'RawmaterialInfo',
  props: {
    rawmaterialInfoVisiable: {
      require: true,
      default: false
    },
    rawmaterialInfoData: {
      require: true
    }
  },
  computed: {
    show: {
      get: function () {
        return this.rawmaterialInfoVisiable
      },
      set: function () {
      }
    }
  },
  methods: {
    handleCancleClick () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
@import "RawmaterialInfo";
</style>