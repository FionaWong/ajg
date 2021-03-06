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
			pafCheck : $('#pafCheck').is("checked")  ,
			merchantKey : $('#merchantKey').val() || '',
			pafChannelCode :  'paf',
			systemId : $('#systemId').val() || '',
			alipayCheck : $("#alipayCheck").is("checked") ,
			alipayPartner : $('#alipayPartner').val() || '',
			alipaySellerId : $('#alipaySellerId').val() || '',
			alipaySellerId : $('#alipaySellerId').val() || '',
			alipayPublicKey : $('#alipayPublicKey').val() || '',
			alipayPrivateKey : $('#alipayPrivateKey').val() || '',
			alipayChannelCode : 'alipay',
			merchantPhone: $('#merchantPhone').val() || ''
		};
	},
	update = function(){
		var data = getAddData();
		data.merchantId = $("#merchantId").val() || "";
		data.merchantName = $("#merchantName").val() || "";
		data.merchantCode = $("#merchantCode").val() || '';
		supplier.update(
			data,
			function(res){
				alert("添加成功");
				window.location ='supplier.html';
			}
		);
	},
	view = function(merchantId){
		supplier.view(
			{merchantId:merchantId},
			function(res){
				if(!res){alert("数据返回错误.");return false;}
				var data = res.data;
				for(var x in data){
					$("#"+x).val(data[x] ||"");
					if(x =='payChannelCfgInfolist'){
						for(var i=0;i<data['payChannelCfgInfolist'].length;i++){
							var obj = data['payChannelCfgInfolist'][i];
							if(obj["channelCode"] == "alipay"){
								$("#alipayCheck").attr("checked","checked");
							}
							if(obj["channelCode"] == "paf"){
								$("#pafCheck").attr("checked","checked");
							}
							if(obj["cfgKey"] == "merchant.key"){
								$("#merchantKey").val(obj["cfgValue"]);
								continue;
							}
							if(obj["cfgKey"] == "system.id"){
								$("#systemId").val(obj["cfgValue"]);
								continue;
							}
							//
							if(obj["cfgKey"] == "partner"){
								$("#alipayPartner").val(obj["cfgValue"]);
								continue;
							}
							if(obj["cfgKey"] == "seller_id"){
								$("#alipaySellerId").val(obj["cfgValue"]);
								continue;
							}
							if(obj["cfgKey"] == "private_key"){
								$("#alipayPrivateKey").val(obj["cfgValue"]);
								continue;
							}
							if(obj["cfgKey"] == "alipay_public_key"){
								$("#alipayPublicKey").val(obj["cfgValue"]);
								continue;
							}
							
						}
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
	},
	operate = function(id){
		if(id){
		 	update();
		 }else{
		 	add();
		 }
	}
    
    ;

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
	    	if($("#merchantPhone").val() || $("#merchantPhone").val() === 0){
	    		 if (validate.fn.tels($("#merchantPhone").val(),"客服电话填写错误.")) {
	    		 	operate(id);
	    		 }
	    	}else{
	    		operate(id);	
	    	}

	    });
		    
	})
})(window,$)