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
		}
		
	}
})
