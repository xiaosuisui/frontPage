<template>
    <div class="page" style="width:100%">
 		<a-row style="padding: 50px;">
 			<a-col :span="22" :offset=1>
        		<a-card :bordered=false>
          		 <h1>系统升级相关的配置说明</h1>
          		 <p style="text-align: center;">为保证设备的正常使用,请联系系统管理员或者设备厂商提供该系统的秘钥号,秘钥号可以延长系统有效运行时间</p>
          		 <a-row style="margin-top: 40px;">
	          		<a-col :span=5 :offset=4 style="text-align: right;">
				        <p>当前秘钥:</p>
          		 	</a-col>
          		 	<a-col :span=14>
				         <input readOnly v-model="currentSecret">		 	
          		 	</a-col>
          		 </a-row>
          		  <a-row style="margin-top: 20px;">
	          		<a-col :span=4 :offset=5>
				        <p>有效日期</p>
          		 	</a-col>
          		 	<a-col :span=8> 	
          		 	</a-col>
          		 </a-row>
        		</a-card>
      		</a-col>
 		</a-row>
    </div>
</template>

<script>
    export default {
    	name:'Upgrade',
    	
        data: function(){
            return {
               advanced: false,
               currentSecret:'jguerefdi123456ffeefb',
               deadDate:'2019-06-24'
            }
        }
    }
</script>

<style scoped>
input{
	line-height: 30PX;
	font-family: "微软雅黑";
	font-size: 25px;
}
h1{
    text-align: center;
    margin: 30px 0;
    font-weight: bolder;
    font-family: "微软雅黑";
    font-size: 50px;
}
.page{
	height:100%;
	background: #eef1f6;
}
.container{
	padding: 50px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}
p{
	font-size: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}

</style>