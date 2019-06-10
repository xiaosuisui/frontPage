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
            <span :style="{color:plc===1?'#00d48d':'#dd2121'}">PLC通讯</span>
            <img :src="[plc === 1?'./static/img/plc-on.gif':'./static/img/plc-off.png']" alt=""
                 style="margin-left: 10px">
            <span style="margin-left: 32px;color: #6e6e6e;">{{getDate}}</span>
            <span style="margin-left: 12px;color: #6e6e6e;">{{getTime}}</span>
            <span style="margin-left: 12px; margin-right:32px;color: #6e6e6e;">{{getDay}}</span>
          </a-col>
        </a-row>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
  import HeaderAvatar from './HeaderAvatar'
  import IMenu from '@/components/menu/menu'
  import {mapState} from 'vuex'
  import ARow from 'ant-design-vue/es/grid/Row'
  import ACol from 'ant-design-vue/es/grid/Col'
	const plc=1
  export default {
    name: 'GlobalHeader',
    components: {ACol, ARow, IMenu, HeaderAvatar},
    props: ['collapsed', 'menuData'],
    data () {
    	console.log(this.$store.state.plc)
      return {
        plc: 1,
        date: new Date(),
        timer: null,
        plcRequest:null
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        this.date = new Date()
      }, 1000),
      //获取PLC状态
      this.plcRequest=setInterval(()=>{
         this.$get('formular/plc').then((r) => {
            this.plc=r.data
            console.log("plc"+this.plc)
        })
      },20000)
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
        fixHeader: state => state.setting.fixHeader
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
      }
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      if(this.plcRequest){
      	 clearInterval(this.plcRequest)
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
</style>
