<template>
  <a-layout-header
    :class="[fixHeader && 'ant-header-fixedHeader', layout === 'side' ? (sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed') : null, theme, 'global-header']">
    <div :class="['global-header-wide', layout]">
      <router-link v-if="isMobile || layout === 'head'" to="/" :class="['logo', isMobile ? null : 'pc', theme]">
        <!--        <img width="49"  src="../../../static/img/logo.jpg"  alt=""/>-->
        <!--        <h1 v-if="!isMobile">{{systemName}}</h1>-->
      </router-link>
      <a-divider v-if="isMobile" type="vertical"/>
      <a-icon v-if="layout === 'side'" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="toggleCollapse"/>
      <div v-if="layout === 'head'" class="global-header-menu">
        <i-menu style="height: 44px; line-height: 44px;" class="system-top-menu" :theme="theme" mode="horizontal"
                :menuData="menuData" @select="onSelect"/>
      </div>
      <div :class="['global-header-right', theme]">
        <a-row>
          <a-col
            style="font-size: 14px;line-height: 44px;text-align: center;height: 44px;display: flex;flex-direction: row;align-items: center">
            <span style="margin-left: 32px;color: #6e6e6e;">{{getDate}}</span>
            <span style="margin-left: 12px;color: #6e6e6e;">{{getTime}}</span>
            <span style="margin-left: 12px; margin-right:32px;color: #6e6e6e;">{{getDay}}</span>
            <span style="line-height: 44px">
                <img src="../../assets/images/user-icon.png"/>&nbsp;
              </span>
            <span style="font-size: 14px;color:#6e6e6e;line-height: 44px;margin-left:5px">用户昵称</span>&nbsp;
            <span class="run-timer-bg" style="line-height: 44px;margin-left: 5px;">{{user.username}}</span>&nbsp;&nbsp;
            <span style="margin-right: 12px;line-height: 44px">
              <a-popover placement="bottomRight" trigger="click" v-model="visible">
                <template slot="content">
                  <p style="margin: 10px;font-size: 18px;color: #6d6d6d"
                     @click="switchAccount()" class="menu-hover">切换账号</p>
                  <div
                    style=" width:70%;height: 1px;background:rgba(0, 0, 0, 0.1); margin: 0 auto"></div>
                  <p style="margin: 10px;font-size: 18px;color: #6d6d6d"
                     @click="loginOut()" class="menu-hover">退出登录</p>
                </template>
                <img src="../../assets/images/btn-popover.png" @click="popoverShow()"/>&nbsp;
              </a-popover>
            </span>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-modal
      :visible="modalStatus"
      :closable="false"
      :footer="null"
      :bodyStyle="bodyStyle"
      :centered="true"
      :width="360"
      @cancel="() => setModalVisible(false)"
    >
      <a-form @submit.prevent="doLogin" :form="form" class="login-form">
        <div class="login-title"></div>
        <a-form-item
          style="display: flex; justify-content: center;align-items: center">
          <a-input size="large" class="input-bg" placeholder="请输入用户名"
          v-decorator="[
          'name',
          {rules: [{ required: true, message: '请输入用户名', whitespace: true}]}
          ]"
          >
            <a-icon slot="prefix" type="user" style="color:#3586df"></a-icon>
          </a-input>
        </a-form-item>
        <a-form-item
          style="display: flex; justify-content: center;align-items: center">
          <a-input size="large" type="password" class="input-bg" placeholder="请输入密码"
          v-decorator="[
          'password',
          {rules: [{ required: true, message: '请输入密码', whitespace: true}]}
          ]"
          >
            <a-icon slot="prefix" type="lock" style="color:#3586df"></a-icon>
          </a-input>
        </a-form-item>
        <a-row type="flex" justify="space-around">
          <a-col :span="10">
            <a-button :loading="loading" size="large" htmlType="submit" type="primary">
              登录
            </a-button>
          </a-col>
          <a-col :span="10">
            <a-button size="large" type="primary" @click="setModalVisible(false)" class="cancel">
              取消
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <a-modal
      :visible="modalLoginOutStatus"
      :closable="false"
      :footer="null"
      :bodyStyle="bodyStyleLoginOut"
      :centered="true"
      :width="360"
      @cancel="() => setModalLoginOutVisible(false)"
    >
      <a-row style="margin-top: 6px">
        <a-col :span="24" style="font-size: 28px;color: #28988a;text-align: center">温馨提示</a-col>
      </a-row>
      <a-row style="margin-top: 30px">
        <a-col :span="24" style="font-size: 22px;color: #28988a;text-align: center">您是否要退出该账号?</a-col>
      </a-row>
      <a-row type="flex" justify="space-around" class="login-out-btn">
        <a-col :span="10">
          <a-button size="large" type="primary" @click="doLoginOut()">
            确定
          </a-button>
        </a-col>
        <a-col :span="10">
          <a-button size="large" type="primary" @click="setModalLoginOutVisible(false)" class="cancel">
            取消
          </a-button>
        </a-col>
      </a-row>
    </a-modal>
  </a-layout-header>
</template>

<script>
  import HeaderAvatar from './HeaderAvatar'
  import IMenu from '@/components/menu/menu'
  import {mapState, mapMutations} from 'vuex'
  import ARow from 'ant-design-vue/es/grid/Row'
  import ACol from 'ant-design-vue/es/grid/Col'

  export default {
    name: 'GlobalHeader',
    components: {ACol, ARow, IMenu, HeaderAvatar},
    props: ['collapsed', 'menuData'],
    data () {
      return {
        date: new Date(),
        timer: null,
        modalStatus: false,
        bodyStyle: {
          width: '360px',
          height: '280px',
        },
        bodyStyleLoginOut: {
          width: '360px',
          height: '210px'
        },
        visible: false,
        loading: false,
        modalLoginOutStatus: false,
        activeKey: '1',
        error: '',
        form: this.$form.createForm(this)
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        this.date = new Date()
      }, 1000)
    },
    computed: {
      getDate () {
        return `${this.date.getFullYear()}-${this.txt(this.date.getMonth() + 1)}-${this.txt(this.date.getDate())}`
      },
      getTime () {
        return `${this.txt(this.date.getHours())}:${this.txt(this.date.getMinutes())}:${this.txt(this.date.getSeconds())}`
      },
      getDay () {
        return `星期${this.day(this.date.getDay())}`
      },
      ...mapState({
        isMobile: state => state.setting.isMobile,
        layout: state => state.setting.layout,
        systemName: state => state.setting.systemName,
        sidebarOpened: state => state.setting.sidebar.opened,
        fixHeader: state => state.setting.fixHeader,
        user: state => state.account.user
      }),
      theme () {
        return this.layout === 'side' ? 'light' : this.$store.state.setting.theme
      }
    },
    methods: {
      toggleCollapse () {
        this.$emit('toggleCollapse')
      },
      onSelect (obj) {
        this.$emit('menuSelect', obj)
      },
      txt (num) {
        if (num < 10) {
          return `0${num}`
        } else {
          return `${num}`
        }
      },
      day (num) {
        if (num === 0) {
          return '日'
        } else if (num === 1) {
          return '一'
        } else if (num === 2) {
          return '二'
        } else if (num === 3) {
          return '三'
        } else if (num === 4) {
          return '四'
        } else if (num === 5) {
          return '五'
        } else if (num === 6) {
          return '六'
        }
      },
      popoverShow () {
        this.visible = !this.visible
      },
      // 登出
      loginOut () {
        this.visible = false
        this.setModalLoginOutVisible(true)
      },
      doLoginOut () {
        this.$router.push('/login')
      },
      // 切换账号
      switchAccount () {
        this.visible = false
        this.setModalVisible(true)
      },
      setModalVisible (modalStatus) {
        this.modalStatus = modalStatus
      },
      setModalLoginOutVisible (modalStatus) {
        this.modalLoginOutStatus = modalStatus
      },
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
                this.saveLoginData(data)
                this.setModalVisible(false)
                setTimeout(() => {
                  this.loading = false
                }, 500)
                this.$router.push('/')
              }).catch(() => {
                setTimeout(() => {
                  this.loading = false
                }, 500)
              })
            }
          })
        }
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
        setFixSiderbar: 'setting/fixSiderbar',
        setFixHeader: 'setting/fixHeader',
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
        this.setFixSiderbar(data.config.fixSiderbar === '1')
        this.setFixHeader(data.config.fixHeader === '1')
        this.setColor(data.config.color)
      }
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  }
</script>

<style lang="less" scoped>
  .trigger {
    font-size: 20px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }

  .header-item {
    padding: 0 19px;
    display: inline-block;
    height: 100%;
    cursor: pointer;
    vertical-align: middle;

    i {
      font-size: 16px;
      color: rgba(0, 0, 0, .65);
    }
  }

  .global-header {
    padding: 0 0;
    -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    position: relative;
    background-image: url("../../assets/images/header-bg.png") !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
    height: 44px !important;

    &.light {
      background: #fff;
    }

    &.light {
      background: #393e46;
    }

    .global-header-wide {
      &.head {
        /*padding: 0 24px;*/
      }

      &.side {
      }

      .logo {
        height: 44px;
        line-height: 44px;
        vertical-align: top;
        display: inline-block;
        padding: 0 12px 0 24px;
        cursor: pointer;
        font-size: 20px;

        &.pc {
          padding: 0 50px 0 0;
        }

        img {
          display: inline-block;
          vertical-align: middle;
        }

        h1 {
          display: inline-block;
          font-size: 16px;
        }

        &.light h1 {
          color: #fff;
        }
      }

      .global-header-menu {
        display: inline-block;
      }

      .global-header-right {
        float: right;

        &.light {
          color: #fff;

          i {
            color: #fff;
          }
        }
      }
    }
  }

  .ant-header-fixedHeader {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 15;
    width: 100%;
    transition: width .2s;

    &.ant-header-side-opened {
      width: 100%;
      padding-left: 254px;
    }

    &.ant-header-side-closed {
      width: 100%;
      padding-left: 80px;
    }
  }

  .run-timer-bg {
    font-size: 16px;
    width: 100px;
    height: 28px;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("../../assets/images/user-nick.png");
    background-repeat: no-repeat;
  }

  /deep/ .ant-popover-arrow {
    background-color: #fafafa;
  }

  /deep/ .ant-popover-inner {
    background-color: #fafafa;
  }

  /deep/ .ant-modal-content {
    border-radius: 12px !important;
  }

  .login-form {
    /*position: absolute;*/
    /*right: 50px;*/
    /*top: 44px;*/

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

    /deep/ .ant-input-lg {
      font-size: 16px;
      color: #3586df;
      margin: 0 auto;
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
      width: 130px;
      height: 38px;
      font-size: 20px !important;
      background-color: #f9fafb;
      border: none;
      /*border-color: #f9fafb;*/
      background-image: url("../../assets/images/login-btn-bg.png");
      background-repeat: no-repeat;
      background-position: center center;
      padding: 0 0;
      text-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    /deep/ .ant-btn-primary:hover, .ant-btn-primary:focus {
      background-color: #f9fafb;
      border-color: #f9fafb;
      background-image: url("../../assets/images/login-btn-bg.png");
      background-repeat: no-repeat;
      background-position: center center;
      text-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    .cancel {
      width: 130px;
      height: 38px;
      font-size: 20px !important;
      background-color: #f9fafb;
      border: none;
      /*border-color: #f9fafb;*/
      background-image: url("../../assets/images/cancel-btn-bg.png");
      background-repeat: no-repeat;
      background-position: center center;
      padding: 0 0;
      text-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    .cancel :hover, .cancel:focus {
      background-color: #f9fafb;
      border-color: #f9fafb;
      background-image: url("../../assets/images/cancel-btn-bg.png");
      background-repeat: no-repeat;
      background-position: center center;
      text-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

  }

  .login-out-btn {
    margin-top: 20px;
    margin-bottom: 2px;

    /deep/ .ant-btn-primary {
      width: 130px;
      height: 38px;
      font-size: 20px !important;
      background-color: #f9fafb;
      text-align: center;
      border: none;
      /*border-color: #f9fafb;*/
      background-image: url("../../assets/images/login-btn-bg.png");
      background-repeat: no-repeat;
      background-position: center center;
      padding: 0 0;
      text-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    /deep/ .ant-btn-primary:hover, .ant-btn-primary:focus {
      background-color: #f9fafb;
      border-color: #f9fafb;
      background-image: url("../../assets/images/login-btn-bg.png");
      background-repeat: no-repeat;
      background-position: center center;
      text-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    .cancel {
      width: 130px;
      height: 38px;
      font-size: 20px !important;
      background-color: #f9fafb;
      text-align: center;
      border: none;
      /*border-color: #f9fafb;*/
      background-image: url("../../assets/images/cancel-btn-bg.png");
      background-repeat: no-repeat;
      background-position: center center;
      padding: 0 0;
      text-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    .cancel :hover, .cancel:focus {
      background-color: #f9fafb;
      border-color: #f9fafb;
      background-image: url("../../assets/images/cancel-btn-bg.png");
      background-repeat: no-repeat;
      background-position: center center;
      text-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    .menu-hover:hover{
      color: #70bad5;
    }
  }
</style>
