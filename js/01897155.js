$(function(){
	imgLazyloadLib();
	//代码创建一个遮罩层，用于做加载动画
	//setScroll();
	setEventListen();
})
$(window).load(function(){
	diyAutoHeight();
	imgLazyloadLib();
});
$(window).resize(function(){
	if(window.resizeTimeout)window.clearTimeout(window.resizeTimeout);
	window.resizeTimeout=setTimeout(function(){
		diyAutoHeight();
	},350);
});
function imgLazyloadLib(obj){
	if(obj){
		obj.lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}else{
		$("img").lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}
}
var scrollTime=300;
function setEventListen(){
	$(".ev_c_scrollTop").click(function(){
		//滚动到顶部
		//$("html").getNiceScroll().resize();
		//$("html").getNiceScroll(0).doScrollTop(0);
		$("html,body").stop().animate({scrollTop:"0px"},window.scrollTime);
	});
	$(".ev_c_scrollView").click(function(){
		//鼠标点击：滚动到模块位置
		var settings=settingsLib($(this));
		var viewid=settings.getSetting('eventSet.scrollView');
		if($("#"+viewid).length>0){
			//$("html").getNiceScroll().resize();
			//$("html").getNiceScroll(0).doScrollTop($("#"+viewid).offset().top);
			$("html,body").stop().animate({scrollTop:$("#"+viewid).offset().top+"px"},window.scrollTime);
		}
	});
	$(".ev_c_showView").click(function(){
		//鼠标点击：显示模块
		showEventView($(this));
	});
	$(".ev_c_hidView").click(function(){
		//鼠标点击：隐藏模块
		hidEventView($(this));
	});
	$(".ev_c_tabView").click(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".ev_m_tabView").hover(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".view").click(function(){
		$(this).children(".view_contents").addClass("diyCurTab");
		var settings=settingsLib($(this));
		var unitViewSet=settings.getSetting('unitViewSet');
		if(unitViewSet&&unitViewSet.length>0){
			for(key in unitViewSet){
				$("#"+unitViewSet[key]).children(".view_contents").removeClass("diyCurTab");
			}
		}
	});
}
function showHidEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!showViews)showViews=new Array();
	if(!hidViews)hidViews=new Array();
	var doubleKey=new Array();
	//获取重复值
	if(showViews.length>0){
		for(s_key in showViews){
			if(hidViews.length>0){
				for(h_key in hidViews){
					if(showViews[s_key]==hidViews[h_key]){
						doubleKey.push(showViews[s_key]);
					}
				}
			}
		}
	}
	//隐藏
	if(hidViews.length>0){
		for(key in hidViews){
			if($.inArray(hidViews[key],doubleKey)<0){
				$("#"+hidViews[key]).css({"display":"none"});
				diyAutoHeight($("#"+hidViews[key]));
			}
		}
	}
	//显示
	if(showViews.length>0){
		for(key in showViews){
			if($.inArray(showViews[key],doubleKey)<0){
				$("#"+showViews[key]).css({"display":"block"});
				diyAutoHeight($("#"+showViews[key]));
			}
		}
	}
	//双向显示
	if(doubleKey.length>0){
		for(key in doubleKey){
			if($("#"+doubleKey[key]).length>0){
				if($("#"+doubleKey[key]).is(":hidden")){
					$("#"+doubleKey[key]).css({"display":"block"});
					diyAutoHeight($("#"+doubleKey[key]));
				}else{
					$("#"+doubleKey[key]).css({"display":"none"});
					diyAutoHeight($("#"+doubleKey[key]));
				}
			}
		}
	}
}
function showEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	if(!showViews)showViews=new Array();
	if(showViews.length>0){
		for(key in showViews){
			$("#"+showViews[key]).css({"display":"block"});
			diyAutoHeight($("#"+showViews[key]));
		}
	}
}
function hidEventView(obj){
	var settings=settingsLib(obj);
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!hidViews)hidViews=new Array();
	if(hidViews.length>0){
		for(key in hidViews){
			$("#"+hidViews[key]).css({"display":"none"});
			diyAutoHeight($("#"+hidViews[key]));
		}
	}
}
function getPageScrollTop(){
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	return scrollTop;
}
function getNowPage(){
	var width=$(window).width();
	var max_width=window.DIY_PAGE_SIZE;
	max_width=parseFloat(max_width);
	if(isNaN(max_width))max_width=1200;
	if(width>=max_width){
		return 'pc';
	}else if(width>=640){
		return 'pad';
	}else{
		return 'mobile';
	}
}
$(window).scroll(function(){
    var scrollTop=getPageScrollTop();
    var nowPage=getNowPage();
    if($(".scrollToTop_"+nowPage).length>0){
    	$(".scrollToTop_"+nowPage).each(function(){
    		var old_top=$(this).attr("old_top_"+nowPage);
    		var old_left=$(this).attr("old_left_"+nowPage);
    		var old_width=$(this).attr("old_width_"+nowPage);
    		if(!old_top||old_top==""){
    			old_top=$(this).offset().top;
    			$(this).attr("old_top_"+nowPage,old_top);
    		}
    		if(!old_left||old_left==""){
    			old_left=$(this).offset().left;
    			$(this).attr("old_left_"+nowPage,old_left);
    		}
    		if(!old_width||old_width==""){
    			old_width=$(this).width();
    			$(this).attr("old_width_"+nowPage,old_width);
    		}
    		old_top=parseFloat(old_top);
    		old_left=parseFloat(old_left);
    		old_width=parseFloat(old_width);
    		if(scrollTop>=old_top){
    			$(this).css({"position":"fixed","z-index":9999999,"top":"0px","width":old_width+"px","left":old_left+"px"});
    			$(this).parents(".view").css({"z-index":9999999});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":"visible"});
    			$(this).parents(".layout").css({"z-index":9999999});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":"visible"});
    			// 通过设置边距，清除悬浮对下一个元素的影响
                        if ($(this).hasClass('layout')) {
                            $(this).next().css('margin-top', (Number($(this).css('margin-top').replace('px', '')) + $(this).height()) + 'px');
                        }
    		}else{
    			$(this).css({"position":"","z-index":"","top":"","width":"","left":""});
    			$(this).parents(".view").css({"z-index":""});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":""});
    			$(this).parents(".layout").css({"z-index":""});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":""});
    			$(this).attr("old_top_"+nowPage,null);
    			$(this).attr("old_left_"+nowPage,null);
    			$(this).attr("old_width_"+nowPage,null);
    			// 通过设置边距，清除悬浮对下一个元素的影响
                        if ($(this).hasClass('layout')) {
                            $(this).next().css('margin-top', '');
                        }
    		}
    	});
    }
});
function diyAutoHeight(obj){
	if(obj&&obj.length>0){
		//针对选项卡做特殊处理
		if(obj.children(".view_contents").children("form").length>0){
			if(obj.children(".view_contents").children("form").children(".view").length>0){
				obj.children(".view_contents").children("form").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").length>0){
			if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").length>0){
				obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else{
			diyAutoHeightDo(obj);
		}
	}else{
		setTimeout(function(){
			$(".view").each(function(){
				if(!$(this).hasClass("includeBlock")){
					diyAutoHeightDo($(this));
				}
			});
		},500);
	}
}
function diyAutoHeightFatherDo(father,obj){
	var settings=settingsLib(father);
	var autoHeight=settings.getSetting('autoHeight');
	if(autoHeight&&autoHeight=="true"){
		//开启了允许自动高度
		var minHeight=obj.offset().top+obj.height()-father.offset().top;
		if(obj.siblings(".view").length>0){
			obj.siblings(".view").each(function(){
				if($(this).is(":visible")){
					var tempHeight=$(this).offset().top+$(this).height()-father.offset().top;
					if(tempHeight>minHeight){
						minHeight=tempHeight;
					}
				}
			});
		}
		//2019-5-20  选项卡添加选项高度计算
		var kind=settings.getSetting('kind');
		var name=settings.getSetting('name');
		var data=settings.getSetting('data');
		if (kind=="选项卡" && name=="tab") {
			var tab_nav_obj = father.children().children().children().eq(0);
			var tab_nav_height = tab_nav_obj.css('height');
			if ( tab_nav_height != undefined && tab_nav_height != undefined && data.showtype == "bottom") {
				minHeight = parseFloat(tab_nav_height) + Number(minHeight);
			}
		}
		father.css({"height":minHeight+"px"});
		diyAutoHeightDo(father);
	}
}
function diyAutoHeightDo(obj){
	if(obj.is(":visible")){
		var father=obj.parents(".view").first();
		if(father.length<=0)father=obj.parents(".layout").first();
		if(father.length>0){
			var settings=settingsLib(father);
			var autoHeight=settings.getSetting('autoHeight');
			if(autoHeight&&autoHeight=="true"){
				if(father.offset().top+father.height()<obj.offset().top+obj.height()){
					father.css({"height":(obj.offset().top+obj.height()-father.offset().top)+"px"});
					diyAutoHeightDo(father);
				}else{
					diyAutoHeightFatherDo(father,obj);
				}
			}
		}
	}
}
function setScroll(){
	if(typeof($("html").niceScroll)=="function"){
		$("html").niceScroll({zindex:99999,cursoropacitymax:0.8,cursoropacitymin:0.3,horizrailenabled:false,mousescrollstep:60,smoothscroll:true});	
	}else{
		setTimeout(setScroll,500);
	}
}
var settingsLib=function(view){
	var main={
		view:null,
		setup:function(obj){
			if(window.viewsSettings&&window.viewsSettings[obj.attr("id")]){
				this.init(window.viewsSettings[obj.attr("id")]);
				this.view=obj;
			}else{
				this.init({});
			}
		},
		init:function(obj){
			if(typeof(obj)=='object'){
				this.settings=obj;
			}else if(obj!="" && typeof obj == 'string'){
				eval('if(typeof('+obj+')=="object"){this.settings='+obj+';}else{this.settings={};}');
			}else{
				this.settings={};
			}
		},
		setSetting:function(k,v){
			if(!this.settings){
				this.settings={};	
			}
			var keyArray=k.split(".");
      		var val='this.settings';
			for (key in keyArray){
				if(keyArray[key]&&keyArray[key]!=''){
					if(eval(val+'["'+keyArray[key]+'"]')){
						val=val+'["'+keyArray[key]+'"]';
					}else{
						eval(val+'["'+keyArray[key]+'"]={}');
						val=val+'["'+keyArray[key]+'"]';
					}
				}
			}
			if(v==null){
				eval("delete "+val);		
			}else{
				eval(val+"=v");
			}
		},
		getSetting:function(key){
			if(!this.settings){
				this.settings={};	
			}
			if(key){
				var keyArray=key.split(".");
				var val='this.settings';
				for (key in keyArray){
					if(keyArray[key]&&keyArray[key]!=''){
						if(eval(val+'["'+keyArray[key]+'"]')){
							val=val+'["'+keyArray[key]+'"]';
							continue;
						}else{
							val=null;
							break;
						}
					}
				}
				return eval(val);
			}else{
				return this.settings;	
			}
		},
		saveSettings:function(obj){
			if(typeof(obj)=="object"&&this.settings&&obj.hasClass("view")){
				window.viewsSettings[obj.attr("id")]=this.settings;
			}else if(this.view&&typeof(this.view)=="object"&&this.settings&&this.view.hasClass("view")){
				window.viewsSettings[this.view.attr("id")]=this.settings;
			}
		}
	};
	if(view){
		main.view=view;
		main.setup(view);	
	}
	return main;
}

function GetUrlPara(){
	var url = document.location.toString();
	var arrUrl = url.split("?");
	var paras='';
	if(arrUrl.length>1){
		var para = arrUrl[1];
		var arrUrl2=para.split("&");
		arrUrl2.forEach(function(e){
			if(e.indexOf("mod=")>=0||e.indexOf("act=")>=0||e.indexOf("#")>=0){
				 return;  
			}else{
				paras+=e+"&";
			}
		})
	}
	return paras;
}
//RequestURL for signle
function RequestURL_old(viewid, sys_url, moreParams){
	var serverUrl = '//'+DIY_JS_SERVER+'/sysTools.php?mod=viewsConn&rtype=json&idweb='+DIY_WEBSITE_ID+'&'+sys_url;
	var settings = settingsLib($("#"+viewid));
	var params = "";
	if(settings && settings.getSetting("data")){
		$.each(settings.getSetting("data"), function(key, val){
			if($.isArray(val)){
				$.each(val, function(key2, val2){
					params += "&"+key+"[]="+val2;
				});
			}else{
				params += "&"+key+"="+val;
			}
		});
		if(params) serverUrl += params;
	}
	var params2 = GetUrlPara();
	if(params2) serverUrl += "&" + params2;
	if(moreParams) serverUrl += "&" + moreParams;
	var scriptString = "<scr"+"ipt type='text/javascript' src="+serverUrl+"></scr"+"ipt>";
	//$.ajaxSettings.async = false; 
	$.ajax({
	  dataType: 'jsonp',
	  crossDomain: true, 
	  url: serverUrl,
	  xhrFields:{withCredentials:true},
	  success: function(result){
		if(result.error) alert(result.error);
		else{
			if(typeof(history.replaceState) != 'undefined'){
				var obj={};
				var hstate=JSON.stringify(history.state);
				if(hstate!='null'&& hstate!=null){
					eval('var hjson = ' + hstate);
					obj=hjson;
				}
				var key="moreParams"+viewid;
				obj[key]=moreParams;
				//var strparam=viewid+":"+moreParams;
				//history.replaceState({("moreParams"+viewid):moreParams},"","");
				history.replaceState(obj,"","");
			}
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).children(".view_contents").show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	}});
	setTimeout(function(){commDefault_isFT();},500);
	function commDefault_isFT(){
		var based_Obj= document.getElementById("based");
		var currentlang_Obj= document.getElementById("currentlang");//当前语言
		$(function(){
			if (based_Obj){
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				switch( Request('chlang') ){
					case "cn-tw":
						BodyIsFt= getCookie(JF_cn)=="1"? 0 : 1;
						delCookie(JF_cn);
						SetCookie(JF_cn, BodyIsFt, 7);
						break; 
					case "cn":
					case "en": 
						BodyIsFt= 0; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 0, 7);
						currentlang_Obj.innerHTML = "简体中文";
						break;
					case "tw": 
						BodyIsFt= 1; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 1, 7);
						currentlang_Obj.innerHTML = "繁體中文"; //因为是繁体 你写简体也会被转化成繁体  所以这儿只能写繁体 2015-1-16
						break;
					default: 
						if (typeof Default_isFT!='undefined' && Default_isFT){ //如果默认繁体
							if(getCookie(JF_cn)==null){
								BodyIsFt= 1;
								SetCookie(JF_cn, 1, 7);
								break;
							}
						}
						BodyIsFt= parseInt(getCookie(JF_cn));
				}	
				if(BodyIsFt===1){
					StranBody();
					document.title = StranText(document.title);
				}else{
					StranBodyce();
					document.title = StranTextce(document.title);
				}
			}else{
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				if(Default_isFT){
					BodyIsFt= 1; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 1, 7);
					StranBody();
					document.title = StranText(document.title);
				}else{
					BodyIsFt= 0; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 0, 7);
					/*StranBodyce();
					document.title = StranTextce(document.title);*/
				}
			}
			
		});
	}
	/*
	$.getJSON(serverUrl, function(result){
		if(result.error) alert(result.error);
		else{
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	});*/
	//$("#"+viewid).append(scriptString);
}
function RequestURL(viewid, sys_url, moreParams){ 
	if(checkLoad==1){
		RequestURL_old(viewid, sys_url, moreParams);
		return;
	}
	//这是原本的URL
	var serverUrl = '/sysTools.php?&mod=viewsConn&rtype=json&idweb='+DIY_WEBSITE_ID+'&'+sys_url;
	var settings = settingsLib($("#"+viewid));
	var params = "";
	if(settings && settings.getSetting("data")){
		$.each(settings.getSetting("data"), function(key, val){
			if($.isArray(val)){
				$.each(val, function(key2, val2){
					params += "&"+key+"[]="+val2;
				});
			}else{
				params += "&"+key+"="+val;
			}
		});
		if(params) serverUrl += params;
	}
	var params2 = GetUrlPara();
	if(params2) serverUrl += "&" + params2;
	if(moreParams) serverUrl += "&" + moreParams;
	batchArr.push(serverUrl);

}
function sendBatch(sendurl){
	if(!sendurl) return;
	//10次分割
	var newArr = [];
	newArr = sliceArray(sendurl,10);
	//对url进行组装
	var serverUrl = '//'+DIY_JS_SERVER+'/sysTools.php?mod=viewsConn&act=batch&idweb='+DIY_WEBSITE_ID+'&';
	for(var i in newArr){
		var data = {};
		data.postUrl = newArr[i];
		//获取数据 xhrFields解决传输cookie问题
		$.ajax({
		  type: "post",
		  cache: false,
		  dataType: "json", 
		  async:true,
	      data:data ,
		  url: serverUrl,
		  xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
		  success: function(result){
		  	//var result = eval("("+result+")");
			if(result.error) {
				alert(result.error);
				//详情的判断
				if (result.data.pageType == 1){
                    setTimeout(function (){window.history.back()},2000)
				}
			} else{
				for(var i in result){//i就是viewid
					$("#"+i).children(".view_contents").html(result[i]['html']);
					$("#"+i).children(".view_contents").show();
					setTimeout(function(){
						diyAutoHeight($("#"+i));
					},500);	
				}
			}
		}});
	}
	setTimeout(function(){commDefault_isFT();},500);
	checkLoad = 1;
}

/*
 * 将一个数组分成几个同等长度的数组
 * array[分割的原数组]
 * size[每个子数组的长度]
 */
 function sliceArray(array, size) {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
}
//导航公共监听函数
function setDhListen(style,obj,params){
	var father=$(obj).parents(".dh").first();
	if(father.length>0){
		switch(style){
			case 'style_01':
				father.find(".miniMenu").toggleClass("Mslide");
	            if($("body").css("position")=="relative"){
	                $("body").css({"position":"fixed","width":"100%"});
	            }else{
	                $("body").css({"position":"relative","width":"100%"});
	            }
				break;
			case 'style_02':
				if(params=="open"){
					father.find(".Style_02_miniMenu .menuMain").css("display","block");
				}else{
					father.find(".Style_02_miniMenu .menuMain").css("display","none");
				}
				break;
			case 'style_03':
				if(params=="mobi_more"){
					$(obj).parent().siblings(".mobi_menuUl02").toggle();
				}else if(params=="m_icoFont"){
					$(obj).parents(".mobi_main").hide();
				}else if(params=="mobi_top"){
					$(obj).siblings(".mobi_main").show();
				}
				break;
			case 'style_04':
				var width = $(window).width();
                var newW = width+18;
                father.find(".newWidth").css("width",newW);
                father.find(".miniMenu").toggleClass("Mslide");
                if($("body").css("position")=="relative"){
                    $("body").css({"position":"fixed","width":"100%"});
                }else{
                    $("body").css({"position":"relative","width":"100%"});
                }
				break;
			case 'type05':
						father.find(".mobileCon").show();
						father.find(".mobileCon").animate({left:'0'},600,function(){
							father.find(".mobileIcon").hide();
						})
						if($("body").css("position")=="relative"){
								$("body").css({"position":"fixed","width":"100%"});
						}else{
								$("body").css({"position":"relative","width":"100%"});
						}
				break;
			case 'type06':
						father.find(".mobileCon").animate({left:'-100%'},600,function(){
							father.find(".mobileCon").hide();
							father.find(".mobileIcon").show();
						});
						if($("body").css("position")=="relative"){
								$("body").css({"position":"fixed","width":"100%"});
						}else{
								$("body").css({"position":"relative","width":"100%"});
						}
				break;
		}
	}
}
//-------------选项卡-----------------------------------------------
//鼠标左右拖拽事件
function setScroll_Choice(tabId){
	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) return;
	if(typeof($(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll)=="function"){
		$(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll({zIndex:99999,cursoropacitymax:0,cursoropacitymin:0,horizrailenabled:true,autohidemode:true,touchbehavior:true});
	}else{
		setTimeout(setScroll_Choice,500);
	}
}

/*鼠标悬浮效果*/
function setHover_Choice(tabId){
	$(".tab_nav .tab_li", $("#"+tabId)).unbind('hover');
	$(".tab_nav .tab_li", $("#"+tabId)).hover(function(){
		var index = $(this).index();
		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
	});
}
/*鼠标点击效果*/
function setClick_Choice(tabId){
	$(".tab_nav .tab_li", $("#"+tabId)).unbind('click');
	$(".tab_nav .tab_li", $("#"+tabId)).click(function(){
		var index = $(this).index();
		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
	});
}
/*自动播放*/
function setAnimat_int(tabId,time){
	if(!time)time=5;
	time=time*1000;
	var viewid=tabId.substr(4);

	if(!window.tabConfigAnimat)window.tabConfigAnimat={};
	//初始化
	window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);

	$("#"+viewid).mousemove(function(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
	});
	$("#"+viewid).mouseover(function(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
	});
	$("#"+viewid).mouseout(function(){
		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
	});

	function doAnimat(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
		var index=$(".tab_nav .tabCurItem", $("#"+tabId)).index();
		index=index+1;
		if(index>=$(".tab_nav .tab_li", $("#"+tabId)).length){
			index=0;
		}
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
	}
}
//获取鼠标拖拽区域的总宽度
function tab_style03_init(tabId){
	var total=0;
	var obj=$(".tab_li", $("#"+tabId));
	$(".tab_li", $("#"+tabId)).each(function(){
		total+=$(this).width();
	});
	$(".tab_ul_top", $("#"+tabId)).css("width",total+"px");
	$(".tab_ul_bottom", $("#"+tabId)).css("width",total+"px");

	//向左滚动图标事件
	$(".tab_left_arrow", $("#"+tabId)).unbind('click');
	$(".tab_left_arrow", $("#"+tabId)).click(function(){
		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
		index = index-1;
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
        diyAutoHeight($("#"+tabId.substr(4)));
	});

	//向右滚动图标事件
	$(".tab_right_arrow", $("#"+tabId)).unbind('click');
	$(".tab_right_arrow", $("#"+tabId)).click(function(){
		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
		var len = $(".tab_nav .tab_li").length;
		index = index+1;
		if(index >= len){
			index = 0;
		}
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
        diyAutoHeight($("#"+tabId.substr(4)));
	});
	setScroll_Choice(tabId);
}
function StranBody(fobj){
	var obj= fobj ? fobj.childNodes : document.body.childNodes;
	for(var i=0;i<obj.length;i++){
		var OO=obj.item(i);
		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
		if(OO.title!=""&&OO.title!=null)OO.title=StranText(OO.title);
		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranText(OO.alt);
		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranText(OO.value);
		if(OO.nodeType==3){OO.data=StranText(OO.data)}
		else StranBody(OO)
	}
	
	try{
		var based_Obj2= document.getElementById("based2");
		if(!based_Obj2) { //简繁
			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
		}else{ //简繁英
			based_Obj.innerHTML = "繁体中文";
			based_Obj2.innerHTML = "简体中文";
		}
	}catch(e){}
}
function StranBodyce(fobj){
	var obj= fobj ? fobj.childNodes : document.body.childNodes;
	for(var i=0;i<obj.length;i++){
		var OO=obj.item(i);
		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
		if(OO.title!=""&&OO.title!=null)OO.title=StranTextce(OO.title);
		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranTextce(OO.alt);
		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranTextce(OO.value);
		if(OO.nodeType==3){OO.data=StranTextce(OO.data)}
		else StranBodyce(OO)
	}
	try{
		var based_Obj2= document.getElementById("based2");
		if(!based_Obj2) { //简繁
			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
		}else{ //简繁英
			based_Obj.innerHTML = "繁体中文";
			based_Obj2.innerHTML = "简体中文";
		}
	}catch(e){}
}
function StranText(txt){
	if(txt==""||txt==null)return "";
	return Traditionalized(txt);
}
function StranTextce(txt){
	if(txt==""||txt==null)return "";
	return Traditionalizedce(txt);
}
function JTPYStr(){
	return '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄标适态于';
}
function FTPYStr(){
	return '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩標適態於';
}
function Traditionalized(cc){
	var str='',ss=JTPYStr(),tt=FTPYStr();
	for(var i=0;i<cc.length;i++){
		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
  		else str+=cc.charAt(i);
	}
	return str;
}

function Traditionalizedce(cc){
	var str='',tt=JTPYStr(),ss=FTPYStr();
	for(var i=0;i<cc.length;i++){
		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
  		else str+=cc.charAt(i);
	}
	return str;
}

function _RequestParamsStr(){
	var strHref = window.document.location.href;
	var intPos = strHref.indexOf('?');
	var strRight = strHref.substr(intPos+1);
	return strRight;
}

function Request(strName){
	var arrTmp = _RequestParamsStr().split("&");
	for(var i=0,len=arrTmp.length; i<len; i++){ 
		var arrTemp = arrTmp[i].split("=");
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()){
		if(arrTemp[1].indexOf("#")!=-1) arrTemp[1] = arrTemp[1].substr(0, arrTemp[1].indexOf("#"));
			return arrTemp[1]; 
		}
	}
	return "";
}

function SetCookie(name,value,hours){
	var hourstay = 30*24*60*60*1000; //此 cookie 将被默认保存 30 天
	if(checkNum(hours)){
		hourstay = hours;
	}
    var exp  = new Date();
    exp.setTime(exp.getTime() + hourstay*60*60*1000);
    document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){     
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function checkNum(nubmer){
    var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/  
    if (re.test(nubmer))return true;
	return false;
}
function goBackHistory(num){
	if(typeof(num) == 'undefined'){
		num = 0;
	}
	if(num == '0'){
		if(history.go(-1)){
			location.href = history.go(-1);
		}
	}else{
		arr = location.href.split('/')
		arr[arr.length-1] = "index.html"
		arr = arr.join('/') 
		location.href = arr
	}
}

//简体转繁体
function commDefault_isFT(){
		var based_Obj= document.getElementById("based");
		var currentlang_Obj= document.getElementById("currentlang");//当前语言
		$(function(){
			if (based_Obj){
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				switch( Request('chlang') ){
					case "cn-tw":
						BodyIsFt= getCookie(JF_cn)=="1"? 0 : 1;
						delCookie(JF_cn);
						SetCookie(JF_cn, BodyIsFt, 7);
						break; 
					case "cn":
					case "en": 
						BodyIsFt= 0; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 0, 7);
						currentlang_Obj.innerHTML = "简体中文";
						break;
					case "tw": 
						BodyIsFt= 1; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 1, 7);
						currentlang_Obj.innerHTML = "繁體中文"; //因为是繁体 你写简体也会被转化成繁体  所以这儿只能写繁体 2015-1-16
						break;
					default: 
						if (typeof Default_isFT!='undefined' && Default_isFT){ //如果默认繁体
							if(getCookie(JF_cn)==null){
								BodyIsFt= 1;
								SetCookie(JF_cn, 1, 7);
								break;
							}
						}
						BodyIsFt= parseInt(getCookie(JF_cn));
				}	
				if(BodyIsFt===1){
					StranBody();
					document.title = StranText(document.title);
				}else{
					StranBodyce();
					document.title = StranTextce(document.title);
				}
			}else{
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				if(Default_isFT){
					BodyIsFt= 1; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 1, 7);
					StranBody();
					document.title = StranText(document.title);
				}else{
					BodyIsFt= 0; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 0, 7);
					/*StranBodyce();
					document.title = StranTextce(document.title);*/
				}
			}
			
		});
	}
$(document).ready(function(){

})
DIY_PAGE_SIZE='1200';



$(document).ready(function(){
	/*
	**当前模块对象：$("#image_style_12_1_1575343244513")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#dh_style_36_1575342041010")
	**效果仅在发布预览下才生效
	*/
	
})
$(document).ready(function(){
	/*
	**当前模块对象：$("#comm_layout_footer")
	**效果仅在发布预览下才生效
	*/
	
})
var viewsSettings={"comm_layout_header":{"diyShowName":"\u5171\u4eab\u5934\u90e8","css":{"pc":{"height":"149px","z-index":"99999"},"content":{"overflow":"visible"},"pad":{"height":"149px"},"mobile":{"height":"79px"}},"settingsBox":{"showTitle":"\u5171\u4eab\u5934\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_blank_new01_1575337039653":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5706\u5f62\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank_new01","styleSort":"99","styleKind":"\u56fe\u5f62\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank","css":{"pc":{"width":"100%","height":"46px","position":"absolute","top":"0%","left":"0%"},"pad":[],"mobile":{"width":"96%","height":"50px","top":"0px","left":"2%","display":"none"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#333333"},"@modSet":{"background":"#333333"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"lock":{"height":"false"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u56fe\u5f62\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"}}},"div_a_includeBlock_1575337302708":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"149px","position":"absolute","top":"0px","left":"calc(50% - 600px)"},"pad":{"width":"96%","left":"2.014846235418876%"},"mobile":{"width":"100%","height":"73px","top":"0px","left":"0%"},"content":{"overflow":"visible"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true","size":"true"}}},"text_style_01_1575337106343":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"50.583333333333336%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"15px","left":"0%"},"pad":{"z-index":2,"left":"0%","top":"15px","width":"618px"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"46px","left":"2%","display":"none"},"customCss":{"pc":{"@view_contents":{"font-size":"14px","line-height":"16px","color":"#ffffff"}},"mobile":{"@view_contents":{"font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"viewLock":{"pc":{"position":"false"},"pad":{"position":"true"}}},"searchbox_style_02_1575337182632":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"searchboxConfig","setupFunc":"searchboxSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u641c\u7d22\u6846\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u641c\u7d22\u6846-\u98ce\u683c2","styleShowName":"\u98ce\u683c2","styleKind":"\u641c\u7d22\u6846","styleHelpId":1261,"viewCtrl":"default","css":{"pc":{"width":"254px","position":"absolute","top":"10px","left":"calc(100% - 254px)"},"pad":{"z-index":2,"left":"calc(100% - 254px)","top":"10px"},"mobile":{"display":"none"},"content":{"overflow":"visible"},"customCss":{"pc":{"@inputSet":{"border-radius":"initial","font-size":"14px","height":"26px"},"@btnaSet":{"background-color":"#c9960b","color":"#ffffff","font-size":"20px","height":"26px"}}}},"lock":{"height":"true"},"name":"searchbox","kind":"\u641c\u7d22\u6846","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"searchBtn":" ","tipColor":"#cccccc","searchType":"1","searchLink":1897159},"moveEdit":[],"viewLock":{"pc":{"position":"false"}}},"dh_style_36_1575338566806":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"styleHelpId":1257,"style":"style_36","diyShowName":"\u4e09\u7ea7\u5bfc\u822a-\u98ce\u683c36","styleShowName":"\u4e09\u7ea7\u5bfc\u822a-\u98ce\u683c36","styleKind":"\u5bfc\u822a\u83dc\u5355","viewCtrl":"default","css":{"pc":{"width":"40.833333333333336%","z-index":"999","position":"absolute","left":"56.833333333333336%","top":"84.5px"},"pad":{"z-index":1,"width":"530px","left":"41.840089479392624%","top":"89.5px"},"mobile":{"width":"14.521452145214523%","z-index":"999","top":"14.5px","left":"85.6%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@mainMenuSet":{"background":"transparent","color":"#333333","border-top":"none !important","border-right":"none !important","border-left":"none !important","border-width":"2px","border-style":"solid","border-color":"transparent","line-height":"41px","margin-left":"27px","margin-right":"27px"},"@mainMenuSet:hover":{"background":"transparent","color":"#333333","border-top":"none !important","border-right":"none !important","border-left":"none !important","border-color":"#c9960b","border-width":"2px","border-style":"solid","padding-left":"0px","margin-left":"27px","margin-right":"27px"},"%hot>a":{"background":"transparent","color":"#333333","border-top":"none !important","border-right":"none !important","border-left":"none !important","border-color":"#c9960b","border-width":"2px","border-style":"solid","padding-left":"0px","margin-left":"27px","margin-right":"27px"},"@subMenuSet":{"line-height":"41px","background":"transparent"},"@thrMenuSet":{"line-height":"41px"},"@subMenuSet:hover":{"color":"#c9960b","border-color":"#c9960b"},"@subCurSet":{"color":"#c9960b","border-color":"#c9960b"},"@thrMenuSet:hover":{"color":"#c9960b"},"@thrCurSet":{"color":"#c9960b"},"@dhAreaSet":{"background":"transparent"}},"pad":{"@mainMenuSet":{"margin-left":"0px","margin-right":"0px"},"@mainMenuSet:hover":{"margin-left":"0px","margin-right":"0px"},"%hot>a":{"margin-left":"0px","margin-right":"0px"}},"mobile":{"@dhAreaSet":{"background":"#ffffff"},"@mainMenuSet":{"margin-left":"0px","margin-right":"0px"},"@mainMenuSet:hover":{"margin-left":"0px","margin-right":"0px"},"%hot>a":{"margin-left":"0px","margin-right":"0px"}}}},"lock":{"height":"true"},"data":{"childMenuType":"0","dhOpen":"on","subtitlename":"off","logoposition":"0","logoopen":"off","logoright":"10","logoleft":"","contentWidth":"1200","newWinShow":"on","showtarget0":"1","showpc":["1897155","1897157","1897159","1897171","1897173","1897175","1897177","1897179","1897181","1897183","1897185","1897187","1897189","1897191","1897193","1897163","1897165"],"showmobile":["1897155","1897157","1897159","1897171","1897173","1897175","1897177","1897179","1897181","1897183","1897185","1897187","1897189","1897191","1897193","1897163","1897165"]},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u5bfc\u822a\u83dc\u5355","needfix":1,"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"image_logo_1575336945986":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageLogoConfig","setupFunc":"logoSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"LOGO\u5c5e\u6027\u8bbe\u7f6e"},"style":"logo","styleKind":"LOGO","styleHelpId":1252,"viewCtrl":"logo","css":{"pc":{"width":"28.249999999999996%","height":"63px","position":"absolute","top":"61.5px","left":"0%"},"pad":{"z-index":2,"width":"24.40347071583514%","top":"81.5px","left":"0%","height":"47px"},"mobile":{"width":"161px","height":"31px","left":"0%","top":"21px"}},"data":{"logoType":1,"logoStyle":"3","logoBlank":"_self","idpage":1897155},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","diyShowName":"LOGO","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"},"mobile":{"position":"true"}}},"lang_style_1_1589262939584":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"langConfig","setupFunc":"langshow"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u4e2d\u82f1\u7e41\u5c5e\u6027\u8bbe\u7f6e"},"styleHelpId":1301,"style":"style_1","diyShowName":"\u591a\u8bed\u8a00\u7ad9\u70b9-\u98ce\u683c1","styleShowName":"\u591a\u8bed\u8a00\u7ad9\u70b9-\u98ce\u683c1","styleKind":"AAA","viewCtrl":"default","css":{"pc":{"width":"21.083333333333336%","position":"absolute","left":"32.416666666666664%","top":"84.5px"},"pad":{"left":"26.537079718004335%","width":"19.305856832971802%","top":"89.5px"},"mobile":{"width":"253px","top":"18px","left":"32.53333333333333%"},"content":{"overflow":"hidden"}},"lock":{"height":"true"},"name":"lang","kind":"\u7cfb\u7edf\u5de5\u5177","showname":"\u591a\u8bed\u8a00\u7ad9\u70b9","needfix":1,"data":{"langs":"0,2","textAlgin":"center"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pad":{"position":"true"},"mobile":{"position":"true"},"pc":{"position":"true"}}},"layout_diy_1575336667":{"diyShowName":"\u533a\u57df\u5e03\u5c40","css":{"pc":{"height":"580px"},"pad":{"height":"480px"},"mobile":{"height":"290px"},"content":{"overflow":"hidden"}},"settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"banner_style_01_1575339694152":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"bannerConfig","setupFunc":"bannerSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u8f6e\u64ad\u5c5e\u6027\u8bbe\u7f6e"},"styleHelpId":1256,"style":"style_01","diyShowName":"\u8f6e\u64ad\u56fe-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u56fe\u7247\u8f6e\u64ad","viewCtrl":"default","css":{"pc":{"width":"100%","height":"580px","position":"absolute","top":"0%","left":"0%"},"pad":{"height":"480px"},"mobile":{"width":"100%","height":"290px","top":"0px","left":"0%"}},"doubleClickFunc":"bannerViewSelect","mouseMenu":[{"name":"\u7f16\u8f91\u8f6e\u64ad\u56fe","func":"bannerViewSelect()","ico":"fa-file-image-o"}],"params":{"filelist":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/jpg\/1587854522933d391febec221a2c5.jpg?version=1587800531,https:\/\/cdn.yun.sooce.cn\/4\/40515\/jpg\/15878545229320d2846452c8c0697.jpg?version=1587800531,https:\/\/cdn.yun.sooce.cn\/4\/40515\/jpg\/15878551003607aeee2b82b4744cc.jpg?version=0,","titlelist":",,,","subtitlelist":",,,","textlist":",,,","btnNamelist":",,,","urllist":",,,","selectlist":",,,","groupNVallist":",,,","newspagelist":",,,","newsidlist":",,,","groupVallist":",,,","propagelist":",,,","proidlist":",,,","bgimglist":",,,","btnTimelist":",,,"},"name":"banner","kind":"\u56fe\u7247\u8f6e\u64ad","showname":"\u56fe\u7247\u8f6e\u64ad","needfix":1,"eventSet":{"scrollView":"none","type":"none"},"data":{"imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"viewLock":{"pc":{"position":"false"}}},"div_a_includeBlock_1575339749440":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"534px","position":"absolute","top":"0px","left":"calc(50% - 600px)"},"pad":{"width":"96%","left":"2.014846235418876%","height":"418px"},"mobile":{"width":"96%","height":"244px","top":"0px","left":"2%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceIn","duration":"1","delay":"0.25","iteration":"1","offset":"0"},"viewLock":{"pc":{"position":"false"},"mobile":{"size":"true","position":"true"}}},"text_style_01_1575340135256":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"51.24999999999999%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"24.375000000000004%","top":"206px","z-index":2},"pad":{"left":"3.2044198895027622%","width":"93.59116022099447%","top":"161px"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"92px","left":"1.9965277777777777%"},"customCss":{"pc":{"@view_contents":{"font-size":"60px","line-height":"62px","color":"#ffffff","text-align":"center"}},"mobile":{"@view_contents":{"font-size":"30px","line-height":"32px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"text_style_01_1575340179526":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"30.333333333333336%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"34.83333333333333%","top":"289px","z-index":2},"pad":{"left":"2.9281767955801103%","width":"94.14364640883977%","top":"258px"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"135px","left":"2%"},"customCss":{"pc":{"@view_contents":{"color":"#ffffff","font-size":"30px","line-height":"32px","text-align":"center"}},"mobile":{"@view_contents":{"font-size":"18px","line-height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"image_style_01_1575340494245":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"25px","height":"25px","position":"absolute","left":"27.5%","top":"362px","z-index":2},"pad":{"left":"27.693370165745858%","width":"25px","top":"322px"},"mobile":{"left":"3.9409722222222223%","top":"180px","height":"20px","width":"20px"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/0\/3409\/png\/1575340284012f0268775c646e844.png?version=1575340272","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""},"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"text_style_01_1575340527717":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"10.583333333333334%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"30.583333333333336%","top":"362px","z-index":2},"pad":{"left":"30.740676795580114%","width":"12.375690607734807%","z-index":3,"top":"322px"},"mobile":{"width":"23.333333333333332%","font-size":"12px","color":"#333","line-height":"1.6","top":"180px","left":"9.496527777777777%"},"customCss":{"pc":{"@view_contents":{"font-size":"22px","line-height":"24px","color":"#ffffff"}},"mobile":{"@view_contents":{"font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"image_style_01_1575340565051":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"2.083333333333333%","height":"25px","position":"absolute","left":"44.25%","top":"362px","z-index":2},"pad":{"height":"25px","width":"25px","top":"322px","left":"44.28176795580111%"},"mobile":{"width":"20px","left":"35.130208333333336%","top":"180px","height":"20px"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/0\/3409\/png\/1575340284012f0268775c646e844.png?version=1575340272","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"moveEdit":[],"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""},"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"text_style_01_1575340569413":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"14.666666666666666%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"47.25%","top":"362px","z-index":2},"pad":{"z-index":1,"width":"114px","top":"322px","left":"47.31353591160221%"},"mobile":{"width":"23.88888888888889%","font-size":"12px","color":"#333","line-height":"1.6","top":"180px","left":"41.11111111111111%"},"customCss":{"pc":{"@view_contents":{"font-size":"22px","line-height":"24px","color":"#ffffff"}},"mobile":{"@view_contents":{"font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"image_style_01_1575340576197":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"2.083333333333333%","height":"25px","position":"absolute","left":"60.33%","top":"362px","z-index":2},"pad":{"width":"25px","top":"322px","left":"60.8131906077348%"},"mobile":{"height":"20px","width":"20px","left":"63.38107638888889%","top":"180px"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/0\/3409\/png\/1575340284012f0268775c646e844.png?version=1575340272","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"moveEdit":[],"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""},"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"text_style_01_1575340580152":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"19.333333333333332%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"63.33%","top":"362px","z-index":2},"pad":{"top":"322px","left":"63.813881215469614%"},"mobile":{"width":"27.22222222222222%","font-size":"12px","color":"#333","line-height":"1.6","top":"180px","left":"68.93663194444444%"},"customCss":{"pc":{"@view_contents":{"font-size":"22px","line-height":"24px","color":"#ffffff"}},"mobile":{"@view_contents":{"font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"layout_1575341090268":{"css":{"pc":{"height":"238px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"233px"},"mobile":{"height":"144px","display":"none"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_a_includeBlock_1575368925703":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"204px","position":"absolute","top":"34px","left":"0%"},"pad":{"width":"96%","top":"24px","left":"2%","height":"189px"},"mobile":{"width":"96%","height":"130px","top":"14px","left":"2%"},"customCss":{"pc":{"modelArea":{"box-shadow":"#e0e0e0 0px 8px 10px "}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceInLeft","duration":"1","delay":"0.25","iteration":"1","offset":"0"},"viewLock":{"pc":{"position":"true","size":"true"},"mobile":{"size":"true","position":"true"},"pad":{"size":"true","position":"true"}}},"image_style_12_1_1575343244513":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_12_1","diyShowName":"\u56fe\u6587\u98ce\u683c01","styleShowName":"\u56fe\u6587\u98ce\u683c01","styleKind":"\u56fe\u6587\u7ec4","styleHelpId":"","viewCtrl":"photo","css":{"pc":{"width":"90%","position":"absolute","top":"0px","left":"5%","z-index":1},"pad":[],"mobile":{"left":"2.7777777777777777%","top":"0px","width":"341px"},"content":{"overflow":"visible"},"customCss":{"pc":{"@picSet":{"border-radius":"initial"},"@modSet":{"box-shadow":"transparent 0px 0px 0px ","border-width":"1px","border-style":"solid","border-top":"none !important","border-bottom":"none !important","border-left":"none !important","border-color":"#cccccc","padding-top":"0px","padding-bottom":"34px"},"@titProSet":{"color":"#333333","font-size":"22px"},"@defProSet":{"font-size":"16px","color":"#666666"}},"mobile":{"@titProSet":{"font-size":"16px"},"@defProSet":{"font-size":"12px"},"@modSet":{"padding-bottom":"4px"}},"pad":{"@modSet":{"padding-bottom":"24px"}}}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect4","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect4()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","params":{"filelist":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/158785583332921a1b85a3d6693ed.png?version=1587801841,https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/1587855833327adb56bbac53cf856.png?version=1587801841,https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/1587855833328c3ca2f44b1f604f1.png?version=1587801841,https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/15878558180186433ff00893f0637.png?version=1587801827,","titlelist":",,,,","subtitlelist":",,,,","textlist":",,,,","btnNamelist":",,,,","urllist":",,,,","selectlist":",,,,","groupNVallist":",,,,","newspagelist":",,,,","newsidlist":",,,,","groupVallist":",,,,","propagelist":",,,,","proidlist":",,,,","bgimglist":",,,,"},"data":{"prodhnum":"4","prodhnumpc":"4","prodhnumpad":"4","prodhnummobile":"4","imgWidthNum":"110","imgWidthNumpc":"110","imgWidthNumpad":"100","imgWidthNummobile":"55","prodznum":"2","prodznumpc":"2","prodznumpad":"2","prodznummobile":"2","prodnum":"4","hangnumpc":"4","hangnumpad":"4","hangnummobile":"4"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"viewLock":{"pc":{"position":"true","size":"true"}}},"text_style_01_1587857233504":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"10.75%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"10.416666666666668%","top":"120px"},"pad":{"left":"9.542773861171366%","width":"13.123644251626898%","top":"114px"},"mobile":{"width":"23.61111111111111%","font-size":"12px","color":"#333","line-height":"1.6","top":"78px","left":"2.7777777777777777%"},"customCss":{"pc":{"@view_contents":{"font-size":"17px"}},"mobile":{"@view_contents":{"font-size":"12px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587857387334":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"4.333333333333334%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"36.083333333333336%","top":"120px"},"pad":{"left":"35.401979392624725%","width":"6.507592190889371%","top":"129px"},"mobile":{"width":"10.555555555555555%","font-size":"12px","color":"#333","line-height":"1.6","top":"87.5px","left":"32.22222222222222%"},"customCss":{"pc":{"@view_contents":{"font-size":"17px"}},"mobile":{"@view_contents":{"font-size":"12px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587857455389":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"6.75%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"58.25%","top":"120px"},"pad":{"left":"57.50406724511931%","width":"8.134490238611713%","top":"129px"},"mobile":{"width":"15.277777777777779%","font-size":"12px","color":"#333","line-height":"1.6","top":"87.5px","left":"53.884548611111114%"},"customCss":{"pc":{"@view_contents":{"font-size":"17px"}},"mobile":{"@view_contents":{"font-size":"12px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587857531454":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"5.833333333333333%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"81.41666666666667%","top":"120px"},"pad":{"left":"79.9128931670282%","width":"8.785249457700651%","top":"129px"},"mobile":{"width":"13.88888888888889%","font-size":"12px","color":"#333","line-height":"1.6","top":"87.5px","left":"78.32899305555556%"},"customCss":{"pc":{"@view_contents":{"font-size":"17px"}},"mobile":{"@view_contents":{"font-size":"12px"}},"pad":{"@view_contents":{"font-size":"17px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"layout_1575345372499":{"css":{"pc":{"height":"1171px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"1182px"},"mobile":{"height":"1124px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_a_includeBlock_1575352650881":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"97.83333333333334%","height":"147px","position":"absolute","top":"0px","left":"1.125%"},"pad":{"height":"159px","width":"919px","left":"2.1028645833333335%","top":"5px"},"mobile":{"width":"95.73333333333333%","height":"104px","top":"0px","left":"2%","z-index":2}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":[],"pad":{"position":"true"},"mobile":{"size":"true","position":"true"}}},"text_style_01_1575352696137":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"0%","top":"23px"},"pad":{"left":"12.984562023939064%","width":"78.71794871794872%","top":"10px"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"20px","left":"2.0891364902506964%"},"customCss":{"pc":{"@view_contents":{"text-align":"center","font-size":"36px","line-height":"38px"}},"pad":{"@view_contents":{"font-size":"30px"}},"mobile":{"@view_contents":{"font-size":"18px","line-height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"pad":{"position":"true"}}},"div_blank_new05_1575352776034":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6c34\u5e73\u7ebf\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e","\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"}},"style":"blank_new05","styleKind":"\u6c34\u5e73\u7ebf\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank02","css":{"pc":{"width":"24.64%","position":"absolute","left":"0%","top":"42.5px"},"pad":{"left":"1.5421018276762404%","width":"23.49869451697128%","top":"34.5px"},"mobile":{"left":"0%","top":"20px","width":"61px"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box"},"@roundcs":{"border-color":"#cccccc","border-style":"solid"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u6c34\u5e73\u7ebf\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"}}},"div_blank_new05_1575352832661":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6c34\u5e73\u7ebf\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e","\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"}},"style":"blank_new05","styleKind":"\u6c34\u5e73\u7ebf\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank02","css":{"pc":{"width":"24.64%","position":"absolute","left":"75.35934291581108%","top":"42.5px"},"pad":{"width":"23.49869451697128%","left":"76.50130548302872%","top":"34.5px"},"mobile":{"width":"65px","left":"81.89415041782729%","top":"20px"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box"},"@roundcs":{"border-style":"solid","border-color":"#cccccc"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u6c34\u5e73\u7ebf\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"}}},"text_style_01_1575352962634":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"98.15195071868584%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"0.8943781942078365%","top":"70.5px"},"pad":{"left":"0%","top":"66px","width":"100%"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"47px","left":"2.2284122562674096%"},"customCss":{"pc":{"@view_contents":{"text-align":"center","font-size":"20px","line-height":"22px","color":"#cccccc"}},"pad":{"@view_contents":{"font-size":"18px"}},"mobile":{"@view_contents":{"font-size":"16px","line-height":"18px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":[],"pad":{"position":"true"}},"needfix":1,"moveEdit":[]},"image_style_03_1587859387944":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"16.083333333333332%","height":"151px","position":"absolute","top":"204px","left":"6.875000000000001%"},"pad":[],"mobile":{"width":"73.75%","height":"100px","top":"516px","left":"24.133333333333333%","display":"none"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/1587875557729fa1a8b308db2c450.png?version=0","imgStyle":{"pc":"3","pad":null,"mobile":null},"chrAlt":"\u56fd\u5185\u7248\uff5c\u51fa\u53e3\u8d38\u6613\u7248\uff5cCE\u8ba4\u8bc1\uff5cFDA\u8ba4\u8bc1"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"image_style_03_1587874506649":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"22.333333333333332%","height":"200px","position":"absolute","top":"159px","left":"26.083333333333332%"},"pad":[],"mobile":{"width":"30.666666666666664%","height":"100px","top":"105px","left":"60%"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/1587875575445a36e5b13298ef64d.png?version=0","imgStyle":{"pc":"3","pad":null,"mobile":null},"chrAlt":"CE\u8ba4\u8bc1 \uff5c FDA\u8ba4\u8bc1"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587874620318":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"12.833333333333332%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"367px","left":"8.5%"},"pad":{"width":"148px","left":"7.187499999999999%","top":"367px"},"mobile":{"width":"50%","font-size":"12px","color":"#333","line-height":"1.6","top":"580.5px","left":"34.52916666666667%","display":"none"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587874707975":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"15.75%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"367px","left":"30.083333333333336%"},"pad":{"width":"186px","left":"29.103190104166664%","top":"367px"},"mobile":{"width":"35.733333333333334%","font-size":"12px","color":"#333","line-height":"1.6","top":"206px","left":"57.46666666666667%"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}},"eventSet":{"scrollView":"none"}},"image_style_03_1587875021824":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"15.833333333333332%","height":"200px","position":"absolute","top":"159px","left":"52.708333333333336%"},"pad":{"width":"192px","left":"51.988932291666664%","top":"159px"},"mobile":{"width":"38.4%","height":"100px","top":"250px","left":"6%"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/1587875037439ff85b639ad839e35.png?version=1587821051","imgStyle":{"pc":"3","pad":null,"mobile":null},"chrAlt":"CE\u8ba4\u8bc1 \uff5c FDA\u8ba4\u8bc1"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587875083867":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"13.916666666666666%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"367px","left":"54.625%"},"pad":{"width":"164px"},"mobile":{"width":"36%","font-size":"12px","color":"#333","line-height":"1.6","top":"350px","left":"10%"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"image_style_03_1587875177631":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"15.833333333333332%","height":"200px","position":"absolute","top":"159px","left":"76.625%"},"pad":{"width":"171px"},"mobile":{"width":"39.46666666666667%","height":"100px","top":"250px","left":"56.266666666666666%"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/1587875198488204627075f201b36.png?version=0","imgStyle":{"pc":"3","pad":null,"mobile":null},"chrAlt":"CE\u8ba4\u8bc1 \uff5c FDA\u8ba4\u8bc1"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587875213077":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"15.833333333333332%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"373px","left":"77.20833333333333%"},"pad":{"width":"178px","left":"77.40559895833333%","top":"367px"},"mobile":{"width":"36%","font-size":"12px","color":"#333","line-height":"1.6","top":"350px","left":"57.99999999999999%"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587875319012":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"88.16666666666667%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"1108px","left":"3.75%"},"pad":{"left":"3.75%","top":"1082px","width":"914px"},"mobile":{"width":"80%","font-size":"12px","color":"#333","line-height":"1.6","top":"1021px","left":"10%"},"customCss":{"pc":{"@view_contents":{"color":"#67abef","font-weight":"bold"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"},"mobile":{"position":"true"}},"eventSet":{"scrollView":"none"}},"image_style_03_1587875593666":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"22.333333333333332%","height":"200px","position":"absolute","top":"450px","left":"3.75%"},"pad":{"top":"469px","height":"181px","width":"209px"},"mobile":{"width":"41.333333333333336%","height":"100px","top":"385.5px","left":"6%"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/158787561783894e4345250112d83.png?version=0","imgStyle":{"pc":"3","pad":null,"mobile":null},"chrAlt":"\u56fd\u5185\u7248\uff5c\u51fa\u53e3\u8d38\u6613\u7248\uff5cCE\u8ba4\u8bc1\uff5cFDA\u8ba4\u8bc1"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587875630528":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"15.083333333333334%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"663px","left":"6.541666666666666%"},"pad":{"width":"179px","left":"4.270833333333333%","top":"665px"},"mobile":{"width":"50%","font-size":"12px","color":"#333","line-height":"1.6","top":"491px","left":"10.133333333333333%"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"image_style_03_1587875798945":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"65.41666666666667%","height":"306px","position":"absolute","top":"763px","left":"3.3333333333333335%"},"pad":{"top":"804px","height":"220px","width":"599px","left":"4.454752604166667%"},"mobile":{"width":"75.73333333333333%","height":"109px","top":"881px","left":"10.399999999999999%"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/1587876134799645594916362b541.png?version=0","imgStyle":{"pc":"3","pad":null,"mobile":null},"chrAlt":"\u56fd\u5185\u7248\uff5c\u51fa\u53e3\u8d38\u6613\u7248\uff5cCE\u8ba4\u8bc1\uff5cFDA\u8ba4\u8bc1"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"},"mobile":{"position":"true"}}},"text_style_01_1587875826081":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"26.583333333333332%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"917px","left":"70.29166666666666%"},"pad":{"left":"70.33203125%","top":"869px"},"mobile":{"width":"75.73333333333333%","font-size":"12px","color":"#333","line-height":"1.6","top":"784px","left":"12.133333333333333%"},"customCss":{"pad":{"@view_contents":{"font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"},"mobile":{"position":"true"}},"eventSet":{"scrollView":"none"}},"text_style_01_1587876075206":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"18.666666666666668%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"836px","left":"70.29166666666666%"},"pad":{"left":"70.33203125%","top":"790px","width":"230px"},"mobile":{"width":"61.6%","font-size":"12px","color":"#333","line-height":"1.6","top":"738px","left":"21.866666666666667%"},"customCss":{"pc":{"@view_contents":{"font-size":"18px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"eventSet":{"scrollView":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"},"mobile":{"position":"true"}}},"text_style_01_1587876344843":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"16.583333333333332%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"663px","left":"28.958333333333336%"},"pad":{"width":"193px","left":"27.228190104166668%","top":"665px"},"mobile":{"width":"39.46666666666667%","font-size":"12px","color":"#333","line-height":"1.6","top":"491px","left":"56.266666666666666%"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"image_style_03_1587876512646":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"22.333333333333332%","height":"200px","position":"absolute","top":"465px","left":"50.416666666666664%"},"pad":[],"mobile":{"width":"32.800000000000004%","height":"100px","top":"544px","left":"11.600000000000001%"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/1587876525812a3e8b0d50e3c8006.png?version=0","imgStyle":{"pc":"3","pad":null,"mobile":null},"chrAlt":"\u56fd\u5185\u7248\uff5c\u51fa\u53e3\u8d38\u6613\u7248\uff5cCE\u8ba4\u8bc1\uff5cFDA\u8ba4\u8bc1"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587876548397":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"16.583333333333332%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"663px","left":"53.708333333333336%"},"pad":{"width":"182px","left":"52.50976562500001%","top":"665px"},"mobile":{"width":"38.13333333333333%","font-size":"12px","color":"#333","line-height":"1.6","top":"657px","left":"10%"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"image_style_03_1587879730570":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"10.75%","height":"141px","position":"absolute","top":"483px","left":"79.875%"},"pad":{"width":"159px","left":"77.87434895833333%","top":"479.5px"},"mobile":{"width":"25.6%","height":"85px","top":"551.5px","left":"62.53333333333333%"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/1587879766317929232348e617616.png?version=0","imgStyle":{"pc":"3","pad":null,"mobile":null},"chrAlt":"\u56fd\u5185\u7248\uff5c\u51fa\u53e3\u8d38\u6613\u7248\uff5cCE\u8ba4\u8bc1\uff5cFDA\u8ba4\u8bc1"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587879800253":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"16.583333333333332%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"650px","left":"77.20833333333333%"},"pad":{"width":"171px"},"mobile":{"width":"39.733333333333334%","font-size":"12px","color":"#333","line-height":"1.6","top":"657px","left":"54.266666666666666%"},"customCss":{"pad":{"@view_contents":{"font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}},"eventSet":{"scrollView":"none","type":"none"}},"image_style_03_1587876293528":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"17.25%","height":"200px","position":"absolute","top":"453.5px","left":"28.999999999999996%"},"pad":[],"mobile":{"width":"70.60333333333334%","height":"100px","top":"77px","left":"14.69833333333333%","display":"none"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/158787633125135e782f79b4f5001.png?version=0","imgStyle":{"pc":"3","pad":null,"mobile":null},"chrAlt":"\u56fd\u5185\u7248\uff5c\u51fa\u53e3\u8d38\u6613\u7248\uff5cCE\u8ba4\u8bc1\uff5cFDA\u8ba4\u8bc1"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}},"moveEdit":[]},"text_style_01_1587880899718":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"15.833333333333332%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"484px","left":"3.375%","display":"none"},"pad":{"width":"18.541666666666668%","display":"none"},"mobile":{"width":"34.4%","font-size":"12px","color":"#333","line-height":"1.6","top":"205px","left":"10%","display":"block"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"image_style_03_1587880985418":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"16.083333333333332%","height":"151px","position":"absolute","top":"526px","left":"0%","display":"none"},"pad":{"display":"none"},"mobile":{"width":"31.733333333333334%","height":"84px","top":"113px","left":"10%","display":"block"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/1587875557729fa1a8b308db2c450.png?version=0","imgStyle":{"pc":"3","pad":null,"mobile":null},"chrAlt":"\u56fd\u5185\u7248\uff5c\u51fa\u53e3\u8d38\u6613\u7248\uff5cCE\u8ba4\u8bc1\uff5cFDA\u8ba4\u8bc1"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"image_style_03_1587881321912":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"15.916666666666668%","height":"200px","position":"absolute","top":"657.5px","left":"9.583333333333334%","display":"none"},"pad":{"display":"none"},"mobile":{"width":"30.133333333333333%","height":"100px","top":"385.5px","left":"60%","display":"block"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/158787633125135e782f79b4f5001.png?version=0","imgStyle":{"pc":"3","pad":null,"mobile":null},"chrAlt":"\u56fd\u5185\u7248\uff5c\u51fa\u53e3\u8d38\u6613\u7248\uff5cCE\u8ba4\u8bc1\uff5cFDA\u8ba4\u8bc1"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}},"moveEdit":[]},"div_a_includeBlock_1587884793439":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"97.66666666666667%","height":"582px","position":"absolute","top":"154px","left":"1.1666666666666643%"},"pad":{"top":"162px","height":"574px","width":"914px","left":"2.4153645833333335%"},"mobile":{"width":"100%","height":"461px","top":"87px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"size":"true"},"pad":{"position":"true"}}},"div_a_includeBlock_1587884812385":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"97.33333333333334%","height":"411px","position":"absolute","top":"760px","left":"1.4166666666666665%"},"pad":[],"mobile":{"width":"100%","height":"300px","top":"397px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"position":"true"}}},"layout_1575355777666":{"css":{"pc":{"height":"692px"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":" url(https:\/\/cdn.yun.sooce.cn\/0\/3409\/jpg\/157535612781091374a475d0687ca.jpg?version=0)","background-size":"auto 100%","background-position":"50% 50% !important","background-repeat":"repeat-x!important"}}},"pad":{"height":"562px"},"mobile":{"height":"632px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_a_includeBlock_1575356166780":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"97.33333333333334%","height":"653px","position":"absolute","top":"0px","left":"1.375%"},"pad":{"height":"153px"},"mobile":{"width":"96.8%","height":"116px","top":"1px","left":"1.6000000000000014%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":[],"pad":{"size":"true","position":"true"},"mobile":{"position":"true"}}},"text_style_01_1575356166869":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"0%","top":"34px"},"pad":{"left":"24.979925053533194%","width":"50%","top":"37px"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"28px","left":"2%"},"customCss":{"pc":{"@view_contents":{"text-align":"center","font-size":"36px","line-height":"38px","color":"#ffffff"}},"pad":{"@view_contents":{"font-size":"30px","line-height":"32px"}},"mobile":{"@view_contents":{"font-size":"18px","line-height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"mobile":{"position":"true"},"pad":{"position":"true"}}},"div_blank_new05_1575356166876":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6c34\u5e73\u7ebf\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e","\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"}},"style":"blank_new05","styleKind":"\u6c34\u5e73\u7ebf\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank02","css":{"pc":{"width":"28.64%","position":"absolute","left":"0%","top":"54px"},"pad":{"left":"0%","width":"27.35562310030395%","top":"52.5px"},"mobile":{"left":"0%","top":"28px"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box"},"@roundcs":{"border-color":"#c9960b","border-style":"solid"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u6c34\u5e73\u7ebf\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"}}},"div_blank_new05_1575356166880":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6c34\u5e73\u7ebf\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e","\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"}},"style":"blank_new05","styleKind":"\u6c34\u5e73\u7ebf\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank02","css":{"pc":{"width":"28.64%","position":"absolute","left":"71.36038186157518%","top":"54px"},"pad":{"width":"27.35562310030395%","left":"72.64437689969606%","top":"52.5px"},"mobile":{"left":"68.48743112947659%","width":"111px","top":"28px"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box"},"@roundcs":{"border-style":"solid","border-color":"#c9960b"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u6c34\u5e73\u7ebf\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"}}},"text_style_01_1575356166884":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"88.14513723150358%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"5.864726027397261%","top":"86px"},"pad":{"left":"0%","width":"100%","top":"81px"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"61px","left":"2%"},"customCss":{"pc":{"@view_contents":{"text-align":"center","font-size":"20px","line-height":"22px","color":"#e5e5e5"}},"pad":{"@view_contents":{"font-size":"18px","line-height":"20px"}},"mobile":{"@view_contents":{"font-size":"16px","line-height":"18px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":[],"mobile":{"position":"true"},"pad":{"position":"true"}},"moveEdit":[]},"image_style_03_1587884059442":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"22%","height":"417px","position":"absolute","top":"173px","left":"26.541666666666668%"},"pad":{"height":"302px"},"mobile":{"width":"35.733333333333334%","height":"178px","top":"145px","left":"56.00000000000001%"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/15878839162936e2d03dc3773a0dd.png?version=1587829924"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}},"eventSet":{"scrollView":"none","type":"none"}},"image_style_03_1587884067143":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"22%","height":"417px","position":"absolute","top":"173px","left":"51.45833333333333%"},"pad":{"height":"298px"},"mobile":{"width":"36%","height":"193px","top":"377.5px","left":"55.733333333333334%"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/jpeg\/158788264265098462ced87eaa0fe.jpeg?version=1587828651"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"image_style_03_1587884091321":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_03","diyShowName":"\u56fe\u7247\u2014\u56fe\u6587","styleShowName":"\u98ce\u683c2","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"22%","height":"417px","position":"absolute","top":"173px","left":"76.29166666666667%"},"pad":{"height":"297px"},"mobile":{"width":"37.86666666666667%","height":"194px","top":"377px","left":"8.266666666666666%"},"content":{"overflow":"hidden"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image03_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/1587882027321e681b9239e8a951e.png?version=1587828036"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587884156198":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"21.75%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"613px","left":"2.0416666666666665%"},"pad":{"left":"1.9580078125%","top":"501px","width":"86px"},"mobile":{"width":"19.466666666666665%","font-size":"12px","color":"#333","line-height":"1.6","top":"332px","left":"8.266666666666666%"},"customCss":{"pc":{"@view_contents":{"color":"#ffffff"}},"mobile":{"@view_contents":{"font-size":"15px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587884273666":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"21.75%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"613px","left":"26.666666666666668%"},"pad":{"left":"25.978190104166664%","top":"501px","width":"221px"},"mobile":{"width":"30.666666666666664%","font-size":"12px","color":"#333","line-height":"1.6","top":"332px","left":"56.00000000000001%"},"customCss":{"pc":{"@view_contents":{"color":"#ffffff"}},"pad":{"@view_contents":{"font-size":"15px"}},"mobile":{"@view_contents":{"font-size":"15px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587884369158":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"23%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"607px","left":"50.958333333333336%"},"pad":{"left":"51.184895833333336%","top":"501px"},"mobile":{"width":"32.266666666666666%","font-size":"12px","color":"#333","line-height":"1.6","top":"581px","left":"57.666666666666664%"},"customCss":{"pc":{"@view_contents":{"color":"#ffffff","font-size":"15px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"text_style_01_1587884471365":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"17.083333333333332%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"607px","left":"78.54166666666667%"},"pad":{"left":"77.2802734375%","top":"501px","width":"193px"},"mobile":{"width":"30.4%","font-size":"12px","color":"#333","line-height":"1.6","top":"581px","left":"8.266666666666666%"},"customCss":{"pc":{"@view_contents":{"color":"#ffffff","font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","needfix":1,"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"image_style_01_1587885180453":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"22.416666666666664%","height":"417px","position":"absolute","top":"173px","left":"1.7083333333333333%"},"pad":{"height":"301px"},"mobile":{"width":"37.333333333333336%","height":"181px","top":"145px","left":"8.266666666666666%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/158788390287793471f9d12ee59e5.png?version=1587829911"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"}}},"div_a_includeBlock_1589251814717":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"66.66666666666666%","height":"300px","display":"none","position":"absolute","left":"16.66666666666667%","top":"134.25px"},"pad":{"width":"83.33333333333334%","height":"300px","display":"none","left":"8.333333333333329%","top":"134.25px"},"mobile":{"width":"100%","height":"478px","display":"block","top":"134.25px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","viewLock":{"mobile":{"position":"true"}}},"layout_1575356145072":{"css":{"pc":{"height":"1403px"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":"#f3f3f5"}}},"pad":{"height":"1403px"},"mobile":{"height":"892px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_a_includeBlock_1575357710014":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"97%","height":"628px","position":"absolute","top":"0px","left":"1.625%"},"pad":{"height":"173px"},"mobile":{"width":"97.33333333333334%","height":"109px","top":"0%","left":"0.6625%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"},"mobile":{"position":"true"}}},"text_style_01_1575357710119":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"0%","top":"44px"},"pad":{"left":"24.9093716433942%","width":"50%","top":"36px"},"mobile":{"width":"50%","font-size":"12px","color":"#333","line-height":"1.6","top":"28px","left":"25%"},"customCss":{"pc":{"@view_contents":{"text-align":"center","font-size":"36px","line-height":"38px","color":"#333333"}},"pad":{"@view_contents":{"font-size":"30px","line-height":"32px"}},"mobile":{"@view_contents":{"font-size":"18px","line-height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"},"mobile":{"position":"true"}}},"div_blank_new05_1575357710126":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6c34\u5e73\u7ebf\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e","\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"}},"style":"blank_new05","styleKind":"\u6c34\u5e73\u7ebf\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank02","css":{"pc":{"width":"28.64%","position":"absolute","left":"0%","top":"66.5px"},"pad":{"left":"0%","width":"27.35562310030395%","top":"52.5px"},"mobile":{"left":"2.8753993610223643%","top":"28px"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box"},"@roundcs":{"border-color":"#cccccc","border-style":"solid"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u6c34\u5e73\u7ebf\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"div_blank_new05_1575357710129":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6c34\u5e73\u7ebf\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e","\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"}},"style":"blank_new05","styleKind":"\u6c34\u5e73\u7ebf\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank02","css":{"pc":{"width":"28.64%","position":"absolute","left":"71.36038186157518%","top":"66.5px"},"pad":{"width":"27.35562310030395%","left":"72.64437689969606%","top":"52.5px"},"mobile":{"left":"66.70804794520548%","top":"28px"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box"},"@roundcs":{"border-style":"solid","border-color":"#cccccc"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u6c34\u5e73\u7ebf\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"text_style_01_1575357710132":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"98.56801909307876%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"1.2048192771084338%","top":"80.5px"},"pad":{"left":"0%","width":"100.09498480243163%","top":"73.5px"},"mobile":{"width":"100.05990415335464%","font-size":"12px","color":"#333","line-height":"1.6","top":"43px","left":"0%"},"customCss":{"pc":{"@view_contents":{"text-align":"center","font-size":"20px","line-height":"22px","color":"#cccccc"}},"pad":{"@view_contents":{"font-size":"18px","line-height":"20px"}},"mobile":{"@view_contents":{"font-size":"16px","line-height":"18px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"},"mobile":{"position":"true"}}},"banner_style_06_1588959792735":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"bannerConfig","setupFunc":"bannerSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u8f6e\u64ad\u5c5e\u6027\u8bbe\u7f6e"},"styleHelpId":1256,"style":"style_06","diyShowName":"\u8f6e\u64ad\u56fe-\u98ce\u683c6","styleShowName":"\u98ce\u683c6","styleKind":"\u56fe\u7247\u8f6e\u64ad","viewCtrl":"default","css":{"pc":{"width":"92.5%","height":"432px","position":"absolute","top":"169.21875px","left":"3.75%"},"pad":{"width":"929px","left":"1.875%"},"mobile":{"width":"92%","height":"300px","top":"94px","left":"4%"}},"doubleClickFunc":"bannerViewSelect","mouseMenu":[{"name":"\u7f16\u8f91\u8f6e\u64ad\u56fe","func":"bannerViewSelect()","ico":"fa-file-image-o"}],"params":{"filelist":"https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/15889969567021d6f548d505d6efb.png?version=0,https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/158899696446364e6d9ace0b7ccf9.png?version=1588942970,https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/15889985023495de4e5db2c21c299.png?version=0,https:\/\/cdn.yun.sooce.cn\/4\/40515\/png\/1588999074597de728180332c9edd.png?version=0,","textlist":"\u5408\u4f5c\u4ea7\u54c1,\u5408\u4f5c\u6848\u4f8b,\u4f20\u64ad\u6848\u4f8b,\u4f5c\u54c1\u6848\u4f8b,","titlelist":",,,,","subtitlelist":",,,,","btnNamelist":",,,,","btnTimelist":",,,,","urllist":",,,,","selectlist":",,,,","groupNVallist":",,,,","newspagelist":",,,,","newsidlist":",,,,","groupVallist":",,,,","propagelist":",,,,","proidlist":",,,,","bgimglist":",\/images\/logoback.gif,,\/images\/logoback.gif,"},"name":"banner","kind":"\u56fe\u7247\u8f6e\u64ad","showname":"\u56fe\u7247\u8f6e\u64ad","needfix":1,"viewLock":{"pc":{"position":"true"},"pad":{"position":"true"},"mobile":{"position":"true"}}},"div_a_includeBlock_1589002457979":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"96.75%","height":"775px","position":"absolute","top":"628px","left":"1.625%"},"pad":{"height":"775px"},"mobile":{"width":"91.73333333333333%","height":"506px","top":"359px","left":"4.3%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"div_blank_new05_1589002458159":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6c34\u5e73\u7ebf\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e","\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"}},"style":"blank_new05","styleKind":"\u6c34\u5e73\u7ebf\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank02","css":{"pc":{"width":"28.64%","position":"absolute","left":"0%","top":"66.5px"},"pad":{"left":"0%","width":"27.35562310030395%","top":"52.5px"},"mobile":{"left":"0%","top":"62px","width":"106px"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box"},"@roundcs":{"border-color":"#cccccc","border-style":"solid"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u6c34\u5e73\u7ebf\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"}}},"div_blank_new05_1589002458161":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6c34\u5e73\u7ebf\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e","\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"}},"style":"blank_new05","styleKind":"\u6c34\u5e73\u7ebf\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank02","css":{"pc":{"width":"28.64%","position":"absolute","left":"71.36038186157518%","top":"66.5px"},"pad":{"width":"27.35562310030395%","left":"72.64437689969606%","top":"52.5px"},"mobile":{"left":"67.68259447674419%","top":"62px","width":"107px"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box"},"@roundcs":{"border-style":"solid","border-color":"#cccccc"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u6c34\u5e73\u7ebf\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"}}},"text_style_01_1589002458165":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"98.56801909307876%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"1.2048192771084338%","top":"80.5px"},"pad":{"left":"0%","width":"100.09498480243163%","top":"93px"},"mobile":{"width":"100%","font-size":"12px","color":"#333","line-height":"1.6","top":"75px","left":"0%"},"customCss":{"pc":{"@view_contents":{"text-align":"center","font-size":"20px","line-height":"22px","color":"#cccccc"}},"pad":{"@view_contents":{"font-size":"18px","line-height":"20px"}},"mobile":{"@view_contents":{"font-size":"16px","line-height":"18px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"}}},"text_style_01_1589002458151":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"0%","top":"44.96875px"},"pad":[],"mobile":{"width":"27.906976744186046%","font-size":"12px","color":"#333","line-height":"1.6","top":"62px","left":"35.86482558139535%"},"customCss":{"pc":{"@view_contents":{"text-align":"center","font-size":"36px","line-height":"38px","color":"#333333"}},"pad":{"@view_contents":{"font-size":"30px","line-height":"32px"}},"mobile":{"@view_contents":{"font-size":"18px","line-height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"}},"moveEdit":[],"needfix":1},"div_a_includeBlock_1589238755516":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"760px","position":"absolute","top":"15px","left":"0%"},"pad":[],"mobile":{"width":"100%","height":"609px","top":"0px","left":"0%","display":"none"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","viewLock":{"pad":{"position":"true"},"pc":{"position":"true"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"newsList_style_23_1589000029320":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsBhj","act":"newListCfg","setupFunc":"newListSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u65b0\u95fb\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"styleHelpId":1266,"style":"style_23","diyShowName":"\u65b0\u95fb\u5217\u8868-\u65f6\u95f4\u8f74\u98ce\u683c","styleShowName":"\u65f6\u95f4\u8f74\u98ce\u683c","styleSort":"23","styleKind":"AAA","viewCtrl":"newsList","css":{"pc":{"width":"84.42307692307692%","position":"absolute","top":"151.5px","left":"6.0186298076923075%"},"pad":[],"mobile":{"left":"11.10223642172524%","top":"0px","display":"none"}},"lock":{"height":"true"},"data":{"newsShow":["date","title","summary","pic","article","readings"],"comments_num":10,"sort":"id","property_disable":[".picScale","._column"],"newsnum":2,"column":1,"gid":0,"titlenum":36,"newPicScale":"3:4","newpicwidth":"240","detailnum":{"pc":"200","pad":36,"mobile":36},"showtarget":"_blank","page_style":"1"},"defaultContent":["date","title","summary"],"newList":{"date":"\u65e5\u671f","title":"\u6807\u9898","summary":"\u6458\u8981","page":"\u5206\u9875"},"name":"newsList","kind":"\u65b0\u95fb\u6a21\u5757","showname":"\u65b0\u95fb\u5217\u8868","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"viewLock":{"pc":{"position":"true"}}},"newsList_style_23_1589252941433":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsBhj","act":"newListCfg","setupFunc":"newListSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u65b0\u95fb\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"styleHelpId":1266,"style":"style_23","diyShowName":"\u65b0\u95fb\u5217\u8868-\u65f6\u95f4\u8f74\u98ce\u683c","styleShowName":"\u65f6\u95f4\u8f74\u98ce\u683c","styleSort":"23","styleKind":"AAA","viewCtrl":"newsList","css":{"pc":{"width":"84.42307692307692%","position":"absolute","top":"0px","left":"0%","display":"none"},"pad":{"display":"none"},"mobile":{"left":"0%","top":"132px","width":"100%","display":"block"}},"lock":{"height":"true"},"data":{"newsShow":["date","title","summary","pic","article","readings"],"comments_num":10,"sort":"id","property_disable":[".picScale","._column"],"newsnum":2,"column":1,"gid":0,"titlenum":36,"newPicScale":"3:4","newpicwidth":"240","detailnum":{"pc":"200","pad":36,"mobile":36},"showtarget":"_blank","page_style":"1"},"defaultContent":["date","title","summary"],"newList":{"date":"\u65e5\u671f","title":"\u6807\u9898","summary":"\u6458\u8981","page":"\u5206\u9875"},"name":"newsList","kind":"\u65b0\u95fb\u6a21\u5757","showname":"\u65b0\u95fb\u5217\u8868","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"viewLock":{"pc":{"position":"true"}}},"layout_1575359429224":{"css":{"pc":{"height":"250px"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":" url(https:\/\/cdn.yun.sooce.cn\/0\/3409\/jpg\/1575359459274bcac837ecc1fe2bc.jpg?version=0)","background-size":"auto 100%","background-position":"50% 50% !important","background-repeat":"repeat-x!important"}}},"pad":{"height":"228px"},"mobile":{"height":"154px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_a_includeBlock_1575359435069":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"39.08333333333333%","height":"252px","position":"absolute","top":"-2px","left":"30.458333333333336%"},"pad":{"height":"230px","width":"960px","left":"0%"},"mobile":{"width":"99.2%","height":"146px","top":"0px","left":"0.9291666666666667%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"}}},"text_style_01_1575359435203":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"0%","top":"58px"},"pad":{"left":"25%","width":"50%","top":"47px"},"mobile":{"width":"50%","font-size":"12px","color":"#333","line-height":"1.6","top":"28px","left":"24.466565860215052%"},"customCss":{"pc":{"@view_contents":{"text-align":"center","font-size":"36px","line-height":"38px","color":"#ffffff"}},"pad":{"@view_contents":{"font-size":"30px","line-height":"32px"}},"mobile":{"@view_contents":{"font-size":"18px","line-height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"div_blank_new05_1575359435213":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6c34\u5e73\u7ebf\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e","\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"}},"style":"blank_new05","styleKind":"\u6c34\u5e73\u7ebf\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank02","css":{"pc":{"width":"28.64%","position":"absolute","left":"0%","top":"66.5px"},"pad":{"left":"0%","width":"27.35562310030395%","top":"52.5px"},"mobile":{"top":"28px"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box"},"@roundcs":{"border-color":"#ffffff","border-style":"solid"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u6c34\u5e73\u7ebf\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"div_blank_new05_1575359435218":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6c34\u5e73\u7ebf\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e","\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"}},"style":"blank_new05","styleKind":"\u6c34\u5e73\u7ebf\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank02","css":{"pc":{"width":"28.64%","position":"absolute","left":"71.36038186157518%","top":"66.5px"},"pad":{"width":"27.35562310030395%","left":"72.64437689969606%","top":"52.5px"},"mobile":{"top":"28px"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box"},"@roundcs":{"border-style":"solid","border-color":"#ffffff"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u6c34\u5e73\u7ebf\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"mobile":{"position":"true"}}},"text_style_01_1575359435224":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"95.4653937947494%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"2.2673031026252985%","top":"87.5px"},"pad":{"left":"0%","width":"100%","top":"90px"},"mobile":{"width":"100.10123239436619%","font-size":"12px","color":"#333","line-height":"1.6","top":"55px","left":"0%"},"customCss":{"pc":{"@view_contents":{"text-align":"center","font-size":"20px","line-height":"22px","color":"#ffffff"}},"pad":{"@view_contents":{"font-size":"18px","line-height":"20px"}},"mobile":{"@view_contents":{"font-size":"16px","line-height":"18px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"pad":{"position":"true"},"mobile":{"position":"true"}}},"layout_1589238747766":{"needfix":1,"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","css":{"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"1px"}}},"comm_layout_footer":{"diyShowName":"\u5171\u4eab\u5e95\u90e8","css":{"pc":{"height":"172px","z-index":"99999"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":"#333333"}}},"pad":{"height":"168px"},"mobile":{"height":"74px"}},"settingsBox":{"showTitle":"\u5171\u4eab\u5e95\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"dh_style_36_1575342041010":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"styleHelpId":1257,"style":"style_36","diyShowName":"\u4e09\u7ea7\u5bfc\u822a-\u98ce\u683c36","styleShowName":"\u4e09\u7ea7\u5bfc\u822a-\u98ce\u683c36","styleKind":"\u5bfc\u822a\u83dc\u5355","viewCtrl":"default","css":{"pc":{"width":"37.25%","z-index":"999","position":"absolute","left":"31.375%","top":"44px"},"pad":{"z-index":"999","left":"28.154825026511134%","width":"43.69034994697773%","top":"56px"},"mobile":{"width":"80px","z-index":"999","top":"0px","left":"36.7986798679868%","display":"none"},"content":{"overflow":"visible"},"customCss":{"pc":{"@mainMenuSet":{"background":"transparent","color":"#ffffff","border-top":"none !important","border-width":"1px","border-style":"solid","border-color":"#ffffff","line-height":"16px","margin-left":"0px","margin-right":"0px","font-size":"16px","border-bottom":"none !important","border-left":"none !important"},"@mainMenuSet:hover":{"background":"transparent","color":"#c9960b","border-top":"none !important","border-color":"#ffffff","border-width":"1px","border-style":"solid","padding-left":"0px","margin-left":"0px","margin-right":"0px","font-size":"16px","border-bottom":"none !important","border-left":"none !important"},"%hot>a":{"background":"transparent","color":"#c9960b","border-top":"none !important","border-color":"#ffffff","border-width":"1px","border-style":"solid","padding-left":"0px","margin-left":"0px","margin-right":"0px","font-size":"16px","border-bottom":"none !important","border-left":"none !important"},"@subMenuSet":{"line-height":"16px","background":"transparent"},"@thrMenuSet":{"line-height":"16px"},"@subMenuSet:hover":{"color":"#c9960b"},"@subCurSet":{"color":"#c9960b"},"@thrMenuSet:hover":{"color":"#c9960b"},"@thrCurSet":{"color":"#c9960b"},"@dhAreaSet":{"background":"transparent"}}}},"lock":{"height":"true"},"data":{"childMenuType":"0","dhOpen":"on","subtitlename":"off","logoposition":"0","logoopen":"off","logoright":"10","logoleft":"","contentWidth":"1200","newWinShow":"on","showtarget0":"1","showpc":["1897155","1897157","1897159","1897171","1897173","1897163","1897165"],"showmobile":["1897155","1897157","1897159","1897171","1897173","1897163","1897165"]},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u5bfc\u822a\u83dc\u5355","needfix":1,"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"pad":{"position":"true"}}},"text_style_01_1575342835501":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"68.75%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"106px","left":"15.625%"},"pad":{"left":"calc(50% - 330px)","top":"114px"},"mobile":{"width":"100%","font-size":"12px","color":"#333","line-height":"1.6","top":"25px","left":"0%"},"customCss":{"pc":{"@view_contents":{"color":"#ffffff","line-height":"22px","text-align":"center"}},"mobile":{"@view_contents":{"font-size":"14px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","needfix":1,"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"false"},"pad":{"position":"true"}}},"qqol_style_01_1575430820918":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"qqOnLineConfig","setupFunc":"qqOnLineSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"QQ\u5728\u7ebf\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5728\u7ebf\u5ba2\u670d","styleShowName":"\u98ce\u683c1","styleKind":"AAA","styleHelpId":1284,"viewCtrl":"default","css":{"pc":{"width":"17.5%","position":"absolute","top":"99px","left":"82.5%","display":"block"},"pad":{"left":"82.50265111346765%","display":"block"},"mobile":{"width":"69.3069306930693%","top":"0px","left":"15.346534653465348%","display":"none"},"content":{"overflow":"visible"}},"lock":{"height":"true"},"name":"qqol","kind":"\u5176\u5b83\u5de5\u5177","showname":"QQ\u5728\u7ebf","needfix":1,"data":{"qqolList":["{\"item-type\":\"separator\",\"item-name\":\"\u5206\u9694\u7ebf\",\"separator-height\":\"2\",\"separator-color\":\"#a0a0a0\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u5de5\u4f5c\u65f6\u95f4\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u5468\u4e00\u81f3\u5468\u65e5 \uff1a8:00-18:00\"}","{\"item-type\":\"separator\",\"item-name\":\"\u5206\u9694\u7ebf\",\"separator-height\":\"2\",\"separator-color\":\"#a0a0a0\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u8054\u7cfb\u65b9\u5f0f\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u7535\u8bdd\uff1a +86 13288681045\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u5ba2\u670d\u5fae\u4fe1\uff1a\u641c13288681045\u6dfb\u52a0\"}","{\"item-type\":\"txt\",\"item-name\":\"\u6587\u5b57\",\"txt-text\":\"\u90ae\u7bb1\uff1alim@ekkagroup.cn\"}"],"width":"200","hide":"on","border_width":"3","color_base":"#c9960b","qrcode_img":"","btn_text":"\u8054\u7cfb\u6211\u4eec"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true"}}}}