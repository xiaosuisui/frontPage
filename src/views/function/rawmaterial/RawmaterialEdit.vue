<template>
  <a-drawer
    title="修改原材料"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="rawmaterialEditVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='原材料名称' v-bind="formItemLayout">
        <a-input  v-decorator="['rawmaterialName']"/>
      </a-form-item>
      <!--原材料编号-->
       <a-form-item label='原材料编号' v-bind="formItemLayout">
        <a-input  v-decorator="['rawmaterialNo']"/>
      </a-form-item>
      <a-form-item label='重量' v-bind="formItemLayout">
        <a-input  v-decorator="['weight']"/>
      </a-form-item>
      <a-form-item label='状态' v-bind="formItemLayout">
        <a-radio-group
          v-decorator="[
            'status',
            {rules: [{ required: true, message: '请选择状态' }]}
          ]">
          <a-radio value="0">锁定</a-radio>
          <a-radio value="1">有效</a-radio>
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
  name: 'RawmaterialEdit',
  props: {
    rawmaterialEditVisiable: {
      default: false
    }
  },
  data () {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
      rawmaterialId:'',
      loading: false
    }
  },
  methods: {
    onClose () {
      this.loading = false
      this.form.resetFields()
      this.$emit('close')
    },
    setFormValues ({...rawmaterial}) {
    	this.rawmaterialId=rawmaterial.rawmaterialId
      let fields = ['rawmaterialName', 'rawmaterialNo','weight', 'status']
      Object.keys(rawmaterial).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = rawmaterial[key]
          this.form.setFieldsValue(obj)
        }
      })

    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          let rawmaterial = this.form.getFieldsValue()
					rawmaterial.rawmaterialId = this.rawmaterialId
          this.$put('rawmaterial', {
            ...rawmaterial
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
