webpackJsonp([54],{H505:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("Dd8w"),o=t.n(r),s=t("fZjL"),i=t.n(s),n=t("+6Bu"),l=t.n(n),u={labelCol:{span:3},wrapperCol:{span:18}},m={name:"WarehouseEdit",props:{warehouseEditVisiable:{default:!1}},data:function(){return{formItemLayout:u,form:this.$form.createForm(this),warehouseId:"",loading:!1}},methods:{onClose:function(){this.loading=!1,this.form.resetFields(),this.$emit("close")},setFormValues:function(e){var a=this,t=l()(e,[]);this.warehouseId=t.warehouseId;var r=["warehouseName","warehouseType","status"];i()(t).forEach(function(e){if(-1!==r.indexOf(e)){a.form.getFieldDecorator(e);var o={};o[e]=t[e],a.form.setFieldsValue(o)}})},handleSubmit:function(){var e=this;this.form.validateFields(function(a,t){if(!a){e.loading=!0;var r=e.form.getFieldsValue();r.warehouseId=e.warehouseId,e.$put("warehouse",o()({},r)).then(function(a){e.loading=!1,e.$emit("success")}).catch(function(){e.loading=!1})}})}}},d={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("a-drawer",{staticStyle:{height:"calc(100% - 55px)",overflow:"auto","padding-bottom":"53px"},attrs:{title:"修改模板",maskClosable:!1,width:"650",placement:"right",closable:!1,visible:e.warehouseEditVisiable},on:{close:e.onClose}},[t("a-form",{attrs:{form:e.form}},[t("a-form-item",e._b({attrs:{label:"模板名称"}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["warehouseName"],expression:"['warehouseName']"}],attrs:{readOnly:""}})],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"模板类型"}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["warehouseType"],expression:"['warehouseType']"}],attrs:{readOnly:""}})],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"状态"}},"a-form-item",e.formItemLayout,!1),[t("a-radio-group",{directives:[{name:"decorator",rawName:"v-decorator",value:["status",{rules:[{required:!0,message:"请选择状态"}]}],expression:"[\n          'status',\n          {rules: [{ required: true, message: '请选择状态' }]}\n        ]"}]},[t("a-radio",{attrs:{value:"0"}},[e._v("锁定")]),e._v(" "),t("a-radio",{attrs:{value:"1"}},[e._v("开启")])],1)],1)],1),e._v(" "),t("div",{staticClass:"drawer-bootom-button"},[t("a-popconfirm",{attrs:{title:"确定放弃编辑？",okText:"确定",cancelText:"取消"},on:{confirm:e.onClose}},[t("a-button",{staticStyle:{"margin-right":".8rem"}},[e._v("取消")])],1),e._v(" "),t("a-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)},staticRenderFns:[]},c=t("VU/8")(m,d,!1,null,null,null);a.default=c.exports}});