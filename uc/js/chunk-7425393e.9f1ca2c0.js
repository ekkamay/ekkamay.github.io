(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7425393e"],{1737:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"payRecord"},[a("div",{staticClass:"top-head"},[a("div",{staticClass:"main-item"},[a("i",{staticClass:"bbx-font mainFontColor bbx-icon-weibiaoti--30"}),a("div",{staticClass:"info"},[a("p",{staticClass:"p"},[t._v(t._s(t.$L("可用的余额")))]),a("p",{staticClass:"font-large"},[t._v(t._s(t.balance))])])]),a("div",{staticClass:"main-item"},[a("i",{staticClass:"bbx-font mainFontColor bbx-icon-weibiaoti--30"}),a("div",{staticClass:"info"},[a("p",{staticClass:"p"},[t._v(t._s(t.$L("历史累计金额")))]),a("p",{staticClass:"font-large"},[t._v(t._s(t.allIncome))])])]),a("div",{staticClass:"right-btn"},[a("router-link",{attrs:{to:{name:"payCharge"}}},[a("el-button",{attrs:{type:"primary"}},[t._v(t._s(t.$L("立即充值")))])],1),a("el-button",{staticClass:"btn mainFontColor",on:{click:t.goHome}},[t._v(t._s(t.$L("马上购物")))])],1)]),a("div",{staticClass:"content-middle"},[a("div",{staticClass:"left"},[t._v("\n\t\t\t\t"+t._s(t.$L("交易记录"))+"\n\t\t\t")]),a("div",{staticClass:"right"},[a("el-select",{staticClass:"search",attrs:{size:t.btnSize},on:{change:t.changeTypeFunc},model:{value:t.messageType,callback:function(e){t.messageType=e},expression:"messageType"}},t._l(t.messageTypelist,(function(t){return a("el-option",{key:t.type,attrs:{label:t.name,value:t.type}})})),1),a("span",[t._v(t._s(t.$L("创建时间"))+"：")]),a("el-date-picker",{staticClass:"time-search",staticStyle:{width:"350px"},attrs:{type:"datetimerange",align:"right",size:t.btnSize,"start-placeholder":t.$L("开始日期"),"end-placeholder":t.$L("结束日期"),"value-format":"yyyy-MM-dd HH:mm:ss","default-time":["00:00:00","23:59:59"]},on:{change:t.SearchTimeFunc},model:{value:t.SearchTimeZone,callback:function(e){t.SearchTimeZone=e},expression:"SearchTimeZone"}})],1)]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"payrecordList"},[a("el-table",{staticClass:"table",staticStyle:{width:"100%"},attrs:{data:t.tableData.list,"empty-text":t.$L("暂无数据"),"header-cell-style":{background:"#f0f1f5",padding:"10px",color:"#666"}}},[a("el-table-column",{attrs:{prop:"name",label:t.$L("名称"),align:"left","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"info"},[1==e.row.orderType?[a("p",{staticClass:"name"},[t._v(t._s(e.row.goodsName))]),a("p",{staticClass:"orderColor"},[t._v(t._s(t.$L("订单号"))+"："+t._s(e.row.orderSn))])]:2==e.row.orderType?[a("p",{staticClass:"name"},[t._v(t._s(t.$L("退款订单")))]),a("p",{staticClass:"orderColor"},[t._v(t._s(t.$L("订单号"))+"："+t._s(t.$L("自动退款没有订单号")))])]:3==e.row.orderType?[a("p",{staticClass:"name"},[t._v(t._s(t.$L("录款")))]),a("p",{staticClass:"orderColor"},[t._v(t._s(t.$L("订单号"))+"："+t._s(t.$L("管理员手动录款没有订单号")))])]:4==e.row.orderType?[a("p",{staticClass:"name"},[t._v(t._s(t.$L("管理员扣款")))]),a("p",{staticClass:"orderColor"},[t._v(t._s(t.$L("订单号"))+"："+t._s(t.$L("管理员手动扣款没有订单号")))])]:5==e.row.orderType?[a("p",{staticClass:"name"},[t._v(t._s(t.$L("在线充值")))]),a("p",{staticClass:"orderColor"},[t._v(t._s(t.$L("订单号"))+"："+t._s(t.$L("在线充值金额不生成订单号")))])]:[a("p",{staticClass:"name"},[t._v(t._s(e.row.goodsName))]),a("p",{staticClass:"orderColor"},[t._v(t._s(t.$L("订单号"))+"："+t._s(e.row.orderSn))])]],2)}}])}),a("el-table-column",{attrs:{prop:"createTime",label:t.$L("创建时间"),align:"center","min-width":"140"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t\t"+t._s(e.row.addTime)+"\n\t\t\t\t\t")])}}])}),a("el-table-column",{attrs:{prop:"price",label:t.$L("金额"),align:"center","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"success"},[a("span",{staticClass:"font-green"},[t._v(t._s(e.row.amount))])])}}])}),a("el-table-column",{attrs:{prop:"details",label:t.$L("明细"),align:"center","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{},[t._v("\n\t\t\t\t\t\t"+t._s(t.detailStatue(e.row.payType).text)+"\n\t\t\t\t\t")])}}])}),a("el-table-column",{attrs:{prop:"state",label:t.$L("状态"),align:"center","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){return a("div",{staticClass:"success"},[a("span",{class:t.statusFunc(e.row.status).color},[t._v(t._s(t.statusFunc(e.row.status).text))])])}}])})],1),null!==t.tableData.list&&t.tableData.allNum>0?a("div",{staticClass:"list-pages"},[a("el-pagination",{attrs:{background:"","current-page":t.currentPage,"page-size":t.pageSize,layout:"prev, pager, next,  total, jumper",total:t.tableData.allNum},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()],1)])},n=[],r={name:"payRecord",data:function(){return{loading:!0,errorType:"error",errorTitle:this.$L("出错了"),errorTips:null,errorShow:!1,btnSize:"small",balance:"",allIncome:"",tableData:{},pageSize:10,currentPage:1,messageType:0,msgArr:[],topMenu:[{groupTitle:"",menuList:[{text:this.$L("信息发布")}]}],messageTypelist:[{type:0,name:this.$L("全部状态")},{type:1,name:this.$L("已确认")},{type:2,name:this.$L("未确认")}],SearchTimeZone:"",type:0,dtCreateStart:"",dtCreateEnd:""}},created:function(){this.getData()},methods:{detailStatue:function(t){var e;switch(t){case 1:e={text:this.$L("管理员录款")};break;case 2:e={text:this.$L("管理员扣款")};break;case 3:e={text:this.$L("支付宝支付")};break;case 4:e={text:this.$L("快钱支付")};break;case 5:e={text:this.$L("财付通支付")};break;case 6:e={text:this.$L("银行支付")};break;case 7:e={text:this.$L("货到付款")};break;case 8:e={text:this.$L("环球支付")};break;case 9:e={text:this.$L("贝宝支付")};break;case 10:e={text:this.$L("邮局汇款")};break;case 11:e={text:this.$L("微信支付")};break;case 12:e={text:this.$L("微信手机支付")};break;case 13:e={text:this.$L("网银在线")};break;case 14:e={text:this.$L("退货退款")};break;case 15:e={text:this.$L("余额支付")};break;default:e={text:this.$L("其他")};break}return e},showError:function(t,e,a){this.errorType="warning"===a?"warning":"error",this.errorTitle=t&&""!==t?t:this.$L("出错了"),this.errorTips=e&&""!==e?e:null,this.loading=!1,this.errorShow=!0},getData:function(){var t=this;t.loading=!0;var e={p:t.currentPage,num:t.pageSize,type:t.type,dtCreateStart:t.dtCreateStart,dtCreateEnd:t.dtCreateEnd};t.$api("getAccountList",e,(function(e){1===e.flag?(t.tableData=e.data,t.balance=e.data.balance,t.allIncome=e.data.allIncome,t.loading=!1):-1===e.flag?t.$confirm(t.$L("请重新登录"),t.$L("登录超时"),{confirmButtonText:t.$L("重新登录"),cancelButtonText:t.$L("取消"),type:"error",distinguishCancelAndClose:!0}).then((function(){t.$router.push({name:"login",query:{redirect:t.$route.fullPath}})})).catch((function(e){t.$gotoWebHome()})):t.$confirm(t.$L("数据加载失败"),t.$L("出错了"),{confirmButtonText:t.$L("点击重试"),cancelButtonText:t.$L("返回首页"),type:"error",distinguishCancelAndClose:!0}).then((function(){t.getData()})).catch((function(e){t.$router.push({name:"home"})}))}),(function(e){t.$confirm(t.$L("网络请求失败"),t.$L("出错了"),{confirmButtonText:t.$L("点击重试"),cancelButtonText:t.$L("返回首页"),type:"error",distinguishCancelAndClose:!0}).then((function(){t.getData()})).catch((function(e){t.$router.push({name:"home"})}))}))},handleCurrentChange:function(t){this.currentPage=t,this.getData()},handleSizeChange:function(t){this.pageSize=t,this.getData()},statusFunc:function(t){var e;switch(t){case 0:e={text:this.$L("未确认"),color:"font-red"};break;default:e={text:this.$L("已确认"),color:"font-green"};break}return e},changeTypeFunc:function(t){this.type=t,this.getData()},SearchTimeFunc:function(t){null!==t?(this.dtCreateStart=t[0],this.dtCreateEnd=t[1]):(this.dtCreateStart="",this.dtCreateEnd=""),this.getData()},goHome:function(){this.$gotoWebHome()}}},i=r,o=(a("42bf"),a("e90a")),l=Object(o["a"])(i,s,n,!1,null,"59e19686",null);e["default"]=l.exports},"42bf":function(t,e,a){"use strict";var s=a("7dc7"),n=a.n(s);n.a},"7dc7":function(t,e,a){}}]);
//# sourceMappingURL=chunk-7425393e.9f1ca2c0.js.map