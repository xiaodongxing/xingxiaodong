define(["cookie"],function(){
	return {
		"headerJs":function(){
			$("#header .item_btn").mouseenter(function(){
				$(this).find(".item_con").stop().slideDown(200);
			})
			$("#header .item_btn").mouseleave(function(){
				$(this).find(".item_con").stop().slideUp(200);
			})
			//header center
			$("#header .shopcar").mouseenter(function(){
				$("#header .shopcar").find(".shopgoods").css({"display":"block"})
			})
			$("#header .shopcar").mouseleave(function(){
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
		},
		"sideJs":function(){
			//左侧边栏点击事件
			$("#side  .sl_list li").click(function(){
				$(this).addClass("side_add").siblings().removeClass("side_add")
			})
			//右侧边栏的事件
			$("#side .side_right .sr_show").hover(function(){
				$(this).children("div").css({"display":"block"})
									   .stop().animate({"right":"35px","opacity":1},200,function(){
										$(this).css("display","block")
									})
			},function(){
				$(this).children("div").stop().animate({"right":"55px","opacity":0},200,function(){
					$(this).css("display","none")
				})
									
			})
			//右侧边栏 点击top页面上升事件
			$("#side .sr_top").click(function(){
				document.body.scrollTop=document.documentElement.scrollTop=0;
			})
			//判断点击的侧边栏的按钮li来显示对应的购物框
			$("#side .sr_item").click(fun)
			function fun(evt){
				var e=evt||event;
				e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
				var index=$(this).index()
				if(index>=1){
					$("#side .nav_content").eq(index-1).parent().css("display","block").animate({"left":"-300px"},500)
						.end().css("display","block").siblings(".nav_content").css("display","none")
				}
			//	alert($("#side .shopcar_bg").html())
				if(index==1){
					if($("#side .shopcar_bg").html()>=1){
						$("#side_shopcar .shopgoods_empty").css("display","none")
													.next().css("display","block")
					}else{
						$("#side_shopcar .shopgoods_empty").css("display","block")
													.next().css("display","none")
					}
					getShop()
				}
			}
			$("body,#side .rs_btn").click(function(){
				$("#side .right_box").animate({"left":"35px"},500,function(){
					$(this).css("diaplay","none")
				})
			})
			
			//$(document).click(function(){
			//	$("#side .right_box").animate({"left":"35px"},500,function(){
			//		$(this).css("diaplay","none")
			//	})
			//})
			$("#side .side_right").click(function(evt){//单独给最外围的盒子一个点击事件进行阻止冒泡，以防止冒泡到body
				var e=evt||event;
				e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
			})
			//该函数作用是在购物车里显示商品信息
			function getShop(){
				//获取cookie的值
				var arr=getCookie("shoplist");
				console.log(arr)
				var html=""
				for(var i=0;i<arr.length;i++){
					html+=`
					<li class="myshop_item">
						<div class="shop_img"><a href=""><img src="images/${arr[i].src}" alt="" /></a></div>
						<div class="shop_info">
							<p class="shop_info_name">${arr[i].name}</p>
							<div class="shop_opreat">
								<span class="shop_price">¥ <i style="font-style:normal">${arr[i].price}</i></span>
								<p class="shop_count">
									<span class="shop_count_down" data-num="-1">-</span>
									<input type="text" name="buy_num" value="${arr[i].count}"/>
									<span class="shop_count_down" data-num="1">+</span>
								</p>
								<a class="delBtn" href="#" data-id="${arr[i].id}">删除</a>
								
							</div>
						</div>
					</li>`
				}
				$("#side .myshop_list").html(html);
				getSum();
				$(".delBtn").click(function(){
					
					var id=$(this).data("id");
					if(confirm("确定要删除吗")){
						for(var i=0;i<arr.length;i++){
							if(id==arr[i].id){
								arr.splice(i,1);
							}
						}
						//删除以后要重置cookie里面的数据
						setCookie("shoplist",JSON.stringify(arr));
						shopcarNum=$("#sr_shopcar .shopcar_bg").html()-parseInt($(this).prev().find("input").val());
						$("#side .shopcar_bg").html(shopcarNum)
						$(this).parent().parent().parent().remove();
					}
				})
				$(".shop_count_down").click(function(){ 
					//获取商品的数量
			//		console.log(typeof $(this).parent().find("input").val())
					var num=parseInt($(this).parent().find("input").val());
			//		alert(price)
			//		console.log(typeof num)
			//		alert(typeof $(this).data("num"))
					num=num+$(this).data("num")
					if(num<1){num=1}//如果减到1时 不能继续减 给num赋值为1
					$(this).parent().find("input").val(num)
					var index=$(this).parent().parent().parent().parent().index();
					arr[index].count=num;
					setCookie("shoplist",JSON.stringify(arr));//同时更改cookie的值
					var price=arr[index].price*num;//计算num个数量的价格
					$(this).parent().prev().find("i").html(price);
					getSum()
				})
			}
			//计算总量函数
			 function getSum(){
			 	var sumPrice=0;
				var sumCount=0
			 	$("#side_shopcar .shop_opreat").each(function(){
						sumPrice+=parseInt($(this).find("i").html())
						sumCount+=parseInt($(this).find("input").val())
						console.log($(this).find("i").html())
				})
				$("#side_shopcar .account_zongjia").find("span").html(sumPrice)
				$("#side_shopcar .account_shopcount").find("span").html(sumCount)
				$("#sr_shopcar .shopcar_bg").html(sumCount)
			 }
		}
	}
})
