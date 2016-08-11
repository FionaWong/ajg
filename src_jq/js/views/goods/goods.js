(function(window,$){
  $(document).ready(function(){
    var moduleId = '2';
    //左菜单设置
    common.setActive(moduleId,true);
    common.appendTo($('.sidebar'));

    //datatable
    var url = "http://chaoshi.pingan.com/open/licai/xintuo/queryOrderList.do";
    getTable(url);
    $("#search").bind("click",function(e){

      //config.getGoodsList;
      getTable(url);
    })
    //取所有数据
    //good.getGoodsList(url,data,cb);
    $( "#dateFrom" ).datetimepicker({

        showSecond: true,
	     	showOtherMonths: true,
	    	selectOtherMonths: true,
	    	//showButtonPanel: true,
	    	changeMonth: true,
	      changeYear: true,
	      showAnim:'fadeIn',
	      onClose: function( selectedDate ) {
	        $( ".toDate,.toDate_icon" ).datepicker( "option", "minDate", selectedDate );
	      }
	    });
		 $( "#dateTo" ).datetimepicker({

		      showOtherMonths: true,
		    	selectOtherMonths: true,
          showSecond: true,
		    	changeMonth: true,
		      changeYear: true,
		      showAnim:'fadeIn',
		      onClose: function( selectedDate ) {
		        $( ".fromDate,.fromDate_icon" ).datepicker( "option", "maxDate", selectedDate );
		      }
		    });
    //取标签数据
    // childPropArray.forEach(function(e,i){
    //   $("#labels").append("<option value="+e.id+">"+e.name+"</option>");
    // })
});
function getQueryParam(){
  return {
    goodId:$('good').val()||"",
    goodName:$('name').val()||"",
    status:$('status').val()||"",
    onlineTimeBegin:$('dateFrom').val()||"",
    onlineTimeEnd:$('dateTo').val()||"",
    tagId:$('status').val()||""
  };
}
var getTable = function (url) {
  var table=$('#dataTables').dataTable();
  if(table){
    table.fnDestroy();
  }

  $('#dataTables').dataTable({
    'bFilter':false,
    "processing": true,
    "serverSide": true,
    "bInfo":false,//是否显示是否启用底边信息栏
    "sAjaxSource": url,
    'autoWidth': true,
    'pagingType': 'full_numbers',
    "language": {
      'lengthMenu': '每页显示 _MENU_ 记录',
      'zeroRecords': '没有数据 - 抱歉',
      'info': ' 第_PAGE_ 页/共 _PAGES_页',
      'infoEmpty': '没有符合条件的记录',
      //'search': '查找',
      'infoFiltered': '(从  _MAX_ 条记录中过滤)',
      'paginate': { "first":  "首页 ", "last": "末页", "next": "下一页","previous": "上一页"}
     },
     "retrieve":true,
     "paging":   true,
     "ordering": true,
     "info":     true,
     "columns": [
       { "data": "tagId" },
       { "data": "tagName" },
       { "data": "marketPrice" },
       { "data": "lowestPrice" },
       { "data": "status" },
       { "data": "mainTags" },
       { "data": "" }
     ],
    "ajax": {
      "url": url,
      'data':getQueryParam(),
      'dataType':'jsonp',
      "dataSrc": function ( json ) {
        for ( var i=0, ien=json.data.length ; i<ien ; i++ ) {
          json.data[i][0] = '<a href="/message/'+json.data[i][0]+'">View message</a>';
        }
        return json.data;
      }
    }

  });
 }


function queryAllParentProp(){
  api.resultFun(
    api.ajaxFun(config.queryAllParentProp,{}),
    function(res){
      if(res.code && res.code=='E000'){
        var list = res.data.list;
        for(var x in list){
          queryChildPropByParentId(list[x]['propertyParentId']);
        }
      } else{
        alert("系统繁忙");
      }
    }
  );
}
var childPropArray =[],
    childPropObj= function(id,name){
      this.id =id;
      this.name = name;
    };
function queryChildPropByParentId(parentId){
  api.ajaxFun(config.queryChildPropByParentId,parentId),
    function(res){
    if(res.code && res.code=='E000'){
      //var obj = new childPropObj(res.data.list.propertyId,res.data.list.propertyName);
      //childPropArray.push(obj);
      $("#labels").append("<option value="+res.data.list.propertyId+">"+res.data.list.propertyName+"</option>");
    } else{
      alert("系统繁忙");
    }
  }
}


})(window,$);
