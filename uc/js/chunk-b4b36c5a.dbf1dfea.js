(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b4b36c5a"],{"2b51":function(t,e,a){},"3b1c":function(t,e,a){},"4c85":function(t,e,a){"use strict";var n=a("3b1c"),r=a.n(n);r.a},"6d73":function(t,e,a){},"78f2":function(t,e,a){"use strict";var n=a("cf79"),r=a.n(n);r.a},b9d8:function(t,e,a){"use strict";var n=a("2b51"),r=a.n(n);r.a},bb9c:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tab-box"},[t.topMenu&&t.topMenu.hasOwnProperty("menuList")?a("div",{staticClass:"box-title"},[a("vue-scroll",{staticClass:"mainBorderColor",attrs:{ops:t.ops}},[a("div",{staticClass:"title-box"},t._l(t.topMenu.menuList,(function(e){return e.hasOwnProperty("hide")&&!1!==e.hide&&t.$route.name!==e.router?t._e():a("div",{staticClass:"title-item",class:{mainFontColor:t.checkActive(e)},on:{click:function(a){return t.gotoRouter(e)}}},[t._v(t._s(e.text)+"\n                ")])})),0)])],1):t._e(),t.topMenu.hasOwnProperty("fullView")&&t.topMenu.fullView?a("router-view",{staticClass:"box-body",class:{"no-title":!t.topMenu||!t.topMenu.hasOwnProperty("menuList")},attrs:{"router-data":t.routerData},on:{action:t.action}}):a("div",{staticClass:"box-body",class:{"no-title":!t.topMenu||!t.topMenu.hasOwnProperty("menuList")}},[a("vue-scroll",[a("router-view",{staticClass:"box-content",attrs:{"router-data":t.routerData},on:{action:t.action}})],1)],1)],1)},r=[],s=(a("cc57"),{name:"tabBoxM",data:function(){return{ops:{scrollPanel:{scrollingX:!0,scrollingY:!1},rail:{opacity:0},bar:{opacity:0}}}},props:{topMenu:{type:Object,default:function(){return{}}},routerData:{type:Object,default:function(){return{}}}},methods:{action:function(t){this.$emit("action",t)},checkActive:function(t){return!!(!t.hasOwnProperty("router")||this.$route.name===t.router||t.hasOwnProperty("checkRouter")&&this.$in_array(this.$route.name,t.checkRouter))&&!(t.hasOwnProperty("params")&&!this.$compareObj(t.params,this.$route.params))},gotoRouter:function(t){if(t&&t.hasOwnProperty("router")){var e={};t.hasOwnProperty("params")&&Object.assign(e,t.params),t.hasOwnProperty("paramsData")&&Object.assign(e,t.paramsData),this.$router.push({name:t.router,params:e})}else if(t&&"function"===typeof t.func)t.hasOwnProperty("funcData")?t.func(t.funcData):t.func();else if(t&&t.hasOwnProperty("params")||t&&t.hasOwnProperty("paramsData")){var a={};t.hasOwnProperty("params")&&Object.assign(a,t.params),t.hasOwnProperty("paramsData")&&Object.assign(a,t.paramsData),this.$router.push({params:a})}}}}),o=s,i=(a("b9d8"),a("e90a")),c=Object(i["a"])(o,n,r,!1,null,"92ae351a",null);e["a"]=c.exports},bcbc:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"integral-list"},[a("tab-box-m",{staticClass:"top-menu",attrs:{"top-menu":t.topMenu}}),t.tableData.hasOwnProperty("exchangeList")&&t.tableData.exchangeList.length>0?a("div",{staticClass:"list-item"},[a("div",{staticClass:"content-item"},[a("ul",{staticClass:"content-ul"},t._l(t.tableData.exchangeList,(function(t,e){return a("li",{key:e,staticClass:"content-list"},[a("integral-style-one",{attrs:{data:t}})],1)})),0)]),a("div",{staticClass:"list-pages"},[a("el-pagination",{attrs:{small:"",background:"","page-size":t.pageSize,layout:"prev, pager, next",total:t.tableData.allNum},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)]):a("div",{staticClass:"list-none"},[t._v("\n\n        "+t._s(t.$L("无数据"))+"\n\n    ")])],1)},r=[],s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.tit?a("div",{staticClass:"section-title"}):t._e()},o=[],i={name:"sectionTitle",components:{},props:{tit:{type:String,default:""}}},c=i,u=(a("e6d3"),a("e90a")),l=Object(u["a"])(c,s,o,!1,null,"b0688dc4",null),p=l.exports,h=a("175e"),f=a("bb9c"),m={name:"integralList",components:{TabBoxM:f["a"],SectionTitle:p,IntegralStyleOne:h["a"]},data:function(){return{topMenu:{menuList:[{text:this.$L("全部"),router:"integralList",params:{points:"all"}},{text:this.$L("1-99"),router:"integralList",params:{points:"one"}},{text:this.$L("100-499"),router:"integralList",params:{points:"two"}},{text:this.$L("500-4999"),router:"integralList",params:{points:"three"}},{text:"5000"+this.$L("以上"),router:"integralList",params:{points:"four"}}]},currentPage:1,pageSize:6,tableData:{},points:"all",type:""}},beforeRouteUpdate:function(t,e,a){this.getData(t),a()},created:function(){this.getData()},methods:{handleCurrentChange:function(t){this.currentPage=t,this.getData()},handleSizeChange:function(t){this.pageSize=t,this.getData()},getData:function(t){var e=this;e.loading=!0,t||(t=e.$route),e.points=t.params.hasOwnProperty("points")?t.params.points:"all",e.type=t.hasOwnProperty("params")&&t.params.hasOwnProperty("type")?this.$route.params.type:"all";var a={p:e.currentPage,num:e.pageSize,type:e.type,points:e.points};e.$api("exchangeList",a,(function(t){1===t.flag?(e.tableData=t.data,e.loading=!1,console.log(e.tableData)):-1===t.flag?e.$confirm(e.$L("请重新登录"),e.$L("登录超时"),{confirmButtonText:e.$L("重新登录"),cancelButtonText:e.$L("取消"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.$router.push({name:"login",query:{redirect:e.$route.fullPath}})})).catch((function(t){e.$gotoWebHome()})):e.$confirm(e.$L("数据加载失败"),e.$L("出错了"),{confirmButtonText:e.$L("点击重试"),cancelButtonText:e.$L("返回首页"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.getData()})).catch((function(t){e.$router.push({name:"integralShop"})}))}),(function(t){e.$confirm(e.$L("网络请求失败"),e.$L("出错了"),{confirmButtonText:e.$L("点击重试"),cancelButtonText:e.$L("返回首页"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.getData()})).catch((function(t){e.$router.push({name:"integralShop"})}))}))}}},g=m,d=(a("78f2"),a("4c85"),Object(u["a"])(g,n,r,!1,null,"73a2dc0e",null));e["default"]=d.exports},cf79:function(t,e,a){},e6d3:function(t,e,a){"use strict";var n=a("6d73"),r=a.n(n);r.a}}]);
//# sourceMappingURL=chunk-b4b36c5a.dbf1dfea.js.map