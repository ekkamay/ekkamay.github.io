(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fb695c6"],{"270f":function(t,e,n){"use strict";var i=n("567e"),o=n.n(i);o.a},"567e":function(t,e,n){},"690b":function(t,e,n){},"7f7a":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("vue-scroll",[i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"edit-modify"},[i("div",{staticClass:"content-modify"},[i("el-form",{staticClass:"form-item",attrs:{size:"small",model:t.modifyForm,"label-width":"100px","label-position":"top"}},["text"==t.type||"html"==t.type?[i("div",{staticClass:"item"},[i("div",{staticClass:"tit"},[t._v("\n                            "+t._s(t.$L("模块标题"))+"：\n                        ")]),i("el-form-item",{staticClass:"form-item",attrs:{prop:"title"}},[t._v("\n                            "+t._s(t.modifyForm.title)+"\n                        ")])],1),i("el-form-item",{staticClass:"form-item-two",attrs:{label:t.$L("模块内容")+"：",prop:"text"}},[i("quill-editor",{staticClass:"editor",attrs:{maxlength:"50000",options:t.editorOption},model:{value:t.modifyForm.text,callback:function(e){t.$set(t.modifyForm,"text",e)},expression:"modifyForm.text"}})],1)]:[i("div",{staticClass:"item"},[i("div",{staticClass:"tit"},[t._v("\n                            "+t._s(t.$L("模块标题"))+"：\n                        ")]),i("el-form-item",{staticClass:"form-item",attrs:{prop:"title"}},[t._v("\n                            "+t._s(t.modifyForm.title)+"\n                        ")])],1),i("div",{staticClass:"item"},[i("div",{staticClass:"tit"},[t._v("\n                            "+t._s(t.$L(" 选择上传"))+"：\n                        ")]),i("el-form-item",{staticClass:"form-item",attrs:{prop:"img"}},[i("label",{staticClass:"label"},[i("input",{staticClass:"mainBgColor",attrs:{type:"button",id:"btn",value:t.$L("选择文件")}}),i("input",{attrs:{id:"fileinp",type:"file",name:"CommentsPic",placeholder:t.$L("上传图片"),multiple:"",accept:"image/png,image/jpeg,image/jpg"},on:{change:t.upImgFunc}}),i("div",{staticClass:"img-item"},["http://bbx11.nicebox.test"===t.modifyForm.img||""===t.modifyForm.img?i("img",{staticClass:"up-show",attrs:{src:n("8db5"),border:"0",align:"absmiddle"}}):i("img",{staticClass:"up-show",attrs:{src:t.modifyForm.img,border:"0",align:"absmiddle"}})])])])],1)]],2)],1),i("div",{staticClass:"bottom"},[i("el-button",{attrs:{size:"mini"},on:{click:t.backFunc}},[t._v(t._s(t.$L("取消返回")))]),i("el-button",{attrs:{size:"mini"},on:{click:t.defaultFunc}},[t._v(t._s(t.$L("恢复默认")))]),i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.saveingFunc}},[t._v(t._s(t.$L("保存设置")))])],1)])])},o=[],a={name:"editModify",data:function(){return{loading:!0,editorOption:{},type:0,blockName:"",langId:"",pageId:"commHeader",modifyForm:{title:"",text:"",img:""},routerData:{},uploadImg:[]}},created:function(){this.$route.query.hasOwnProperty("moduleType")&&(this.type=this.$route.query.moduleType),this.$route.query.hasOwnProperty("idBlock")&&(this.idBlock=this.$route.query.idBlock),this.$route.query.hasOwnProperty("blockName")&&(this.blockName=this.$route.query.blockName),this.$route.query.hasOwnProperty("langId")&&(this.langId=this.$route.query.langId),this.$route.query.hasOwnProperty("pageId")&&(this.pageId=this.$route.query.pageId),this.getData()},methods:{getData:function(){var t=this;t.loading=!0;var e={langId:t.langId,pageId:t.pageId,blockName:t.blockName};t.$route.query.hasOwnProperty("idBlock")&&(e.idBlock=this.idBlock),t.$api("editBlockContent",e,(function(e){1===e.flag?(t.routerData=e.data,t.routerData.hasOwnProperty("text")&&(t.modifyForm.title=t.routerData.text.title,t.modifyForm.text=t.routerData.text.text),t.routerData.hasOwnProperty("image")&&(t.modifyForm.title=t.routerData.image.title,t.modifyForm.img=t.routerData.image.file),t.loading=!1):2===e.flag?t.$confirm(t.$L("参数缺失"),t.$L("出错了"),{confirmButtonText:t.$L("点击重试"),cancelButtonText:t.$L("返回"),type:"error",distinguishCancelAndClose:!0}).then((function(){t.getData()})).catch((function(e){t.backFunc()})):11===e.flag?t.$confirm(t.$L("模块不存在"),t.$L("出错了"),{confirmButtonText:t.$L("点击重试"),cancelButtonText:t.$L("返回"),type:"error",distinguishCancelAndClose:!0}).then((function(){t.getData()})).catch((function(e){t.backFunc()})):-1===e.flag?t.$confirm(t.$L("请重新登录"),t.$L("登录超时"),{confirmButtonText:t.$L("重新登录"),cancelButtonText:t.$L("取消"),type:"error",distinguishCancelAndClose:!0}).then((function(){t.$router.push({name:"login",query:{redirect:t.$route.fullPath}})})).catch((function(e){t.$gotoWebHome()})):t.$confirm(t.$L("数据加载失败"),t.$L("出错了"),{confirmButtonText:t.$L("点击重试"),cancelButtonText:t.$L("返回"),type:"error",distinguishCancelAndClose:!0}).then((function(){t.getData()})).catch((function(e){t.backFunc()}))}),(function(e){t.$confirm(t.$L("网络请求失败"),t.$L("出错了"),{confirmButtonText:t.$L("点击重试"),cancelButtonText:t.$L("返回首页"),type:"error",distinguishCancelAndClose:!0}).then((function(){t.getData()})).catch((function(e){t.$router.push({name:"home"})}))}))},upImgFunc:function(t){var e=this,n=t.target.files[0],i=Math.floor(n.size/1024),o=n.type.substring(6);if(i>4194304)return e.$Message.info("请选择4M以内的图片！"),!1;if("png"!==o&&"jpeg"!==o&&"jpg"!==o)return e.$Message.info("请选择png、jpeg、jpg的图片格式！"),!1;e.uploadImg={file:n};var a=new FileReader;a.readAsDataURL(n),a.onload=function(t){e.modifyForm.img=t.target.result}},backFunc:function(){this.$router.push({name:"distributorModifyMobile"})},defaultFunc:function(){var t=this;t.routerData.hasOwnProperty("text")&&(t.modifyForm.text=t.routerData.text.text),t.routerData.hasOwnProperty("image")&&(t.modifyForm.img=t.routerData.image.file)},saveingFunc:function(){var t=this,e=this;e.loading=!0,setTimeout((function(){var n={langId:e.langId,pageId:e.pageId,blockName:e.blockName};e.routerData.hasOwnProperty("text")&&(n.blockText=e.modifyForm.text),e.routerData.hasOwnProperty("image")&&(e.modifyForm.image=e.uploadImg,n.PicFile=e.modifyForm.image),t.$route.query.hasOwnProperty("idBlock")&&(n.idBlock=e.idBlock);var i=e.$objToFormData(n);e.$api("saveBlockContent",i,(function(t){1===t.flag?(e.$message({message:e.$L("保存成功！"),type:"success"}),setTimeout((function(){e.loading=!1,"function"===typeof func&&func()}),500),e.backFunc()):-1===t.flag?e.$confirm(e.$L("请重新登录"),e.$L("登录超时"),{confirmButtonText:e.$L("重新登录"),cancelButtonText:e.$L("取消"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.$router.push({name:"login",query:{redirect:e.$route.fullPath}})})).catch((function(t){e.$gotoWebHome()})):2===t.flag?e.$confirm(e.$L("参数缺失"),e.$L("出错了"),{confirmButtonText:e.$L("点击重试"),cancelButtonText:e.$L("返回"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.saveingFunc()})).catch((function(t){e.backFunc()})):10===t.flag?e.$confirm(e.$L("保存失败"),e.$L("出错了"),{confirmButtonText:e.$L("点击重试"),cancelButtonText:e.$L("返回"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.saveingFunc()})).catch((function(t){e.backFunc()})):11===t.flag?e.$confirm(e.$L("模块不存在"),e.$L("出错了"),{confirmButtonText:e.$L("点击重试"),cancelButtonText:e.$L("返回"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.saveingFunc()})).catch((function(t){e.backFunc()})):13===t.flag?e.$confirm(e.$L("上传图片失败"),e.$L("出错了"),{confirmButtonText:e.$L("点击重试"),cancelButtonText:e.$L("返回"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.saveingFunc()})).catch((function(t){e.backFunc()})):14===t.flag?e.$confirm(e.$L("图片大小不要超过4M"),e.$L("出错了"),{confirmButtonText:e.$L("点击重试"),cancelButtonText:e.$L("返回"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.saveingFunc()})).catch((function(t){e.backFunc()})):e.$confirm(e.$L("数据加载失败"),e.$L("出错了"),{confirmButtonText:e.$L("点击重试"),cancelButtonText:e.$L("返回"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.saveingFunc()})).catch((function(t){e.backFunc()}))}),(function(t){e.$confirm(e.$L("网络请求失败"),e.$L("出错了"),{confirmButtonText:e.$L("点击重试"),cancelButtonText:e.$L("返回首页"),type:"error",distinguishCancelAndClose:!0}).then((function(){e.saveingFunc()})).catch((function(t){e.$router.push({name:"home"})}))}),!0)}),300)}}},r=a,c=(n("bea6"),n("270f"),n("e90a")),s=Object(c["a"])(r,i,o,!1,null,"fbc4d6b6",null);e["default"]=s.exports},"8db5":function(t,e,n){t.exports=n.p+"img/addpt.2ab3bc20.jpg"},bea6:function(t,e,n){"use strict";var i=n("690b"),o=n.n(i);o.a}}]);
//# sourceMappingURL=chunk-4fb695c6.71d242f0.js.map