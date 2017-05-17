//header效果

//header topnav
$("#header .item_btn").hover(function(){
	$(this).find(".item_con").slideDown(500);
},function(){
	$(this).find(".item_con").slideUp(500);
})
//header center
$("#header .shopcar").hover(function(){
	$("#header .shopcar").find(".shopgoods").slideDown(0);
},function(){
	$("#header .shopcar").find(".shopgoods").slideUp(500);
})
//header mainnav
$("#header .con_right li.fcb").hover(function(){
	$(this).stop().animate({"width":"74px"},500);
},function(){
	$(this).stop().animate({"width":0},500);
})
$("#header .con_right li.fcb_return").hover(function(){
	$(this).stop().animate({"width":"100px"},500);
},function(){
	$(this).stop().animate({"width":0},500);
})
//header shoplist
$("#header .sel_list").hover(function(){
	$(this).find(".shop_list").stop().slideDown(200);
},function(){
	$(this).find(".shop_list").stop().slideUp(200);
})
//banner图部分
//轮播图
var timer=setInterval(fn,3000);
var bannerI=0;
	$("#banner .b_img li").eq(0).addClass("banner_bg")
						  .css("z-index",3);
function fn(){
	bannerI++;
	if(bannerI==$("#banner .b_img li").length){
		bannerI=0;
	}
	$("#banner .box_index li").eq(bannerI).addClass("bgcolor").siblings().removeClass("bgcolor")
	$("#banner .b_img li").eq(bannerI).css({"z-index":3,"opacity":1}).siblings().css("z-index",0)
	$("#banner .b_img li").eq(bannerI).addClass("banner_bg").siblings().removeClass("banner_bg")
}
$("#banner .box_index li").click(function(){
	clearInterval(timer)
	bannerI=$(this).index()-1;
	fn();
	timer=setInterval(fn,3000);
})
//content主体部分
//商品倒计时
function diff(start,end){
	return Math.abs((start.getTime()-end.getTime())/1000);
}
var now=new Date();
var end=new Date("2017-05-16 24:00:00");
var t=diff(now,end);
setInterval(function(){
	t--;
	h=parseInt(t/3600);
	m=parseInt((t-h*3600)/60);
	s=parseInt(t-h*3600-m*60);
	s=s<10?"0"+s:s;
	m=m<10?"0"+m:m;
	h=h<10?"0"+h:h;
	$("#mainbody .ctime span").html("00天"+h+"小时"+m+"分"+s+"秒")
	$("#newpro .sale_time span").html("00天"+h+"小时"+m+"分"+s+"秒")
},1000)
//mainbody中的品牌轮播加点击效果
var brand_index=0
$("#mainbody .brand_nav li").mouseenter(function(){
	$(this).css("color","#00c8ff").siblings("li").css("color","#000")
	$(this).find("i").css("display","block")
			.end().siblings().find("i").css("display","none")
	brand_index=$(this).index();
	$("#mainbody .brand_con .bc_page").eq(brand_index).css("display","block").siblings(".bc_page").css("display","none")
})

$("#mainbody .b_btn").click(function(){
	brand_index=brand_index+$(this).data("num");
	switch(brand_index){
		case 4 : brand_index=0;break;
		case -1 : brand_index=3;break;
	}
	$("#mainbody .brand_nav li").eq(brand_index).css("color","#00c8ff").siblings("li").css("color","#000")
	$("#mainbody .brand_nav li").eq(brand_index).find("i").css("display","block")
												.end().siblings().find("i").css("display","none")
	$("#mainbody .brand_con .bc_page").eq(brand_index).css("display","block").siblings(".bc_page").css("display","none")
})
