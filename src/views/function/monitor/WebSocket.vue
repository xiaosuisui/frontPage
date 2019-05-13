<template>
</template>

<script>
import SockJS from  'sockjs-client';
import  Stomp from 'stompjs';
export default {
	name:'WebSocket',
    data(){
        return {
            stompClient:'',
            timer:'',
        }
    },
    methods:{
        initWebSocket() {
            this.connection();
            let that= this;
            // 断开重连机制,尝试发送消息,捕获异常发生时重连
      
        },  
        connection() {
            // 建立连接对象
            let socket = new SockJS('http://192.168.0.117:9527/webSocketServer');
            // 获取STOMP子协议的客户端对象
            this.stompClient = Stomp.over(socket);
            // 定义客户端的认证信息,按需求配置
            let headers = {
     			"Content-Type": "application/json;charset=utf-8",
     			"withCredentials":false
 			 }
            // 向服务器发起websocket连接
            this.stompClient.connect(headers,() => {
                this.stompClient.subscribe('/topic/monitor/info', (msg) => { // 订阅服务端提供的某个topic
                });  //用户加入接口
                this.stompClient.subscribe('/topic/monitor/warehouseStatus', (msg) => { // 订阅服务端提供的某个topic
                }); 
            }, (err) => {
            	console.log('失败')
            	window.setTimeout(this.connection,3000);    
            });
        },    //连接 后台
        disconnect() {
            if (this.stompClient) {
                this.stompClient.disconnect();
            }
        },  // 断开连接
    },
    mounted(){
        this.initWebSocket();
    },
    beforeDestroy: function () {
    	console.log("websocket destroy")
        // 页面离开时断开连接,清除定时器
        this.disconnect();
        clearInterval(this.timer);
    }
}
</script>

<style>
</style>