(function(window,$){
	var dataPicker = function(elm){
		elm.datepicker({
	     showSecond: true,
	     //timeFormat:'hh:mm:ss',
	     showOtherMonths: true,
	     selectOtherMonths: true,
	     changeMonth: true,
	     changeYear: true,
	     showAnim:'fadeIn',
	     onClose: function( selectedDate ) {
	       $( ".toDate,.toDate_icon" ).datepicker( "option", "minDate", selectedDate );
	     }
	   });
	},
	datatable = function(elm,data){
		$(elm).dataTable({
          "data": data,
          "columns":[
            {"data":"orderId"},
            {"data":"goodId"},
            {"data":"goodName"},
            {"data":"userId"},
            {"data":"buyName"},
            {"data":"buyphone"},
            {"data":"createTime"},           
            {"data":"updateTime"},
            {"data":"status"},
            {"data":"price"},
            {"data":"operate()"}
            
          ],
          "aoColumnDefs":[
            {"sWidth":"80px","aTargets":[]},
            {"sWidth":"80px","aTargets":[]},
            {"sWidth":"80px","aTargets":[]},
            {"sWidth":"80px","aTargets":[]},
            {"sWidth":"80px","aTargets":[]},
            {"sWidth":"80px","aTargets":[]},
            {"sWidth":"80px","aTargets":[]},
            {"sWidth":"80px","aTargets":[]},
            {"sWidth":"80px","aTargets":[]},
            {"sWidth":"100px","aTargets":[]},
            {"sWidth":"100px","aTargets":[]},
            {"sWidth":"80px","aTargets":[]}
          ],
          "bSort":false,
          'bFilter':false,
          "processing": true,
          "serverSide": false,
          'autoWidth': false,
          'pagingType': 'full_numbers',
          "language": {
            'lengthMenu': '',
            'zeroRecords': '没有数据 - 抱歉',
            'info': '',
            'infoEmpty': '',
            'infoFiltered': '',
            'paginate': { "first":  " ", "last": "", "next": "下一页","previous": "上一页"}
           },
           "retrieve":true,
           "paging":   true,
           "ordering": true,
           "info":     true
        });
	},
	//根据接口返回list生成order 对象
	create_orderObj = function(order){
		var orderObj = {}
		for(var x in order){
			orderObj[x] = order[x] || '';
			orderObj.operate = function(){
				return "<a href='#' onClick='javascript:openLayerbox(\""+orderObj['orderId']+"\")'>查看</a>";
			}
		}

		return orderObj;
	},
	//拿到orderlist参数
	getOrderListParam = function(){
		return {
			userType:$("#userType").val() ||　"",
			userId:$("#userId").val()  ||　"",
			goodId:$("#goodId").val() ||　"",
			orderId:$("#orderId").val()  ||　"",
			userName:$("#userName").val() ||　"",
			cellphone:$("#cellphone").val() ||　"",
			goodName:$("#goodName").val() ||　"",
			orderStatus:$("#orderStatus").val() ||　"",
			dateStart: formateDate($("#startCreateTime").val()),
			dateEnd: formateDate($("#endCreateTime").val()),
			pageSize:1000,
			pageNum:1
		};
	},
	formateDate = function(val){
		if(!val) return "";	
		return val+" 00:00:00";
	},
	//拿到Orderlist数据
	orderList = function(){
		order.orderList(
			//params
			getOrderListParam(),
			//successcallback
			function(res){
				var datas =[],list = res.data.list;
				for(var x in list){
					datas.push(create_orderObj(list[x]));
				}
				//清空datatable
				var table=$('#dataTables').dataTable();
	            if(table){
	              table.fnDestroy();
	            }				
				datatable($("#dataTables"),datas);
			}
		);
	},
	modifyLogistics = function(){
		order.orderModifyLogistics(
			//params
			{
				orderId:$("#orderId_d").html() || '',
				logistics:$("#logistics_d").val() || '',
				logisticsCompany:$("#logisticsCompany_d").val() || ''
			},
			//successcallback
			function(res){
				alert("成功");
			}
		);
	},
	status;
	$(document).ready(function(){
	    //左菜单设置
	    common.setActive("3",true);
	    common.appendTo($('.sidebar'));
	    //datepicker
	    dataPicker($("#startCreateTime"));
	    dataPicker($("#endCreateTime"));
	    //datatable生成
	    orderList();
	    //seach 按钮
	    $("#search").bind("click",function(){
	    	//datatable生成
	    	orderList();
	    })
	    $("#saveBtn").bind("click",function(){
	    	modifyLogistics();
	    })
	    $("#cancel,.layer-close").bind("click",function(){
	    	hideLayerBox();
	    })
	})
	window.openLayerbox =function(orderId){
		//详情弹层
		$(".layer-box").show();
		$("input").val();
		orderDetail(orderId);

	};
	window.hideLayerBox = function(){
		$(".layer-box").hide();
	};
	window.orderDetail = function(orderId){
		if(!orderId){alert("订单号不能为空。"); return;} 
		order.orderDetail(
			//params
			{orderId:orderId},
			//successcallback
			function(res){
				var detail = res.data.detail;
				//设置值
				for(var x in detail){
					$("#"+x+"_d").html(detail[x]||"");
					if(x == 'propList'){
						for(var y in detail[x]) $("#"+y+"_dp").val(detail[x][y]||"");
					}
				}
			}
		);
	}
})(window,$);