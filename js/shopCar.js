define(["cookie"],function(){
	return {
		"shopCar":function(){
			//购物车飞入模式
			var shopcarNum=0
			//构造shop对象
			function ShopCar(start){
				this.divs=$("<div>1</div>")
				this.start=start;
				this.end=$("#side .sr_shopcar").offset();
			//	console.log(this.start)
			}
			ShopCar.prototype.create=function(){
				this.divs.css({"width":"26px","height":"26px","position":"fixed","border-radius":"50%","background":"#ff643c","text-align":"center","line-height":"26px","color":"#fff"})
				$("body").append(this.divs)
			}
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
						$("#side .shopcar_bg").html(++shopcarNum)
					}
				},5)
			}
			$("#newpro .n_list").on("click",".ibuy_btn",function(evt){
				var e=evt||event;
				e.stopPropagation?e.stopPropagation():e.cancelBubble=true;  //为什么阻止冒泡不管用
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

