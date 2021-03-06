$(function(){
	//var goodsId= '<%=request.getParameter("goodsId") %>';
	//alert(goodsId);
	$.ajax({
		type:"GET",
		dataType : "json",
		url:"/weOnes/goods/detail/"+goodsId,
	    success:function(data){
	    	 if (data.errorCode == "0") {
	    		 var goodsInfo = data.datas;
	    		 //alert(goodsInfo);
	 			 //console.log(goodsInfo);
	 			 $(".place-name").html(goodsInfo.name);
	 			 $(".goodsPreviewPhoto").attr("src",goodsInfo.goodsPreviewPhoto);
	 			 $(".positions").html(goodsInfo.city+"."+goodsInfo.district);
	 			 $(".functionalities").html("<span class='ng-binding ng-scope'>"+goodsInfo.categoryChildName+"</span>");
	 			 var attrKeys = goodsInfo.attrKeys;
	 			for(var i=0;i<attrKeys.length;i++){
	 				afterHtml = " <div class='summary-item ng-scope'> "+
	 								" <span>选择"+attrKeys[i].attrName+"：</span> ";
	 				afterHtml = afterHtml +"<div class='activity_date' style='height: 65px; overflow-y: scroll;'>";
	 				var attrVals = attrKeys[i].attrVals;
	 				for(var i=0;i<attrVals.length;i++){
	 					afterHtml = afterHtml + "<p class='activity_date_choice' data-keyId='"+attrVals[i].attrKeyId+"' data-symbol='"+attrVals[i].symbol+"'>"+attrVals[i].attrValue+"</p>";
	 				}
	 				afterHtml = afterHtml +"</div></div>";
	 			}
	 			 $(".positions").after(afterHtml);
	 			 $(".price").html(goodsInfo.price+"起");
	 			 $(".goods-info").html(goodsInfo.introduction);
	            }else{
	            	layer.msg(data.msg,{icon: 2});
	            }
		},
		error: function() {
			alert("error");
		}
	});// ajax end
	
	/**
	 * 用户选择商品属性值,查询价格
	 */
	$("body").on("click",".activity_date_choice",function(){
		var item = $(this);
		 $(".activity_date_choice").eq($(this).index()).addClass("activity_date_choiced").siblings().removeClass("activity_date_choiced");
		 var symbol = item.attr("data-symbol");
		 //根据symbol和goodsId 查询sku价格
		 $.post("/weOnes/goods/skuprice", {"goodsId": goodsId,"symbol":symbol },
				   function(data){
				    $(".price").html(data.datas);
				}, "json");
	});
	/**
	 * 点赞与收藏功能
	 */
	$(".detail .header .place-banner .place-summary .detail-cuetips-btm .btm-item").on("click",function(){
		var numbers = $(this).index();
		$(this).find("span.btm-item1").eq(1).toggleClass("btm-item2");
		if(numbers === 0){
			$(this).find("span.btm-item1").eq(0).find("i").toggleClass("icon-dianzanbefore icon-dianzanafter");
			$()
		}else{
			$(this).find("span.btm-item1").eq(0).find("i").toggleClass("icon-favorite icon-favoritesolid");
		};
	});
	
});