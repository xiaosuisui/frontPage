<template>
	<!-- 搜索区域 -->
	<div style="width: 100%;">
        <a-row style="margin-top:10px;margin-left: 15px;">
        	<a-col style="margin-left: 15px;font-size: 16px;font-weight: bold;">DB03高速频率</a-col>
        </a-row>
        <a-row >
            <a-col :span="4" >
              <a-form-item
                label="变频器1"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
                <a-input v-model="highSpeedSettingEntity.gSPL1"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="变频器2"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="highSpeedSettingEntity.gSPL2"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="变频器3"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="highSpeedSettingEntity.gSPL3"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="变频器4"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="highSpeedSettingEntity.gSPL4"/>
              </a-form-item>
            </a-col>
             <a-col :span="4" >
              <a-form-item
                label="变频器5"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="highSpeedSettingEntity.gSPL5"/>
              </a-form-item>
            </a-col>
               <a-col :span="4" >
              <a-form-item
                label="变频器6"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="highSpeedSettingEntity.gSPL6"/>
              </a-form-item>
            </a-col>
        </a-row>
        <!---->
        <a-row >
            <a-col :span="4" >
              <a-form-item
                label="变频器7"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
                <a-input v-model="highSpeedSettingEntity.gSPL7"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="变频器8"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="highSpeedSettingEntity.gSPL8"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="变频器9"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="highSpeedSettingEntity.gSPL9"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="变频器10"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="highSpeedSettingEntity.gSPL10"/>
              </a-form-item>
            </a-col>
             <a-col :span="4" >
              <a-form-item
                label="变频器11"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="highSpeedSettingEntity.gSPL11"/>
              </a-form-item>
            </a-col>
               <a-col :span="4" >
              <a-form-item
                label="变频器12"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="highSpeedSettingEntity.gSPL12"/>
              </a-form-item>
            </a-col>
        </a-row>
        <a-row>
        	 <a-button style="margin-left: 15px;" type="primary" @click="clickHigh">提交高速频率</a-button>
        </a-row>
        <!--DB04-->
        <a-row style="margin-top:10px;margin-left: 15px;">
        	<a-col style="margin-left: 15px;font-size: 16px;font-weight: bold;">DB04中速频率</a-col>
        </a-row>
        <a-row >
            <a-col :span="4" >
              <a-form-item
                label="变频器1"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
                <a-input v-model="zhongSpeedSettingEntity.zSPL1"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="变频器2"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongSpeedSettingEntity.zSPL2"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="变频器3"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongSpeedSettingEntity.zSPL3"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="变频器4"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongSpeedSettingEntity.zSPL4"/>
              </a-form-item>
            </a-col>
             <a-col :span="4" >
              <a-form-item
                label="变频器5"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongSpeedSettingEntity.zSPL5"/>
              </a-form-item>
            </a-col>
               <a-col :span="4" >
              <a-form-item
                label="变频器6"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongSpeedSettingEntity.zSPL6"/>
              </a-form-item>
            </a-col>
        </a-row>
        <!---->
        <a-row >
            <a-col :span="4" >
              <a-form-item
                label="变频器7"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
                <a-input v-model="zhongSpeedSettingEntity.zSPL7"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="变频器8"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongSpeedSettingEntity.zSPL8"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="变频器9"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongSpeedSettingEntity.zSPL9"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="变频器10"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongSpeedSettingEntity.zSPL10"/>
              </a-form-item>
            </a-col>
             <a-col :span="4" >
              <a-form-item
                label="变频器11"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongSpeedSettingEntity.zSPL11"/>
              </a-form-item>
            </a-col>
               <a-col :span="4" >
              <a-form-item
                label="变频器12"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongSpeedSettingEntity.zSPL12"/>
              </a-form-item>
            </a-col>
        </a-row>
        <a-row>
        	 <a-button style="margin-left: 15px;" type="primary" @click="clickZhong">提交中速频率</a-button>
        </a-row>
        <!--低速频率-->
        
        <a-row style="margin-top:10px;margin-left: 15px;">
        	<a-col style="margin-left: 15px;font-size: 16px;font-weight: bold;">DB05低速频率</a-col>
        </a-row>
        <a-row >
            <a-col :span="4" >
              <a-form-item
                label="变频器1"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
                <a-input v-model="lowSpeedSettingEntity.dSPL1"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="变频器2"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowSpeedSettingEntity.dSPL2"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="变频器3"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowSpeedSettingEntity.dSPL3"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="变频器4"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowSpeedSettingEntity.dSPL4"/>
              </a-form-item>
            </a-col>
             <a-col :span="4" >
              <a-form-item
                label="变频器5"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowSpeedSettingEntity.dSPL5"/>
              </a-form-item>
            </a-col>
               <a-col :span="4" >
              <a-form-item
                label="变频器6"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowSpeedSettingEntity.dSPL6"/>
              </a-form-item>
            </a-col>
        </a-row>
        <!---->
        <a-row >
            <a-col :span="4" >
              <a-form-item
                label="变频器7"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
                <a-input v-model="lowSpeedSettingEntity.dSPL7"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="变频器8"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowSpeedSettingEntity.dSPL8"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="变频器9"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowSpeedSettingEntity.dSPL9"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="变频器10"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowSpeedSettingEntity.dSPL10"/>
              </a-form-item>
            </a-col>
             <a-col :span="4" >
              <a-form-item
                label="变频器11"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowSpeedSettingEntity.dSPL11"/>
              </a-form-item>
            </a-col>
               <a-col :span="4" >
              <a-form-item
                label="变频器12"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowSpeedSettingEntity.dSPL12"/>
              </a-form-item>
            </a-col>
        </a-row>
        <a-row>
        	 <a-button style="margin-left: 15px;" type="primary" @click="clickLow">提交低速频率</a-button>
        </a-row>
        <!--中投料-->
        
        <a-row style="margin-top:10px;margin-left: 15px;">
        	<a-col style="margin-left: 15px;font-size: 16px;font-weight: bold;">DB07中投料</a-col>
        </a-row>
        <a-row >
            <a-col :span="4" >
              <a-form-item
                label="螺旋1"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
                <a-input v-model="zhongTouLiaoEntity.zTl01"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="螺旋2"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongTouLiaoEntity.zTl02"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="螺旋3"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongTouLiaoEntity.zTl03"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="螺旋4"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongTouLiaoEntity.zTl04"/>
              </a-form-item>
            </a-col>
             <a-col :span="4" >
              <a-form-item
                label="螺旋5"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongTouLiaoEntity.zTl05"/>
              </a-form-item>
            </a-col>
               <a-col :span="4" >
              <a-form-item
                label="螺旋6"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongTouLiaoEntity.zTl06"/>
              </a-form-item>
            </a-col>
        </a-row>
        <!---->
        <a-row >
            <a-col :span="4" >
              <a-form-item
                label="螺旋7"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
                <a-input v-model="zhongTouLiaoEntity.zTl07"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="螺旋8"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongTouLiaoEntity.zTl08"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="螺旋9"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongTouLiaoEntity.zTl09"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="螺旋10"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongTouLiaoEntity.zTl010"/>
              </a-form-item>
            </a-col>
             <a-col :span="4" >
              <a-form-item
                label="螺旋11"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongTouLiaoEntity.zTl011"/>
              </a-form-item>
            </a-col>
               <a-col :span="4" >
              <a-form-item
                label="螺旋12"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="zhongTouLiaoEntity.zTl012"/>
              </a-form-item>
            </a-col>
        </a-row>
        <a-row>
        	 <a-button style="margin-left: 15px;" type="primary" @click="clickZhongtl">提交中投料</a-button>
        </a-row>
        <!--小投料-->
               
        <a-row style="margin-top:10px;margin-left: 15px;">
        	<a-col style="margin-left: 15px;font-size: 16px;font-weight: bold;">DB08小投料</a-col>
        </a-row>
        <a-row >
            <a-col :span="4" >
              <a-form-item
                label="螺旋1"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
                <a-input v-model="lowTouLiaoEntity.lowTl01"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="螺旋2"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowTouLiaoEntity.lowTl02"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="螺旋3"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowTouLiaoEntity.lowTl03"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="螺旋4"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowTouLiaoEntity.lowTl04"/>
              </a-form-item>
            </a-col>
             <a-col :span="4" >
              <a-form-item
                label="螺旋5"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowTouLiaoEntity.lowTl05"/>
              </a-form-item>
            </a-col>
               <a-col :span="4" >
              <a-form-item
                label="螺旋6"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowTouLiaoEntity.lowTl06"/>
              </a-form-item>
            </a-col>
        </a-row>
        <!---->
        <a-row >
            <a-col :span="4" >
              <a-form-item
                label="螺旋7"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
                <a-input v-model="lowTouLiaoEntity.lowTl07"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="螺旋8"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowTouLiaoEntity.lowTl08"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="螺旋9"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowTouLiaoEntity.lowTl09"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="螺旋10"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowTouLiaoEntity.lowTl010"/>
              </a-form-item>
            </a-col>
             <a-col :span="4" >
              <a-form-item
                label="螺旋11"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowTouLiaoEntity.lowTl011"/>
              </a-form-item>
            </a-col>
               <a-col :span="4" >
              <a-form-item
                label="螺旋12"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="lowTouLiaoEntity.lowTl012"/>
              </a-form-item>
            </a-col>
        </a-row>
        <a-row>
        	 <a-button style="margin-left: 15px;" type="primary" @click="clickxiaotl">提交小投料</a-button>
        </a-row>
        <!--投料补偿-->
                       
        <a-row style="margin-top:10px;margin-left: 15px;">
        	<a-col style="margin-left: 15px;font-size: 16px;font-weight: bold;">DB09投料补偿</a-col>
        </a-row>
        <a-row >
            <a-col :span="4" >
              <a-form-item
                label="螺旋1"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
                <a-input v-model="buChangTouLiaoEntity.bCTl1"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="螺旋2"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="buChangTouLiaoEntity.bCTl2"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="螺旋3"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="buChangTouLiaoEntity.bCTl3"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="螺旋4"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="buChangTouLiaoEntity.bCTl4"/>
              </a-form-item>
            </a-col>
             <a-col :span="4" >
              <a-form-item
                label="螺旋5"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="buChangTouLiaoEntity.bCTl5"/>
              </a-form-item>
            </a-col>
               <a-col :span="4" >
              <a-form-item
                label="螺旋6"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="buChangTouLiaoEntity.bCTl6"/>
              </a-form-item>
            </a-col>
        </a-row>
        <!---->
        <a-row >
            <a-col :span="4" >
              <a-form-item
                label="螺旋7"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
                <a-input v-model="buChangTouLiaoEntity.bCTl7"/>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                label="螺旋8"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="buChangTouLiaoEntity.bCTl8"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="螺旋9"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="buChangTouLiaoEntity.bCTl9"/>
              </a-form-item>
            </a-col>
            <a-col :span="4" >
              <a-form-item
                label="螺旋10"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="buChangTouLiaoEntity.bCTl10"/>
              </a-form-item>
            </a-col>
             <a-col :span="4" >
              <a-form-item
                label="螺旋11"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="buChangTouLiaoEntity.bCTl11"/>
              </a-form-item>
            </a-col>
               <a-col :span="4" >
              <a-form-item
                label="螺旋12"
                :labelCol="{span: 8}"
                :wrapperCol="{span: 14, offset: 2}">
               	 <a-input v-model="buChangTouLiaoEntity.bCTl12"/>
              </a-form-item>
            </a-col>
        </a-row>
        <a-row>
        	 <a-button style="margin-left: 15px;" type="primary" @click="clicktlbc">提交投料补偿</a-button>
        </a-row>
        
      </div>
</template>

<script>
	export default{
		name:'Args',
		data(){
			return{
				highSpeedSettingEntity:{},
				zhongSpeedSettingEntity:{},
				lowSpeedSettingEntity:{},
				zhongTouLiaoEntity:{},
				lowTouLiaoEntity:{},
				buChangTouLiaoEntity:{}
			}
		},
		methods: {
			clickLow(){
				const param=this.lowSpeedSettingEntity
			this.$get('setting/setDb05', {
        	...param
      		}).then((r) => {
      			this.lowSpeedSettingEntity={}
        		this.$message.success("提交低速频率成功")
    		  })
			},
			clickZhong(){
				const param=this.zhongSpeedSettingEntity
			 this.$get('setting/setDb04', {
        	...param
      		}).then((r) => {
      			this.zhongSpeedSettingEntity={}
        		this.$message.success("提交中速频率成功")
    		  })
			},
			clickHigh(){
				const param =this.highSpeedSettingEntity
				this.$get('setting/setDb03', {
        			...param
      				}).then((r) => {
      			this.highSpeedSettingEntity={}
        		this.$message.success("提交高速频率成功")
    		  })
			},
			clickZhongtl(){
				const param =this.zhongTouLiaoEntity
				this.$get('setting/setDb07', {
        	...param
      		}).then((r) => {
      			this.zhongTouLiaoEntity={}
        		this.$message.success("提交中投料成功")
    		  })
				
			},
			clickxiaotl(){
				const param =this.lowTouLiaoEntity
					this.$get('setting/setDb08', {
        	...param
      		}).then((r) => {
      			this.lowTouLiaoEntity={}
        		this.$message.success("提交小投料成功")
    		  })
				
			},
			clicktlbc(){
				const param=this.buChangTouLiaoEntity
			this.$get('setting/setDb09', {
        	...param
      		}).then((r) => {
      			this.buChangTouLiaoEntity={}
        		this.$message.success("提交投料补偿成功")
    		  })
				
			}
		}
	}
</script>

<style>
</style>