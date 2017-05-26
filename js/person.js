requirejs.config({
	paths:{ //配置文件移入需要的模块  并起别名
		 jquery:"jquery-1.11.1.min",
		 cookie:"cookie",
		 publicJs:"public",
	}
})
//子功能实现
requirejs(["jquery","publicJs"],function($,pJs){
	pJs.shopCar();
	$(".header").load("public.html #header",function(){
		pJs.headerJs();
		$(".mainnav").css("background","none")
		$(".mainnav").mouseenter(function(){
			$(this).css("background-color","#00647f")
		}).mouseleave(function(){
			$(this).css("background-color","#00c8ff")
		})
	})
	$(".footer").load("public.html #footer",function(){
		$(".foot_top dl").css("padding",0)
	})
	$(".side").load("public.html #side",function(){
		pJs.sideJs();
		$(".side_left").css("display","none")
	})
	window.onscroll = function(){
	 	//获取页面滚走的距离
	 	var h=1460;
	 	var sTop = document.body.scrollTop || document.documentElement.scrollTop;
	 	if( sTop > h ){
	 		$(".detail_info_nav")[0].style.position = "fixed";
	 		$(".detail_info_nav")[0].style.top = "0";
	 	}else{
	 		$(".detail_info_nav")[0].style.position = "";
	 	}
	 }
	$("#main .list_info a").click(  function(){
		$(this).css("color","#ff643c").find("i").css("background","#ff643c")
				.end().siblings().css("color","#6c6c6c").find("i").css("background","#6c6c6c")
				.end().parent().siblings(".list_info").find("a").css("color","#6c6c6c").find("i").css("background","#6c6c6c")
	})
})