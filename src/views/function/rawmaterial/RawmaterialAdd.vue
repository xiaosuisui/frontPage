<template>
  <a-drawer
    title="新增原材料"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="rawmaterialAddVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='名称'
                   v-bind="formItemLayout"
                   :validateStatus="validateStatus"
                   :help="help">
        <a-input v-model="rawmaterial.rawmaterialName"
                 @blur="handleRawmaterialBlur"
                 v-decorator="['rawmaterialName',{rules: [{ required: true, message: '原材料名称不能为空'}]}]"/>
      </a-form-item>     
      <a-form-item label='编号'
                   v-bind="formItemLayout"
                   :validateStatus="validateStatus"
                   :help="help">
        <a-input v-model="rawmaterial.rawmaterialNo"
                 @blur="handleRawmaterialBlur"
                 v-decorator="['rawmaterialNo',{rules: [{ required: true, message: '原材料编号不能为空'}]}]"/>
      </a-form-item>
      <a-form-item label='重量'
                   v-bind="formItemLayout"
                   :validateStatus="validateStatus"
                   :help="help">
        <a-input v-model="rawmaterial.weight"
                 @blur="handleRawmaterialBlur"
                 v-decorator="['weight',{rules: [{ required: true, message: '原材料编号不能为空'}]}]"/>
      </a-form-item>
      <a-form-item label='状态' v-bind="formItemLayout">
        <a-radio-group
          v-model="rawmaterial.status"
          v-decorator="['status',{rules: [{ required: true, message: '请选择状态'}]}]">
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
import {mapState } from 'vuex'
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'RawmaterialAdd',
  props: {
    rawmaterialAddVisiable: {
      default: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    })},
    
  data () {
    return {
      rawmaterial: {
        rawmaterialName: ''
      },
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      validateStatus: '',
      help: ''
    }
  },
  methods: {
    reset () {
      this.validateStatus = ''
      this.help = ''
      this.rawmaterial.rawmaterialName = ''
      this.loading = false
      this.form.resetFields()
    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    handleSubmit () {
      if (this.validateStatus !== 'success') {
        this.handleUserNameBlur()
      }
      this.form.validateFields((err, values) => {
        if (!err && this.validateStatus === 'success') {
          this.loading = true
          this.rawmaterial.userName=this.user.username
          this.$post('rawmaterial', {
            ...this.rawmaterial
          }).then((r) => {
            this.reset()
            this.$emit('success')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    handleRawmaterialBlur () {
      let rawmaterialName = this.rawmaterial.rawmaterialName.trim()
      if (rawmaterialName.length) {
        if (rawmaterialName.length > 20) {
          this.validateStatus = 'error'
          this.help = '原材料名称不能超过10个字'
        } else if (rawmaterialName.length < 4) {
          this.validateStatus = 'error'
          this.help = '用户名不能少于4个字符'
        } else {
          this.validateStatus = 'validating'
          this.$get(`rawmaterial/check/${rawmaterialName}`).then((r) => {
            if (r.data) {
              this.validateStatus = 'success'
              this.help = ''
            } else {
              this.validateStatus = 'error'
              this.help = '抱歉，该用户名已存在'
            }
          })
        }
      } else {
        this.validateStatus = 'error'
        this.help = '原材料名称不能为空'
      }
    }
  }
}
</script>
