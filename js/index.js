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
	//动态加载头部尾部和侧边栏
	$(".header").load("public.html #header",function(){
		pJs.headerJs();
	})
	$(".footer").load("public.html #footer")
	$(".side").load("public.html #side",function(){
		pJs.sideJs();
	})
	//header效果
	//header topnav
	$("#header .item_btn").mouseenter(function(){
		$(this).find(".item_con").stop().slideDown(200);
	}).mouseleave(function(){
		$(this).find(".item_con").stop().slideUp(200);
	})
	//header center
	$("#header .shopcar").mouseenter(function(){
		$("#header .shopcar").find(".shopgoods").css({"display":"block"})
	}).mouseleave(function(){
		$("#header .shopcar").find(".shopgoods").animate({"height":0},300,function(){
			$(this).css({"display":"none","height":"280px"})
		});
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
	//ajax动态加载数据
	$.ajax({
			type:"get",
			url:"js/shop.json",
			success:function(res){
				var html=""
	//			console.log(res)
				for(var i in res){
						html+=`<li>
									<div class="new_img">
										<a href="#"><img src="images/${res[i].src}" alt="" /></a>
										<div class="new_img_hide"><a href="#">提拉紧致</a></div>
										<div class="mask_layer"></div>
									</div>
									<div class="new_info">
										<div class="iname"><a href="">${res[i].pname}</a></div>
										<div class="ibuy clearfix">
											<p class="ibuy_price"><i>¥</i><span>${res[i].price}</span></p>
											<p class="ibuy_btn"><a href="javascript:;">加入购物车</a></p>
											<span style="display:none" data-id="${res[i].pid}" data-name="${res[i].pname}" data-src="${res[i].src}" data-price="${res[i].price}"></span>
										</div>
										<div class="sale_end">
											<p class="sale_time">聚团购结束<span></span></p>
											<p class="sale_count"><span>168</span>人购买</p>
										</div>
									</div>
								</li>`	
					}
				$("#newpro .n_list").append(html);
			}
		});
})