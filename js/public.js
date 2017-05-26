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
					$(this).css({"display":"none","height":"300px"})
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
		},
		"shopCar":function(){
			//购物车飞入模式
			var shopcarNum=0
			//构造shop对象
			function ShopCar(start){
				this.divs=$("<div>1</div>")
				this.start=start;//start为传过来的起始点数据即$(this).offset()
				this.end=$("#side .sr_shopcar").offset();
			//	console .log(this.start)
			}
			//创造div
			ShopCar.prototype.create=function(){
				this.divs.css({"width":"26px","z-index":10000,"height":"26px","position":"fixed","border-radius":"50%","background":"#ff643c","text-align":"center","line-height":"26px","color":"#fff"})
				$("body").append(this.divs)
			}
			//初始化方法
			ShopCar.prototype.init=function(){
				this.create();
				var startPoint = {
					"x":this.start.left + parseInt(this.divs.css("width"))/2,
					"y":this.start.top-document.body.scrollTop
				}
				var endPoint = { 
					"x":this.end.left + parseInt(this.divs.css("width"))/2,
					"y":this.end.top-$(document).scrollTop()+30
				}
				var topPoint = {
					"x":endPoint.x - 100,
					"y":endPoint.y -50
				}
			//	console.log(startPoint)
				//第二步  根据坐标值 确定抛物线方程的三个系数   就能确定抛物线方程
				//根据抛物线三点坐标，计算出抛物线的系数a  b   c  ，  就可以求出抛物线方程   
				//根据三点坐标确定抛物线的系数
				var a = ((startPoint.y - endPoint.y) * (startPoint.x - topPoint.x) - (startPoint.y - topPoint.y) * (startPoint.x - endPoint.x)) / ((startPoint.x * startPoint.x - endPoint.x * endPoint.x) * (startPoint.x - topPoint.x)-(startPoint.x * startPoint.x - topPoint.x * topPoint.x) * (startPoint.x - endPoint.x));  
				
				var b = ((endPoint.y - startPoint.y) - a * (endPoint.x * endPoint.x - startPoint.x * startPoint.x)) / (endPoint.x - startPoint.x);  
				
				var c = startPoint.y - a * startPoint.x * startPoint.x - b * startPoint.x;
				
				var x = startPoint.x;
				var y = startPoint.y;
				//第四步 商品移动  启动定时器 
			//	this.divs.css("left",x+"px")
			//	this.divs.css("top",y+"px")
				var that=this
				var timer = setInterval(function(){
					//第五步 定时器操作  当商品移动到购物车时 停下来  删除商品  数量累加  
					if( x < endPoint.x ){
						x = x + 5; //left
						y = a*x*x + b*x + c; //top
						that.divs.css("left",x+"px")
						that.divs.css("top",y+"px")
					}else{
						that.divs.remove();
						clearInterval(timer);
						shopcarNum=$("#sr_shopcar .shopcar_bg").html();
//						$("#side .shopcar_bg").html(++shopcarNum)
						getShop()
					}
				},5)
			}
			$("#newpro .n_list").on("click",".ibuy_btn",function(evt){
				var e=evt||event;
				e.stopPropagation?e.stopPropagation():e.cancelBubble=true;  
				var start=$(this).offset();
				var shopcar=new ShopCar(start);//new出来构造的shop对象，并传入当前点击的按钮的offset（）值
				shopcar.init();//启动初始化方法
				
				//将选中的商品的信息存入cookie里面
				var arr=[];//用来存储某些商品的信息
					var flag=true;//判断是否向arr中添加东西
					//json对象存储每个商品的信息
					objson={
						"id":$(this).next().data("id"),
						"name":$(this).next().data("name"),
						"src":$(this).next().data("src"),
						"price":$(this).next().data("price"),
						"count":1
						}
					oldCookie=getCookie("shoplist");
					if(oldCookie.length!=0){
						arr=oldCookie;
						for(var i=0;i<arr.length;i++){
							if(objson.id==arr[i].id){
								arr[i].count++;
								flag=false;
								break;
							}
						}
					}
					if(flag){
						arr.push(objson)
					}
					setCookie("shoplist",JSON.stringify(arr))
					console.log(document.cookie)
					
			})
			
		}
	}
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
					<span class="shop_price">¥ <i style="font-style:normal">${(arr[i].price)*(arr[i].count)}</i></span>
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
	$(".myshop_list").html(html);
	getSum();//调用计算总量的函数
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
			$(this).parent().parent().parent().remove();
			getSum()
			getShop()
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
		getShop()
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
 	if(sumCount==0){
 		$(".shopgoods_empty").css("display","block")
													.next().css("display","none")
 	}else{
 		$(".shopgoods_empty").css("display","none")
													.next().css("display","block")
 	}
	$(".account_zongjia").find("span").html(sumPrice)
	$(".account_shopcount").find("span").html(sumCount)
	$(".shopcar_bg").html(sumCount)
 }