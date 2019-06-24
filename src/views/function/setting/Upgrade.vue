<template>
  <div class="page">
  	<div v-if="show==='A'" style="position: absolute;right: 20px;top: 20px; cursor:hand"><a-icon style="font-size:50px;font-weight: 400;color:green" type="close" @click="goHome"/></div>
  	<div v-if="show==='B'" style="position: absolute;right: 20px;top: 20px; cursor:hand"><a-icon style="font-size:50px;font-weight: 400;color:green" type="close" @click="goLogin"/></div>

    <a-row class="content">
      <a-col :span="24">
        <div class="title">系统秘钥剩余{{hours}}小时!</div>
        <div class="secret">当前秘钥: {{currentSecret}}</div>
        <div class="new-secret-content">
          <div class="new-secret">升级秘钥:</div>
          <div class="new-secret-input">
            <a-input placeholder="请输入您的秘钥" v-model="newSecret"/>
          </div>
          <div @click="saveSecret" class="new-secret submit-bg"></div>
        </div>
        <div class="warn" v-if="show==='A'">
          <div  class="warn-danger"></div>
          		您的秘钥即将到期，为了系统能正常运行，请联系管理员或者设备商家！
        </div>
        <div class="warn" v-if="show==='B'">
          <div  class="warn-danger"></div>
          		您的秘钥已经到期，为了系统能正常运行，请联系管理员或者设备商家！
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: 'Upgrade',
    mounted () {
    	this.fetch()
  	},
    data: function () {
      return {
        advanced: false,
        currentSecret: 'erntr24kt5676445993!044',
        newSecret:'',
        hours: '0',
        show:'B'
      }
    },
    methods:{
    	goHome(){
    		this.$router.push('/')
    	},
    	goLogin(){
    		this.$router.push('/login')
    	},
  		fetch(){
  		this.$get('license', {

     }).then((r) => {
        let data = r.data
        this.hours=data['leftTime']
   			this.currentSecret=data['secret']
   			if(parseInt(this.hours)<16){this.show='A'}
   			if(parseInt(this.hours)==0){this.show='B'}
      })
  		},
  		
  		/*
  		 * 保存秘钥
  		 */
  		saveSecret(){
  			console.log(this.newSecret)
  			const params={'secret': encodeURI(this.newSecret, "utf-8")}
  			this.$get('license/saveLicense', {
					...params
     		}).then((r) => {
     			let data=r.data;
     			if(data['result']==='OK'){
     				this.$message.success('秘钥升级成功！重新登录')
     			}else{
     				this.$message.success('秘钥不合法！重新输入')
     			}
        	
      })
  		}
  	}
  }
</script>

<style scoped>
  * {
    font-family: "微软雅黑";
  }

  .page {
    height: 100%;
    width: 100%;
    background-image: url("../../../assets/images/system-update-bg.png");
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    margin-top: 84px;
  }

  .title {
    font-size: 36px;
    color: #0f715e;
    text-align: center;

  }

  .secret {
    font-size: 24px;
    color: #0f715e;
    text-align: center;
    overflow: hidden;
    max-width: 600px;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-top: 15px;
  }

  .new-secret-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 101px;
  }

  .new-secret {
    display: inline-block;
    font-size: 24px;
    color: #0f715e;
  }

  .new-secret-input {
    display: inline-block;
    font-size: 24px;
    color: #0f715e;
    margin: 10px;
  }

  .submit-bg {
    width: 124px;
    height: 37px;
    background-image: url("../../../assets/images/submit-bg.png");
    background-repeat: no-repeat;
    background-position: center;
  }

  /deep/ .ant-input {
    font-size: 18px;
    color: #fff;
    background: rgb(15, 113, 94);
    border: 1px solid #000;
    border-radius: 4px;
    width: 345px;
    height: 35px;
  }

  /deep/ .ant-input::placeholder{
    font-size: 18px;
    color: #8febee;
  }

  .warn{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #f10909;
    font-size: 16px;
  }
  .info{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: green;
    font-size: 16px;
  }
  .warn-danger {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 15px;
    background-image: url("../../../assets/images/warn-danger.png");
    background-repeat: no-repeat;
    background-position: center;
  }

</style>
