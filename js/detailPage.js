requirejs.config({
	paths:{ //配置文件移入需要的模块  并起别名
		 jquery:"jquery-1.11.1.min",
		 cookie:"cookie",
		 publicJs:"public",
		 shopCar:"shopCar"
	}
})
//子功能实现
requirejs(["jquery","publicJs","shopCar"],function($,pJs,shop){
	shop.shopCar();
	$(".header").load("public.html #header",function(){
		$(".topnav_con,.header_center_cont,.mainnav_cont").removeClass("w1100").addClass("w960")
		pJs.headerJs();
	})
	$(".footer").load("public.html #footer",function(){
		$(".foot_top,.foot_bottom").removeClass("w1100").addClass("w960")
	})
	$(".side").load("public.html #side",function(){
		pJs.sideJs();
		$(".side_left").css("display","none")
	})
})