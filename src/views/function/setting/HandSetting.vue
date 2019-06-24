<template>
  <div class="handSetting">
    <div class="handSetting-title">
      <span class="handSetting-title-txt">
        手动控制平台
      </span>
      <div class="handSetting-title-btn">
        <div class="handSetting-title-btn-margin-aim" @click="aim"></div>
      </div>
    </div>

    <a-row type="flex" class="handSetting-row handSetting-row-padding-top">
      <a-col v-for="item of  list1" :key="item.name" class="handSetting-col">
        <div :class="item.status===0?'handSetting-col-txt':'handSetting-col-aim'" @click="singleAim(item)">
          {{item.name}}
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" class="handSetting-row handSetting-row-padding-top">
      <a-col v-for="item of  list2" :key="item.name" class="handSetting-col">
        <div :class="item.status===0?'handSetting-col-txt':'handSetting-col-aim'" @click="singleAim(item)">
          {{item.name}}
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" class="handSetting-row handSetting-row-padding-top">
      <a-col v-for="item of  list3" :key="item.name" class="handSetting-col">
        <div :class="item.status===0?'handSetting-col-txt':'handSetting-col-aim'" @click="singleAim(item)">
          {{item.name}}
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" class="handSetting-row handSetting-row-padding-top">
      <a-col v-for="item of  list4" :key="item.name" class="handSetting-col">
        <div :class="item.status===0?'handSetting-col-txt':'handSetting-col-aim'" @click="singleAim(item)">
          {{item.name}}
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" class="handSetting-row handSetting-row-padding-top">
      <a-col v-for="item of  list7" :key="item.name" class="handSetting-col">
        <div :class="item.status===0?'handSetting-col-txt':'handSetting-col-aim'" @click="singleAim(item)">
          {{item.name}}
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" class="handSetting-row handSetting-row-padding-top">
      <a-col v-for="item of  list5" :key="item.name" class="handSetting-col">
        <div :class="item.status===0?'handSetting-col-txt':'handSetting-col-aim'" @click="singleAim(item)">
          {{item.name}}
        </div>
      </a-col>
      <a-col class="handSetting-col"></a-col>
      <a-col class="handSetting-col"></a-col>
    </a-row>
    <a-row type="flex" class="handSetting-row handSetting-row-padding-top handSetting-row-padding-bottom">
      <a-col v-for="item of  list6" :key="item.name" class="handSetting-col">
        <div :class="item.status===0?'handSetting-col-txt':'handSetting-col-aim'" @click="singleAim(item)">
          {{item.name}}
        </div>
      </a-col>
      <a-col class="handSetting-col"></a-col>
      <a-col class="handSetting-col"></a-col>
    </a-row>
  </div>
</template>

<script>
  import ARow from 'ant-design-vue/es/grid/Row'
  import ACol from 'ant-design-vue/es/grid/Col'

  export default {
    name: 'HandSetting',
    components: {ACol, ARow},
    data () {
      return {
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        list5: [],
        list7: [],
        list6: [
          {name: '称台输送机', status: 1},
          {name: '入转弯输送机', status: 1},
          {name: '出转弯输送机', status: 1},
          {name: '前称桶输送机', status: 1},
          {name: '后称桶输送机', status: 1},
          {name: '入桶阻挡气缸', status: 1},
          {name: '排错阻挡气缸', status: 1},
          {name: '排错气缸', status: 1},
          {name: '计量称气缸', status: 1},
          {name: '除尘机', status: 1}]
      }
    },
    mounted (){
    	this.fetch()
    },
    created () {
      for (let i = 1; i <= 12; i++) {
        this.list1.push({
          name: `${i}号螺旋电机`,
          status: 1
        })
        this.list2.push({
          name: `${i}号振动器`,
          status: 1
        })
        this.list3.push({
          name: `${i}号料仓锁`,
          status: 1
        })
        this.list4.push({
          name: `${i}号除尘阀`,
          status: 1
        })
        this.list7.push({
        	name: `${i}号供料阀`,
          status: 1
        })
        
        if (i <= 10) {
          this.list5.push({
            name: `${i}号破桥器`,
            status: 1
          })
        }
      }
    },
    methods: {
    	fetch(){
    		this.$get('setting/getHandArgs', {
         
        }).then((r) => {
           let data=r.data;
           this.list1=data['list1']
           this.list2=data['list2']
           this.list3=data['list3']
           this.list4=data['list4']
           this.list5=data['list5']
           this.list6=data['list6']
           this.list7=data['list7']
        })
    		
    	},
    	
      aim () {
/*        this.list1.map((item) => {
          item.status = 0
        })
        this.list2.map((item) => {
          item.status = 0
        })
        this.list3.map((item) => {
          item.status = 0
        })
        this.list4.map((item) => {
          item.status = 0
        })
        this.list5.map((item) => {
          item.status = 0
        })
        this.list6.map((item) => {
          item.status = 0
        })*/
      },
      singleAim (item) {
      	const params=item;
      	 this.$get('setting/setHandArgs', {
         		...params
        }).then((r) => {
           let data=r.data;
           console.log(data)
           item.status=parseInt(data['result'])
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .handSetting {
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

        &-margin-aim {
          margin-right: 30px;
          height: 30px;
          width: 84px;
          display: inline-block;
          background-image: url("../../../assets/images/aim-bg.png");
          background-repeat: no-repeat;
          background-position: center;

          &:hover, &:focus, &:active {
            height: 30px;
            width: 84px;
            background-image: url("../../../assets/images/aim-bg.png");
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

      &-padding {
        &-top {
          padding-top: 40px;
        }

        &-bottom {
          padding-bottom: 40px;
        }
      }
    }

    &-col {
      flex: 1;
      font-size: 18px;
      color: #fff;
      text-align: center;

      &-txt {
        height: 52px;
        line-height: 52px;
        width: 126px;
        margin: auto;
        font-size: 18px;
        background-image: url("../../../assets/images/device-bg.png");
        background-position: center;
        background-repeat: no-repeat;
      }

      &-aim {
        height: 52px;
        line-height: 52px;
        width: 126px;
        margin: auto;
        font-size: 18px;
        background-image: url("../../../assets/images/device-aim.png");
        background-position: center;
        background-repeat: no-repeat;
      }

    }
  }
</style>
