<template>
  <div id="qrCode" ref="qrCodeDiv"></div>
</template>

<script>
  import QRCode from 'qrcodejs2'
  const houseId=''
  export default {
  	components:{QRCode},
    name: "CreateCode",
    props: {
    	content:{},
    	contentName:''
  	},
    data() {
      return {
      	houseId
      }
    },

   	mounted(){
  		this.bindQRCode()
  	},
    watch:{
    	contentName(val){
    		this.bindQRCode()
    	}
    },
    methods: {
      bindQRCode: function () {
      	 this.$refs.qrCodeDiv.innerHTML=""
        console.log(this.content)
        new QRCode(this.$refs.qrCodeDiv, {
          text: this.content['rawmaterialName']+','+this.content['currentWeight']+','+this.content['warehouseDetailName']+','+this.content['warehouseDetailId'],
          width: 100,
          height:100,
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
        })
      }
    }
  }
</script>