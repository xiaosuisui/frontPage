<template>
  <div class="page">
    <a-row class="content">
      <a-col :span="24">
        <div class="title">系统秘钥剩余0天0小时!</div>
        <div class="secret">当前秘钥: {{currentSecret}}</div>
        <div class="new-secret-content">
          <div class="new-secret">升级秘钥:</div>
          <div class="new-secret-input">
            <a-input placeholder="请输入您的秘钥" v-model="newSecret"/>
          </div>
          <div class="new-secret submit-bg"></div>
        </div>
        <div class="warn">
          <div class="warn-danger"></div>
          您的秘钥还有3天即将到期，为了系统能正常运行，请联系商家服务！
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: 'Upgrade',

    data: function () {
      return {
        advanced: false,
        currentSecret: '3224577880',
        newSecret:'',
        deadDate: '2019-06-24'
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
