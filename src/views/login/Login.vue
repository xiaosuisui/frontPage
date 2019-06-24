<template>
  <div class="login">
    <a-form @submit.prevent="doLogin" :autoFormCreate="(form) => this.form = form" class="login-form">

      <div class="login-title"></div>
      <a-form-item
        fieldDecoratorId="name"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名', whitespace: true}]}">
        <a-input size="large" class="input-bg" placeholder="请输入用户名">
          <a-icon slot="prefix" type="user" style="color:#3586df"></a-icon>
        </a-input>
      </a-form-item>
      <a-form-item
        fieldDecoratorId="password"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码', whitespace: true}]}"
      >
        <a-input size="large" type="password" class="input-bg" placeholder="请输入密码">
          <a-icon slot="prefix" type="lock" style="color:#3586df"></a-icon>
        </a-input>
      </a-form-item>
      <a-form-item style="margin-bottom: 10px">
        <a-button :loading="loading" size="large" htmlType="submit" type="primary">
          登录
        </a-button>
      </a-form-item>
      <div style="text-align: center;font-size: 16px;color:#3586df">
        <a style="text-align: center" @click="regist">注册账户</a>
      </div>
    </a-form>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    name: 'Login',
    data () {
      return {
        loading: false,
        error: '',
        activeKey: '1'
      }
    },
    computed: {
      systemName () {
        return this.$store.state.setting.systemName
      },
      copyright () {
        return this.$store.state.setting.copyright
      }
    },
    created () {
      this.$db.clear()
      this.$router.options.routes = []
    },
    methods: {
      doLogin () {
        if (this.activeKey === '1') {
          // 用户名密码登录
          this.form.validateFields(['name', 'password'], (errors, values) => {
            if (!errors) {
              this.loading = true
              let name = this.form.getFieldValue('name')
              let password = this.form.getFieldValue('password')
              this.$post('login', {
                username: name,
                password: password
              }).then((r) => {
                let data = r.data.data
                let message=r.data.message
                console.log(message)
                if(message=='NOK'){
                	localStorage.setItem("expire","ok")
                	console.log('come in')
                	this.$router.push('/setting/upgrade')
                }else if(message=='NNOK'){//试用提醒阶段
                	  this.saveLoginData(data)
                	  this.$router.push('/setting/upgrade')
                }else{
                	this.saveLoginData(data)
                	setTimeout(() => {
                  this.loading = false
                	}, 500)
               
                this.$router.push('/')
                }
              }).catch(() => {
                setTimeout(() => {
                  this.loading = false
                }, 500)
              })
            }
          })
        }
        if (this.activeKey === '2') {
          // 手机验证码登录
          this.$message.warning('暂未开发')
        }
      },
      regist () {
        this.$emit('regist', 'Regist')
      },
      getCaptcha () {
        this.$message.warning('暂未开发')
      },
      handleTabsChange (val) {
        this.activeKey = val
      },
      ...mapMutations({
        setToken: 'account/setToken',
        setExpireTime: 'account/setExpireTime',
        setPermissions: 'account/setPermissions',
        setRoles: 'account/setRoles',
        setUser: 'account/setUser',
        setTheme: 'setting/setTheme',
        setLayout: 'setting/setLayout',
        setMultipage: 'setting/setMultipage',
        fixSiderbar: 'setting/fixSiderbar',
        fixHeader: 'setting/fixHeader',
        setColor: 'setting/setColor'
      }),
      saveLoginData (data) {
        this.setToken(data.token)
        this.setExpireTime(data.exipreTime)
        this.setUser(data.user)
        this.setPermissions(data.permissions)
        this.setRoles(data.roles)
        this.setTheme('light')
        this.setLayout(data.config.layout)
        this.setMultipage(data.config.multiPage === '1')
        this.fixSiderbar(data.config.fixSiderbar === '1')
        this.fixHeader(data.config.fixHeader === '1')
        this.setColor(data.config.color)
      }
    }
  }
</script>

<style lang="less" scoped>
  .login {
    width: 624px !important;
    height: 390px;
    background-image: url("../../assets/images/login-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;

    .login-form {
      position: absolute;
      right: 50px;
      top: 44px;

      .login-title {
        width: 100%;
        height: 32px;
        background-image: url("../../assets/images/login-title.png");
        background-repeat: no-repeat;
        /*background-size: 100% 100%;*/
        background-position: center center;
        margin-bottom: 28px;
      }

      .input-bg {
        width: 210px;
        height: 40px;
      }


    }

    .icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
  }

  /deep/ .ant-input-lg {
    font-size: 16px;
    color: #3586df;
    background-image: url("../../assets/images/input-bg.png") !important;
    background-repeat: no-repeat;
    border-radius: 105px !important;
    background-position: center center;
  }

  /deep/ .ant-input-lg::placeholder {
    font-size: 16px;
    color: #b4b4b4;
  }

  /deep/ .ant-btn-primary {
    width: 216px;
    height: 45px;
    font-size: 20px !important;
    background-color: #f9fafb;
    border-color: #f9fafb;
    background-image: url("../../assets/images/login-btn.png");
    background-repeat: no-repeat;
    background-position: center center;
    text-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  /deep/ .ant-btn-primary:hover, .ant-btn-primary:focus{
    background-color: #f9fafb;
    border-color: #f9fafb;
    background-image: url("../../assets/images/login-btn.png");
    background-repeat: no-repeat;
    background-position: center center;
    text-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

</style>
