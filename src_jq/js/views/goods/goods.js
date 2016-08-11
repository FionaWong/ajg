(function(window,$){
  $(document).ready(function(){
    var moduleId = '1';
    //左菜单设置
    common.setActive(moduleId,true);
    common.appendTo($('.sidebar'));

   
    getTable(config.getGoodsList);
    $("#search").bind("click",function(e){
      getTable(config.getGoodsList);
    })
    //get all props
    good.queryAllParentProp(setOptions);

    $( "#dateFrom" ).datetimepicker({

        showSecond: true,
	     	showOtherMonths: true,
	    	selectOtherMonths: true,
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
function shelf(id,status){
  status =status || 0;
  api.resultFun(
   api.ajaxFun(config.shelf,{goodId:id,"status":status}),
    function(res){
      if(res.code && res.code=='E000'){

        alert("成功");
      }else{
       alert("系统繁忙");
     }
    })
  
}
function getQueryParam(){
  return {
    goodId:$('#good').val()||"",
    goodName:$('#name').val()||"",
    status:$('#status').val()||"",
    onlineTimeBegin:$('#dateFrom').val()||"",
    onlineTimeEnd:$('#dateTo').val()||"",
    tagId:$('#status').val()||"",
    pageSize:10,
    pageNum:$('#pageNum').val()|| 1
  };
}
function goodLine(goodId,goodName,marketPriceDisplay,lowestPriceDisplay,status,tagName,operator){
  this.goodId = goodId;
  this.goodName = goodName;
  this.marketPriceDisplay = marketPriceDisplay;
  this.lowestPriceDisplay = lowestPriceDisplay;
  this.status = function(){
    return status ? "已上架":"已下架"; 
  };
  this.tagName = function(){
    if(!tagName){return "";}
    var _tag = "";
    for(var x in tagName){
      _tag += tagName[x]+","; 
    }
    return _tag.subString(0,_tag.length);
  };
  this.operator = function(){
    var str ="";
    str += '<a href="#" onClick="javascript:shelf("'+goodId+'",'+status +');">';
    str += status ? "上架" :"下架" ;
    str += '</a>';
    str += '<a href="#newproduct.html" > 编辑</a>';
    return str;
  }
}
function makeDatas(list){
  var datas =[];
  for(var x in list){
    datas.push(new goodLine(list[x].goodId,list[x].goodName
      ,list[x].marketPriceDisplay,list[x].lowestPriceDisplay
      ,list[x].status,list[x].tagName,list[x].tagName))
  }
  return datas;
}
var getTable = function (url) {
  var list =[],
      count =0,
      pageSize = 0,
      pageNum = 0,
      pageStart = 0,
      pageEnd = 0;
    
  $.ajax({
    url:url,
    type:'get',
    dataType:'jsonp',
    jsonp:'callback',
    data: getQueryParam() ||{},
    success:function(res){
       if(res.code && res.code=='E000'){
        list = res.data.list;
        count = res.data.count;
        var table=$('#dataTables').dataTable();
        if(table){
          table.fnDestroy();
        }
        $('#dataTables').dataTable({
          "data": makeDatas(list),
          "columns":[
            {"data":"goodId"},
            {"data":"goodName"},
            {"data":"marketPriceDisplay"},
            {"data":"lowestPriceDisplay"},
            {"data":"status()"},
            {"data":"tagName()"},
            {"data":"operator()"}
          ],
          "aoColumnDefs":[
            {"sWidth":"200px","aTargets":[]},
            {"sWidth":"200px","aTargets":[]},
            {"sWidth":"100px","aTargets":[]},
            {"sWidth":"100px","aTargets":[]},
            {"sWidth":"100px","aTargets":[]},
            {"sWidth":"200px","aTargets":[]},
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
            'info': ' 第_PAGE_ 页/共 _PAGES_页',
            'infoEmpty': '没有符合条件的记录',
            'infoFiltered': '',
            'paginate': { "first":  "首页 ", "last": "末页", "next": "下一页","previous": "上一页"}
           },
           "retrieve":true,
           "paging":   true,
           "ordering": true,
           "info":     true
           
         });
       } else{
         alert("系统繁忙");
       }
     }
    
  });
     
 }




function setOptions(res){
  $("#labels").append("<option value="+res.data.list.propertyId+">"+res.data.list.propertyName+"</option>");
}

})(window,$);
