(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bc381746"],{"1d2d":function(t,s,e){"use strict";var i=e("609e"),a=e.n(i);a.a},"3a50":function(t,s,e){},"4a69":function(t,s,e){"use strict";var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"logistics-info"},[e("el-timeline",{staticClass:"steps",attrs:{direction:"vertical",active:1,space:80}},t._l(t.activities,(function(s,i){return e("el-timeline-item",{key:i,attrs:{icon:s.icon,type:s.type,color:s.color,size:s.size,timestamp:s.timestamp}},[t._v("\n                "+t._s(s.content)+"\n            ")])})),1)],1)},a=[],r={name:"LogisticsInfo",data:function(){return{activities:[{content:"包裹正在等待揽收",timestamp:"2018-04-12 20:46",size:"large",type:"primary"},{content:"【北京市】中通快递 天通宛收件员 已揽件",timestamp:"2018-04-03 20:46",size:"large"},{content:"【北京市】中通快递 天通宛收件员 已揽件",timestamp:"2018-04-03 20:46",size:"large"},{content:"【北京市】中通快递 天通宛收件员 已揽件",timestamp:"2018-04-03 20:46",size:"large"},{content:"【北京市】中通快递 天通宛收件员 已揽件",timestamp:"2018-04-03 20:46",size:"large"},{content:"【北京市】中通快递 天通宛收件员 已揽件",timestamp:"2018-04-03 20:46",size:"large"},{content:"订单已有本人签收",timestamp:"2018-04-03 20:46",size:"large"}]}}},n=r,o=(e("9060"),e("e90a")),l=Object(o["a"])(n,i,a,!1,null,"6f7348eb",null);s["a"]=l.exports},5381:function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"prize-info"},[e("div",{staticClass:"order-content"},[e("div",{staticClass:"content-top"},[e("p",[t._v(t._s(t.$L("订单号"))+"："+t._s(t.prizeInfo.sn))]),e("div",{staticClass:"step-bar"},[e("div",{staticClass:"steps"},[e("p",{staticClass:"status mainBgColor"},[t._v(t._s(t.$L("申请领奖"))),e("i",{staticClass:"icon el-icon-arrow-right"})]),e("p",{staticClass:"time"},[t._v(t._s(t.prizeInfo.createTime))])]),e("div",{staticClass:"steps"},[e("p",{staticClass:"status",class:{mainBgColor:t.prizeInfo.deliveryStatus>=1}},[t._v(t._s(t.$L("卖家发货"))),t.prizeInfo.deliveryStatus>=1?e("i",{staticClass:"icon el-icon-arrow-right"}):t._e()]),t.prizeInfo.deliveryStatus>=1&&t.prizeInfo.confirmTime?e("p",{staticClass:"time"},[t._v(t._s(t.prizeInfo.confirmTime))]):e("p",{staticClass:"time"},[t._v(t._s(t.prizeInfo.deliveryIngTime))])]),e("div",{staticClass:"steps"},[e("p",{staticClass:"status",class:{mainBgColor:t.prizeInfo.deliveryStatus>=3}},[t._v(t._s(t.$L("确认收货"))),t.prizeInfo.deliveryStatus>=3?e("i",{staticClass:"icon el-icon-arrow-right"}):t._e()]),e("p",{staticClass:"time"},[t._v(t._s(t.prizeInfo.confirmDeliveryTime))])])])]),"Virtual"!==t.ptype?e("div",{staticClass:"order-details"},[e("div",{staticClass:"order-left"},[e("p",{staticClass:"title"},[t._v(t._s(t.$L("订单信息")))]),e("order-detail",{attrs:{orderInfo:t.prizeInfo}})],1),e("div",{staticClass:"order-right"},[e("div",{staticClass:"right-content"},[e("p",{staticClass:"title"},[t._v(t._s(t.$L("物流信息")))]),0==t.deliveryList.length?e("div",{staticClass:"deliver"},[t._v("\n                        "+t._s(t.$L("暂时未有物流信息"))+"\n                    ")]):t._e(),t.deliveryList.length>0?e("div",[e("div",{staticClass:"order-number"},[t._v("\n                            "+t._s(t.orderInfo.deliveryName)+"："+t._s(t.orderInfo.deliveryNum)+"\n                        ")]),e("logistics-info",{attrs:{deliveryList:t.deliveryList}})],1):t._e()])])]):t._e(),e("div",{staticClass:"prod-info"},[e("prod-list",{attrs:{orderInfo:t.prizeInfo}})],1),e("div",{staticClass:"bottom-btns"},[e("el-button",{attrs:{type:"primary"},on:{click:t.backFunc}},[t._v(t._s(t.$L("返回")))])],1)])])},a=[],r=e("71f2"),n=e("4a69"),o=e("af58"),l={name:"prizeInfo",components:{ProdList:o["a"],LogisticsInfo:n["a"],OrderDetail:r["a"]},data:function(){return{loading:!1,errorType:"error",errorTitle:this.$L("出错了"),errorTips:null,errorShow:!1,prizeInfo:{},deliveryList:[],ptype:""}},created:function(){this.getData(),""!==this.$route.params.ptype&&(this.ptype=this.$route.params.ptype)},methods:{backFunc:function(){this.$router.push({name:"prizeList",params:{type:"prod"}})},getData:function(){if(""!==this.$route.params.id){var t=this;t.loading=!0;var s=t.$route.params.id;t.$api("getPrizeDetail",{id:s},(function(s){1===s.flag?(t.prizeInfo=s.data,t.deliveryList=s.data.deliveryList,t.loading=!1):-1===s.flag?t.$confirm(t.$L("请重新登录"),t.$L("登录超时"),{confirmButtonText:t.$L("重新登录"),cancelButtonText:t.$L("取消"),type:"error",distinguishCancelAndClose:!0}).then((function(){t.$router.push({name:"login",query:{redirect:t.$route.fullPath}})})).catch((function(s){t.$gotoWebHome()})):t.$confirm(t.$L("数据加载失败"),t.$L("出错了"),{confirmButtonText:t.$L("点击重试"),cancelButtonText:t.$L("返回首页"),type:"error",distinguishCancelAndClose:!0}).then((function(){t.getData()})).catch((function(s){t.$router.push({name:"prizeList",params:{type:"prod"}})}))}),(function(s){t.$confirm(t.$L("网络请求失败"),t.$L("出错了"),{confirmButtonText:t.$L("点击重试"),cancelButtonText:t.$L("返回首页"),type:"error",distinguishCancelAndClose:!0}).then((function(){t.getData()})).catch((function(s){t.$router.push({name:"prizeList",params:{type:"prod"}})}))}))}}}},c=l,d=(e("d148"),e("e90a")),f=Object(d["a"])(c,i,a,!1,null,"3d344d24",null);s["default"]=f.exports},"609e":function(t,s,e){},"71f2":function(t,s,e){"use strict";var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"order-detail"},[e("table",{attrs:{width:"100%",cellpadding:"0",cellspacing:"0",border:"0"}},[e("tbody",[e("tr",{staticClass:"tr"},[e("td",{staticClass:"left-td"},[e("span",{staticClass:"left-span"},[t._v(t._s(t.$L("收货人姓名"))+":")])]),e("td",[e("font",[t._v(t._s(t.orderInfo.contActor))])],1)]),e("tr",{staticClass:"tr"},[e("td",{staticClass:"left-td"},[e("span",{staticClass:"left-span"},[t._v(t._s(t.$L("手机号码"))+":")])]),e("td",[e("font",[t._v(t._s(t.orderInfo.mobile))])],1)]),e("tr",{staticClass:"tr"},[e("td",{staticClass:"left-td"},[e("span",{staticClass:"left-span"},[t._v(t._s(t.$L("收货地址"))+":")])]),e("td",[e("font",[t._v(t._s(t.orderInfo.address))])],1)]),e("tr",{staticClass:"tr"},[e("td",{staticClass:"left-td"},[e("span",{staticClass:"left-span"},[t._v(t._s(t.$L("支付方式"))+":")])]),e("td",[e("font",[t._v(t._s(t.orderInfo.email))])],1)]),e("tr",{staticClass:"tr"},[e("td",{staticClass:"left-td"},[e("span",{staticClass:"left-span"},[t._v(t._s(t.$L("送货时间"))+":")])]),e("td",[e("font",[t._v(t._s(t.orderInfo.deliveryIngTime))])],1)]),e("tr",{staticClass:"tr"},[e("td",{staticClass:"left-td"},[e("span",{staticClass:"left-span"},[t._v(t._s(t.$L("留言信息"))+":")])]),e("td",[t.orderInfo.memo?e("font",[t._v(t._s(t.orderInfo.memo))]):t._e()],1)])])])])},a=[],r={name:"orderDetail",props:{orderInfo:{type:Object,default:function(){return{}}}}},n=r,o=(e("9e10"),e("e90a")),l=Object(o["a"])(n,i,a,!1,null,"7026f09a",null);s["a"]=l.exports},"7d86":function(t,s,e){},9060:function(t,s,e){"use strict";var i=e("7d86"),a=e.n(i);a.a},"9e10":function(t,s,e){"use strict";var i=e("3a50"),a=e.n(i);a.a},a464:function(t,s,e){},af58:function(t,s,e){"use strict";var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"prod-list"},[e("div",{staticClass:"head"},[e("ul",{staticClass:"box-head"},[e("li",{staticClass:"item"},[t._v(t._s(t.$L("奖品信息")))]),e("li",{staticClass:"item"},[t._v(t._s(t.$L("类型")))]),e("li",{staticClass:"item"},[t._v(t._s(t.$L("来源")))]),e("li",{staticClass:"item"},[t._v(t._s(t.$L("数量")))]),e("li",{staticClass:"item"},[t._v(t._s(t.$L("状态")))])])]),e("div",{staticClass:"info"},[e("ul",{staticClass:"info-item"},[e("li",{staticClass:"item"},[e("div",{staticClass:"info-box"},[e("div",{staticClass:"list-main-left"},[e("img",{attrs:{src:t.orderInfo.pic}})]),e("div",{staticClass:"list-main-right"},[e("p",{staticClass:"p"},[t._v(t._s(t.orderInfo.name))])])])]),e("li",{staticClass:"item"},[e("div",{staticClass:"other"},[t._v("\n                    "+t._s(t.orderInfo.typeName)+"\n                ")])]),e("li",{staticClass:"item"},[e("div",{staticClass:"other"},[t._v("\n                    "+t._s(t.orderInfo.fromName)+"\n                ")])]),e("li",{staticClass:"item"},[e("div",{staticClass:"other"},[t._v("\n                    "+t._s(t.$L("1"))+"\n                ")])]),e("li",{staticClass:"item"},[e("div",{staticClass:"other"},[-1==t.orderInfo.status?e("p",{staticClass:"font-grey"},[t._v(t._s(t.$L("订单已关闭")))]):3==t.orderInfo.deliveryStatus?e("p",{staticClass:"font-green"},[t._v(t._s(t.$L("已确认收货")))]):2==t.orderInfo.deliveryStatus?e("p",{staticClass:"font-green"},[t._v(t._s(t.$L("已发货")))]):1==t.orderInfo.deliveryStatus?e("p",{staticClass:"font-green"},[t._v(t._s(t.$L("配货中")))]):0==t.orderInfo.status&&0==t.orderInfo.deliveryStatus?e("p",{staticClass:"font-red"},[t._v(t._s(t.$L("未申请领取")))]):1==t.orderInfo.status&&0==t.orderInfo.deliveryStatus?e("p",{staticClass:"font-green"},[t._v(t._s(t.$L("等待配货")))]):0==t.orderInfo.status?e("p",{staticClass:"font-red"},[t._v(t._s(t.$L("未领取")))]):1==t.orderInfo.status?e("p",{staticClass:"font-green"},[t._v(t._s(t.$L("已确认订单")))]):t._e()])])])])])},a=[],r={name:"prodList",props:{orderInfo:{type:Object,default:function(){return{}}}},methods:{}},n=r,o=(e("1d2d"),e("e90a")),l=Object(o["a"])(n,i,a,!1,null,"4bbfa554",null);s["a"]=l.exports},d148:function(t,s,e){"use strict";var i=e("a464"),a=e.n(i);a.a}}]);
//# sourceMappingURL=chunk-bc381746.0341455e.js.map