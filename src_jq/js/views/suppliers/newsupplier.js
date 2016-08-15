(function(window,$){
	var page = function(){
		supplier.page(
			{
				pageSize:'1',
				pageNum:10000
			},
			function(res){
				if(!res){alert("数据错误.");return false;}
				var list = res.data.list,data=[];
				for(var y in list){
					data.push(create_supplier(list[y]));
				}
				dataTable($("#dataTable"),data);
			}
		);
	},
	add = function(){
		supplier.add(
			getAddData(),
			function(res){
				alert("添加成功");
				window.location ='supplier.html';
			}
		);
	},
	getAddData = function(){
		function isSelect(elm){
			return elm.is("checked") ;
		}
		return {
			merchantName : $('#merchantName').val() || '',
			pafCheck : $('#pafCheck').val() || '',
			merchantKey : $('#merchantKey').val() || '',
			pafChannelCode : $('#pafChannelCode').val() || '',
			systemId : $('#systemId').val() || '',
			alipayCheck : $('#alipayCheck').val() || '',
			alipayPartner : $('#alipayPartner').val() || '',
			alipaySellerId : $('#alipaySellerId').val() || '',
			alipaySellerId : $('#alipaySellerId').val() || '',
			alipayPublicKey : $('#alipayPublicKey').val() || '',
			alipayChannelCode : $('#alipayChannelCode').val() || '',
			merchantPhone: $('#merchantPhone').val() || ''
		};
	},
	update = function(){
		supplier.update(
			getAddData(),
			function(res){
				alert("添加成功");
				window.location ='supplier.html';
			}
		);
	},
	view = function(merchantId){
		supplier.update(
			{merchantId:merchantId},
			function(res){
				if(!res){alert("数据返回错误.");return false;}
				var data = res.data;
				for(var x in data){
					$("#"+x).val(data[x] ||"");
					if(x =='payChannelCfgInfolist'){
						//continue;
					}
				}
			}
		);
	},
	 getParam = function(name){
		var search = document.location.search;
		var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
		var matcher = pattern.exec(search);
		var items = null;
		if(null != matcher){
				try{
						items = decodeURIComponent(decodeURIComponent(matcher[1]));
				}catch(e){
						try{
								items = decodeURIComponent(matcher[1]);
						}catch(e){
								items = matcher[1];
						}
				}
		}
		return items;
	};


	
	$(document).ready(function(){
		//左菜单设置
	    common.setActive("4",true);
	    common.appendTo($('.sidebar'));
	    //判断是否有id
	    var id = getParam("id");
	    if(id){
	    	view(id);
	    }
	    //保存
	    $("#save").bind("click",function(){
	    	add();
	    });
	})
})(window,$)