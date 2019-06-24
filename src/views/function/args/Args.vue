<template>
  <!-- 搜索区域
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
          &lt;!&ndash;&ndash;&gt;
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
          &lt;!&ndash;DB04&ndash;&gt;
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
          &lt;!&ndash;&ndash;&gt;
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
          &lt;!&ndash;低速频率&ndash;&gt;

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
          &lt;!&ndash;&ndash;&gt;
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
          &lt;!&ndash;中投料&ndash;&gt;

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
          &lt;!&ndash;&ndash;&gt;
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
          &lt;!&ndash;小投料&ndash;&gt;

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
          &lt;!&ndash;&ndash;&gt;
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
          &lt;!&ndash;投料补偿&ndash;&gt;

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
          &lt;!&ndash;&ndash;&gt;
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

        </div>-->

  <div class="args">
    <div class="args-title">
      <span class="args-title-txt">
        参数设置
      </span>
      <div class="args-title-btn">
        <div class="args-title-btn-margin-exit" @click="edit"></div>
        <div class="args-title-btn-margin-save" @click="save"></div>
      </div>
    </div>
    <a-row type="flex" class="args-row args-row-margin-motor">
      <a-col :span="1" class="args-col">
        <div class="args-col-title args-col-header args-col-header-oblique">
          <span class="args-col-header-oblique-top-right-txt">电机</span>
          <span class="args-col-header-oblique-bottom-left-txt">数值</span>
        </div>
        <div class="args-col-title args-col-title-line">高速值（HZ）</div>
        <div class="args-col-title args-col-title-line">中速值（HZ）</div>
        <div class="args-col-title args-col-title-line">低速值（HZ）</div>
        <div class="args-col-title args-col-title-line">高速值（g）</div>
        <div class="args-col-title args-col-title-line">中速值（g）</div>
        <div class="args-col-title args-col-title-line">余量（g）</div>
      </a-col>
      <a-col :span="1" v-for="spiralMotor of spiralMotors" :key="spiralMotor.name" class="args-col">
        <div class="args-col-header args-col-header-line">{{spiralMotor.name}}</div>
        <div class="args-col-txt args-col-txt-line">
          <a-input-number v-model="spiralMotor.highSpeedHZ" :disabled="isExit"
                          :class="isExit?'args-col-txt-disEdit':'args-col-txt-edit'"/>
        </div>
        <div class="args-col-txt args-col-txt-line">
          <a-input-number v-model="spiralMotor.mediumSpeedHZ" :disabled="isExit"
                          :class="isExit?'args-col-txt-disEdit':'args-col-txt-edit'"/>
        </div>
        <div class="args-col-txt args-col-txt-line">
          <a-input-number v-model="spiralMotor.lowSpeedHZ" :disabled="isExit"
                          :class="isExit?'args-col-txt-disEdit':'args-col-txt-edit'"/>
        </div>
        <div class="args-col-txt args-col-txt-line">
          <a-input-number v-model="spiralMotor.highSpeed" :disabled="isExit"
                          :class="isExit?'args-col-txt-disEdit':'args-col-txt-edit'"/>
        </div>
        <div class="args-col-txt args-col-txt-line">
          <a-input-number v-model="spiralMotor.mediumSpeed" :disabled="isExit"
                          :class="isExit?'args-col-txt-disEdit':'args-col-txt-edit'"/>
        </div>
        <div class="args-col-txt args-col-txt-line">
          <a-input-number v-model="spiralMotor.allowance" :disabled="isExit"
                          :class="isExit?'args-col-txt-disEdit':'args-col-txt-edit'"/>
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" class="args-row args-row-margin">
      <a-col :span="1" v-for="vibrator of vibrators" :key="vibrator.name" class="args-col">
        <div class="args-col-header args-col-header-line">{{vibrator.name}}</div>
        <div class="args-col-txt args-col-txt-line">
          <a-row type="flex" class="args-row">
            <a-col class="args-col args-col-title ">开周期</a-col>
            <a-col class="args-col">
              <a-input-number v-model="vibrator.open" :disabled="isExit"
                              :class="isExit?'args-col-txt-disEdit':'args-col-txt-edit'"/>
            </a-col>
          </a-row>
        </div>
        <div class="args-col-txt args-col-txt-line">
          <a-row type="flex" class="args-row">
            <a-col class="args-col args-col-title ">关周期</a-col>
            <a-col class="args-col">
              <a-input-number v-model="vibrator.close" :disabled="isExit"
                              :class="isExit?'args-col-txt-disEdit':'args-col-txt-edit'"/>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>

    <a-row type="flex" class="args-row args-row-margin">
      <a-col :span="1" v-for="bridge in bridges" :key="bridge.name" class="args-col">
        <div class="args-col-header args-col-header-line">{{bridge.name}}</div>
        <div class="args-col-txt args-col-txt-line">
          <a-row type="flex" class="args-row">
            <a-col class="args-col args-col-title ">开周期</a-col>
            <a-col class="args-col">
              <a-input-number v-model="bridge.open" :disabled="isExit"
                              :class="isExit?'args-col-txt-disEdit':'args-col-txt-edit'"/>
            </a-col>
          </a-row>
        </div>
        <div class="args-col-txt args-col-txt-line">
          <a-row type="flex" class="args-row">
            <a-col class="args-col args-col-title ">关周期</a-col>
            <a-col class="args-col">
              <a-input-number v-model="bridge.close" :disabled="isExit"
                              :class="isExit?'args-col-txt-disEdit':'args-col-txt-edit'"/>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import ARow from 'ant-design-vue/es/grid/Row'
  import ACol from 'ant-design-vue/es/grid/Col'

  export default {
    name: 'Args',
    components: {ACol, ARow},
    data () {
      return {
        highSpeedSettingEntity: {},
        zhongSpeedSettingEntity: {},
        lowSpeedSettingEntity: {},
        zhongTouLiaoEntity: {},
        lowTouLiaoEntity: {},
        buChangTouLiaoEntity: {},
        spiralMotors: [],
        vibrators: [],
        bridges: [],
        isExit: true
      }
    },
    created () {
      for (let i = 1; i <= 12; i++) {
        this.spiralMotors.push({
          name: `${i}号螺旋电机`,
          highSpeedHZ:'',
          mediumSpeedHZ:'' ,
          lowSpeedHZ:'',
          highSpeed:'',
          mediumSpeed:'',
          allowance: ''
        })
        this.vibrators.push({
          name: `${i}号振动器`,
          open: "",
          close:""
        })
        this.bridges.push({
          name: `${i}号破桥器`,
          open: "",
          close: ""
        })
      }
    },
    mounted (){
    	this.fetch()
    },
    methods: {
      clickLow () {
        const param = this.lowSpeedSettingEntity
        this.$get('setting/setDb05', {
          ...param
        }).then((r) => {
          this.lowSpeedSettingEntity = {}
          this.$message.success('提交低速频率成功')
        })
      }
      ,
      clickZhong () {
        const param = this.zhongSpeedSettingEntity
        this.$get('setting/setDb04', {
          ...param
        }).then((r) => {
          this.zhongSpeedSettingEntity = {}
          this.$message.success('提交中速频率成功')
        })
      }
      ,
      clickHigh () {
        const param = this.highSpeedSettingEntity
        this.$get('setting/setDb03', {
          ...param
        }).then((r) => {
          this.highSpeedSettingEntity = {}
          this.$message.success('提交高速频率成功')
        })
      }
      ,
      clickZhongtl () {
        const param = this.zhongTouLiaoEntity
        this.$get('setting/setDb07', {
          ...param
        }).then((r) => {
          this.zhongTouLiaoEntity = {}
          this.$message.success('提交中投料成功')
        })

      }
      ,
      clickxiaotl () {
        const param = this.lowTouLiaoEntity
        this.$get('setting/setDb08', {
          ...param
        }).then((r) => {
          this.lowTouLiaoEntity = {}
          this.$message.success('提交小投料成功')
        })

      }
      ,
      clicktlbc () {
        const param = this.buChangTouLiaoEntity
        this.$get('setting/setDb09', {
          ...param
        }).then((r) => {
          this.buChangTouLiaoEntity = {}
          this.$message.success('提交投料补偿成功')
        })

      },
      edit () {
        this.isExit = !this.isExit
      },
      //读书数据
      fetch(){
      this.$get('setting/getDbArg', {
         
        }).then((r) => {
           let data=r.data;
           console.log(data)
           this.spiralMotors=data['authors']
           this.vibrators=data['author01']
           this.bridges=data['author02']
        })
      },
      save () {
        this.isExit = true
        var Params = {
				  authors: this.spiralMotors,
				  author01:this.vibrators,
				  author02:this.bridges
				}
         $.ajax({
				  url: 'http://127.0.0.1:9527/setting/setDbArg',
 					method: 'post',
 					processData:false,
  				contentType: "application/json; charset=utf-8",
  				dataType: "json",
  				data: JSON.stringify(Params)
					}).then( res => {
 						 console.log(res)
					})

      }
    }
  }
</script>

<style scoped lang="less">
  .args {
    width: 100%;
    height: 100%;
    background: #1d2437;
    padding: 20px;

    &-title {
      width: 100%;
      height: 56px;
      background-image: url("../../../assets/images/title-bg.png");
      background-position: center;
      background-repeat: no-repeat;
      text-align: center;
      position: relative;

      &-txt {
        height: 56px;
        line-height: 56px;
        font-size: 24px;
        font-weight: 500;
        color: #fff;
      }

      &-btn {
        display: inline-block;
        position: absolute;
        /*line-height: 56px;*/
        margin-top: 13px;
        right: 0;

        &-margin-exit {
          margin-right: 30px;
          height: 30px;
          width: 84px;
          display: inline-block;
          background-image: url("../../../assets/images/exit-bg.png");
          background-repeat: no-repeat;
          background-position: center;

          &:hover, &:focus, &:active {
            height: 30px;
            width: 84px;
            background-image: url("../../../assets/images/exit-bg.png");
            background-repeat: no-repeat;
            background-position: center;
          }
        }

        &-margin-save {
          margin-right: 30px;
          height: 30px;
          width: 84px;
          display: inline-block;
          background-image: url("../../../assets/images/save-bg.png");
          background-repeat: no-repeat;
          background-position: center;

          &:hover, &:focus, &:active {
            height: 30px;
            width: 84px;
            background-image: url("../../../assets/images/save-bg.png");
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
    }

    &-row {
      width: 100%;
      background: #2d354e;
      margin-left: 0 !important;
      margin-right: 0 !important;

      &-margin {
        margin-top: 10px;

        &-motor {
          padding-top: 20px;
        }
      }
    }

    &-col {
      flex: 1;
      font-size: 18px;
      color: #fff;
      text-align: center;


      &-title {
        height: 65px;
        line-height: 65px;
        background: #2b385c;

        &-line {
          border-top: 1px solid #2a3a69;
        }
      }

      &-header {
        height: 72px;
        line-height: 72px;
        background-color: #2a3a69;

        &-oblique {
          background-image: url("../../../assets/images/line-bg.png");
          background-repeat: no-repeat;
          background-position: center;
          position: relative;

          &-top-right-txt {
            position: absolute;
            line-height: inherit;
            top: -10px;
            right: 20px;
          }

          &-bottom-left-txt {
            position: absolute;
            line-height: initial;
            bottom: 10px;
            left: 20px;
          }
        }


        &-line {
          border-left: 1px solid #2d354e;
        }
      }

      &-txt {
        height: 65px;
        line-height: 65px;
        background: #2d354e;

        &-disEdit {
          background: #2d354e;
          border-radius: 0;
        }

        &-edit {
          background: #1d2437;
          border-radius: 2px;
        }


        &-line {
          border-left: 1px solid #2a3a69;
          border-top: 1px solid #2a3a69;
        }
      }
    }
  }

  /deep/ .ant-input-number {
    /*background: #2d354e;*/
    border-radius: 2px;
    border: none;
  }

  /deep/ .ant-input-number-input {

    color: #fff;
    font-size: 18px;
    text-align: center;
  }

  /deep/ .ant-input-number-handler-wrap {
    display: none;
  }

  /*/deep/ .ant-input-number:hover,.ant-input-number:focus{*/
  /*  border: none;*/
  /*}*/
</style>
