<template>
  <a-drawer
    title="修改模板"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="warehouseEditVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='模板名称' v-bind="formItemLayout">
        <a-input readOnly v-decorator="['warehouseName']"/>
      </a-form-item>
      <!--原材料编号-->
       <a-form-item label='模板类型' v-bind="formItemLayout">
        <a-input readOnly v-decorator="['warehouseType']"/>
      </a-form-item>
      <a-form-item label='状态' v-bind="formItemLayout">
        <a-radio-group
          v-decorator="[
            'status',
            {rules: [{ required: true, message: '请选择状态' }]}
          ]">
          <a-radio value="0">锁定</a-radio>
          <a-radio value="1">开启</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <div class="drawer-bootom-button">
      <a-popconfirm title="确定放弃编辑？" @confirm="onClose" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="loading">提交</a-button>
    </div>
  </a-drawer>
</template>
<script>
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'WarehouseEdit',
  props: {
    warehouseEditVisiable: {
      default: false
    }
  },
  data () {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
      warehouseId:'',
      loading: false
    }
  },
  methods: {
    onClose () {
      this.loading = false
      this.form.resetFields()
      this.$emit('close')
    },
    setFormValues ({...warehouse}) {
    	this.warehouseId=warehouse.warehouseId
      let fields = ['warehouseName', 'warehouseType', 'status']
      Object.keys(warehouse).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = warehouse[key]
          this.form.setFieldsValue(obj)
        }
      })

    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          let warehouse = this.form.getFieldsValue()
					warehouse.warehouseId = this.warehouseId
          this.$put('warehouse', {
            ...warehouse
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
