(function(window,$){
	var page = function(){
		supplier.page(
			{
				pageSize:'1',
				pageNum:10000
			},
			function(res){
				if(!res){alert("数据错误.");return false;}
				var list = res.data,data=[];
				for(var y in list){
					data.push(create_supplier(list[y]));
				}
				dataTable($("#dataTables"),data);
			}
		);
	},
	add = function(data){
		supplier.add(
			data,
			function(){
				
			}
		);
	},
	update = function(){
		supplier.update(
			{},
			function(){
				
			}
		);
	},
	view = function(merchantId){
		supplier.update(
			{merchantId:merchantId},
			function(res){
				
			}
		);
	},
	create_supplier = function(data){
		if(!data){return;}
		var supplier= function(data){
			this.channelCode = data.channelCode;
			this.channelName = data.channelName;
			this.merchantId = data.merchantId;
			this.merchantCode = data.merchantCode;
			this.merchantName = data.merchantName;
			this.operate =  "<a href='newsupplier.html?id="+data.merchantId+"'>编辑</a>";
			
		};
		return new supplier(data);
	},

	dataTable = function(elem,data){
		elem.dataTable({
          "data": data,
          "columns":[
            {"data":"merchantId"},
            {"data":"merchantName"},
            {"data":"merchantCode"},
            {"data":"channelName"},
            {"data":"channelCode"},
            {"data":"operate"}
          ],
          "aoColumnDefs":[
            {"sWidth":"200px","aTargets":[]},
            {"sWidth":"200px","aTargets":[]},
            {"sWidth":"100px","aTargets":[]},
            {"sWidth":"100px","aTargets":[]},
            {"sWidth":"100px","aTargets":[]},
            {"sWidth":"200px","aTargets":[]}
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
          
	}
	$(document).ready(function(){
		//左菜单设置
	    common.setActive("4",true);
	    common.appendTo($('.sidebar'));
	    //加载数据
	    page();
	})
})(window,$)