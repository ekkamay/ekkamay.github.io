(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5dfdf693"],{a784:function(t,e,a){"use strict";var s=a("a9a9"),n=a.n(s);n.a},a9a9:function(t,e,a){},ac1c:function(t,e,a){"use strict";a.r(e);var s,n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order",class:{showSearch:t.showSearch}},[a("div",{staticClass:"search-box"},[a("el-input",{staticClass:"input-with-select",attrs:{placeholder:t.$L("输入订单编号"),size:"small",clearable:""},on:{change:t.searchFunc},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:e.target.blur(e)}},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},slot:"append"})],1),a("div",{staticClass:"search-close",on:{click:function(e){return t.doSearch(!1)}}},[a("i",{staticClass:"el-icon-close"})])],1),a("vue-scroll",[t.tableData&&t.tableData.hasOwnProperty("list")?a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"main-table"},[t._l(t.tableData.list,(function(e,s){return a("div",{key:s,staticClass:"table-box"},[a("div",{staticClass:"box"},[a("div",{staticClass:"top"},[a("span",[t._v(t._s(t.$L("订单编号"))+":"+t._s(e.orderSn))]),a("span",{class:t.statusFunc(e.pendingStatus).color,staticStyle:{float:"right"}},[t._v(t._s(t.statusFunc(e.pendingStatus).text))])]),t._l(e.productList,(function(e,s){return a("div",{staticClass:"item"},[a("div",{staticClass:"l-box"},[a("img",{staticClass:"img",attrs:{src:e.img}}),a("div",{staticClass:"msg"},[a("p",{staticClass:"tit mainFontColor"},[t._v(t._s(e.prodName))])])]),a("div",{staticClass:"r-box"},[a("p",[t._v(t._s(e.goodsPrice))]),a("p",[t._v("x"+t._s(e.goodsNum))])])])})),a("div",{staticClass:"total"},[a("span",[t._v(t._s(t.$L("共"))+t._s(e.countNum)+t._s(t.$L("件商品"))+" "+t._s(t.$L("合计"))+":"+t._s(e.orderAmount))])])],2),a("div",{staticClass:"bottom"},[a("span",{staticClass:"relation"},[t._v(t._s(t.$L("关系"))+"："+t._s(e.relation))]),a("span",[t._v(t._s(t.$L("下单用户"))+"："+t._s(e.username))]),a("br"),a("span",{staticClass:"commission"},[t._v(t._s(t.$L("所得佣金"))+" "),a("b",{staticClass:"font-red"},[t._v(t._s(e.commissionPrice))])])])])})),t.tableData.allNum>0?a("div",{staticClass:"list-pages"},[a("el-pagination",{attrs:{background:"",small:"","current-page":t.currentPage,"page-sizes":[5,10,20,30],"page-size":t.pageSize,layout:"prev, pager, next",total:t.tableData.allNum},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):a("div",{staticClass:"no-data"},[t._v(t._s(t.$L("暂无数据")))])],2):t._e()])],1)},i=[],r=a("b081"),o=(s={name:"order",components:{},props:{routerData:{type:Object,default:function(){return{}}}},data:function(){var t=this;return{loading:!0,showSearch:!1,theadName:{type:"all",list:[{text:"全部订单",type:"all",func:function(){t.$route.params.hasOwnProperty("id")?t.$router.push({params:{type:"all",id:t.$route.params.id}}):t.$router.push({params:{type:"all"}})}},{text:this.$L("已结算"),type:"settlement",func:function(){t.$route.params.hasOwnProperty("id")?t.$router.push({params:{type:"settlement",id:t.$route.params.id}}):t.$router.push({params:{type:"settlement"}})}},{text:this.$L("未结算"),type:"unSettlement",func:function(){t.$route.params.hasOwnProperty("id")?t.$router.push({params:{type:"unSettlement",id:t.$route.params.id}}):t.$router.push({params:{type:"unSettlement"}})}}]},tableData:{},pageSize:10,currentPage:1,userId:"",inputValue:""}},computed:{mobileTopBtn:{get:function(){return this.$store.state.mobileTopBtn},set:function(t){this.$store.commit("setMobileTopBtn",t)}}},created:function(){this.makeTop(),this.getData()},beforeRouteUpdate:function(t,e,a){this.getData(t),this.currentPage=1,this.makeTop(),a()},beforeDestroy:function(){this.mobileTopBtn=null}},Object(r["a"])(s,"created",(function(){this.makeTop(),this.getData()})),Object(r["a"])(s,"methods",{showError:function(t,e,a){this.errorType="warning"===a?"warning":"error",this.errorTitle=t&&""!==t?t:this.$L("出错了"),this.errorTips=e&&""!==e?e:null,this.loading=!1,this.errorShow=!0},getData:function(t){var e=this;e.loading=!0,t||(t=e.$route),e.theadName.type=t.params.hasOwnProperty("type")?t.params.type:"all",e.userId=t.params.hasOwnProperty("id")?t.params.id:"";var a={p:e.currentPage,num:e.pageSize,settlementStatus:e.theadName.type,keyword:e.inputValue,userId:e.userId};e.$api("distributionOrder",a,(function(t){1===t.flag?(e.tableData=t.data,e.loading=!1):-1===t.flag?e.$confirm(e.$L("请重新登录"),e.$L("登录超时"),{confirmButtonText:e.$L("重新登录"),cancelButtonText:e.$L("取消"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.$router.push({name:"login",query:{redirect:e.$route.fullPath}})})).catch((function(t){e.$router.push({name:"distributorMain"})})):e.$confirm(e.$L("数据加载失败"),e.$L("出错了"),{confirmButtonText:e.$L("点击重试"),cancelButtonText:e.$L("返回首页"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.getData()})).catch((function(t){e.$router.push({name:"distributorMain"})}))}),(function(t){e.$confirm(e.$L("网络请求失败"),e.$L("出错了"),{confirmButtonText:e.$L("点击重试"),cancelButtonText:e.$L("返回首页"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.getData()})).catch((function(t){e.$router.push({name:"distributorMain"})}))}))},handleSizeChange:function(t){this.pageSize=t,this.getData()},handleCurrentChange:function(t){this.currentPage=t,this.getData()},searchFunc:function(t){this.inputValue=t,this.getData()},statusFunc:function(t){var e;switch(t){case 0:e={text:this.$L("未结算"),color:"font-red"};break;default:e={text:this.$L("已结算"),color:"font-green"};break}return e},makeTop:function(){var t=this;this.mobileTopBtn=[{icon:"bbx-icon-sousuo",func:function(){t.doSearch(!0)}}]},doSearch:function(t){t?this.showSearch=!0:(this.searchType="all",this.showSearch=!1)}}),s),u=o,c=(a("a784"),a("e90a")),l=Object(c["a"])(u,n,i,!1,null,"534ee4bd",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-5dfdf693.89db9f7d.js.map