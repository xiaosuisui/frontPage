<template>
  <a-drawer
    title="修改详信息"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="warehouseDetailEditVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='料仓编号' v-bind="formItemLayout">
        <a-input readOnly v-decorator="['warehouseDetailName']"/>
      </a-form-item>
      <!--原材料编号-->
       <a-form-item label='原材料名称' v-bind="formItemLayout">
        <a-input readOnly v-decorator="['rawmaterialName']"/>
      </a-form-item>
     <a-form-item label='原材料编号' v-bind="formItemLayout">
        <a-input readOnly v-decorator="['rawmaterialNo']"/>
      </a-form-item>
      <a-form-item label='重量' v-bind="formItemLayout">
        <a-input readOnly v-decorator="['rawmaterialWeight']"/>
      </a-form-item>
      <a-form-item label='预警值' v-bind="formItemLayout">
        <a-input  v-decorator="['warnWeight']"/>
      </a-form-item>
      <a-form-item label='数量' v-bind="formItemLayout">
        <a-input  v-decorator="['quantity']"/>
      </a-form-item>
    </a-form> 
    <!--选择列表-->
    <row-select :currentWarehouseDetail="warehouseDetailId" 
    	@send="sendSelectedId"></row-select>
      
    <div class="drawer-bootom-button">
      <a-popconfirm title="确定放弃编辑？" @confirm="onClose" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="loading">提交</a-button>
    </div>
  </a-drawer>
</template>

<script>
	import RowSelect from './RowSelect'
	const formItemLayout = {
  	labelCol: { span: 3 },
 	  wrapperCol: { span: 18 }
	}
export default {
  name: 'WarehousedetailEdit',
  components: {RowSelect},
  props: {
    warehouseDetailEditVisiable: {
      default: false
    }
  },
  data () {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
      warehouseDetailId:'',
      selectedId:'',
      loading: false
    }
  },
  methods: {
  	sendSelectedId(param){
  		if(param=='0000'){
  			let obj={'rawmaterialName':'','rawmaterialNo':'','weight':'0'}
  			this.form.setFieldsValue(obj)
  			return
  		}
  		const params={id:param}
  	  this.$get('rawmaterial/getRawmaterial', {
        ...params
      }).then((r) => {
        let data = r.data
        let obj={'rawmaterialName':data['rawmaterialName'],'rawmaterialNo':data['rawmaterialNo'],'rawmaterialWeight':data['weight']}
        console.log(obj)
        this.form.setFieldsValue(obj)
      })
  	},
    onClose () {
      this.loading = false
      this.form.resetFields()
      this.$emit('close')
    },
    setFormValues ({...warehousedetail}) {
    	this.warehouseDetailId=warehousedetail.warehouseDetailId
      let fields = ['warehouseDetailName','rawmaterialName', 'rawmaterialNo','rawmaterialWeight','warnWeight','quantity']
      Object.keys(warehousedetail).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = warehousedetail[key]
          this.form.setFieldsValue(obj)
        }
      })
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          let warehousedetail = this.form.getFieldsValue()
					warehousedetail.warehouseDetailId = this.warehouseDetailId
          this.$put('warehousedetail', {
            ...warehousedetail
          }).then((r) => {
            this.loading = false
            this.$emit('success')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
