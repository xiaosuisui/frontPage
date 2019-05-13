webpackJsonp([34],{"4OMe":function(t,e){},tF3O:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("mtWM"),r=s.n(a),c=s("PJh5"),u=s.n(c);u.a.locale("zh-cn");var o={data:function(){return{time:"",loading:!0,system:{cpu:{count:0,usage:0},process:{cpuUsage:0,uptime:0,startTime:0}}}},mounted:function(){this.create()},methods:{create:function(){var t=this;this.time=u()().format("YYYY年MM月DD日 HH时mm分ss秒"),r.a.all([this.$get("actuator/metrics/system.cpu.count"),this.$get("actuator/metrics/system.cpu.usage"),this.$get("actuator/metrics/process.uptime"),this.$get("actuator/metrics/process.start.time"),this.$get("actuator/metrics/process.cpu.usage")]).then(function(e){t.system.cpu.count=e[0].data.measurements[0].value,t.system.cpu.usage=t.convert(e[1].data.measurements[0].value),t.system.process.uptime=e[2].data.measurements[0].value,t.system.process.startTime=u()(1e3*e[3].data.measurements[0].value).format("YYYY-MM-DD HH:mm:ss"),t.system.process.cpuUsage=t.convert(e[4].data.measurements[0].value),t.loading=!1}).catch(function(e){t.$message.error("获取服务器信息失败")})},convert:function(t){return Number(100*t).toFixed(2)}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a-skeleton",{attrs:{active:"",loading:t.loading,paragraph:{rows:17}}},[s("div",{staticClass:"jvm-info"},[s("div",{staticClass:"alert"},[s("a-alert",{attrs:{type:"success","show-icon":!0}},[s("div",{attrs:{slot:"message"},slot:"message"},[t._v("\n          数据获取时间 "+t._s(this.time)+"\n          "),s("a",{staticStyle:{"margin-left":"24px"},on:{click:t.create}},[t._v("点击刷新")])])])],1),t._v(" "),s("table",[s("tr",[s("th",[t._v("参数")]),t._v(" "),s("th",[t._v("描述")]),t._v(" "),s("th",[t._v("当前值")])]),t._v(" "),s("tr",[s("td",[s("a-tag",{attrs:{color:"green"}},[t._v("system.cpu.count")])],1),t._v(" "),s("td",[t._v("CPU 数量")]),t._v(" "),s("td",[t._v(t._s(t.system.cpu.count)+" 核")])]),t._v(" "),s("tr",[s("td",[s("a-tag",{attrs:{color:"green"}},[t._v("system.cpu.usage")])],1),t._v(" "),s("td",[t._v("系统 CPU 使用率")]),t._v(" "),s("td",[t._v(t._s(t.system.cpu.usage)+" %")])]),t._v(" "),s("tr",[s("td",[s("a-tag",{attrs:{color:"purple"}},[t._v("process.start.time")])],1),t._v(" "),s("td",[t._v("应用启动时间点")]),t._v(" "),s("td",[t._v(t._s(t.system.process.startTime))])]),t._v(" "),s("tr",[s("td",[s("a-tag",{attrs:{color:"purple"}},[t._v("process.uptime")])],1),t._v(" "),s("td",[t._v("应用已运行时间")]),t._v(" "),s("td",[t._v(t._s(t.system.process.uptime)+" 秒")])]),t._v(" "),s("tr",[s("td",[s("a-tag",{attrs:{color:"purple"}},[t._v("process.cpu.usage")])],1),t._v(" "),s("td",[t._v("当前应用 CPU 使用率")]),t._v(" "),s("td",[t._v(t._s(t.system.process.cpuUsage)+" %")])])])])])},staticRenderFns:[]},m=s("VU/8")(o,n,!1,function(t){s("4OMe")},null,null);e.default=m.exports}});