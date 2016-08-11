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

    $( "#dateFrom" ).datepicker({

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
		 $( "#dateTo" ).datepicker({

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
     $( "#onlineTime" ).datetimepicker({

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
     $( "#expiredTime" ).datetimepicker({

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
     $("#shelf_o").click(pageOperate.shelf);
     $("#shelf_undo").click(pageOperate.closeLayer);
    //取标签数据
    // childPropArray.forEach(function(e,i){
    //   $("#labels").append("<option value="+e.id+">"+e.name+"</option>");
    // })
});

function getQueryParam(){
  return {
    goodId:$('#id').val()||"",
    goodName:$('#name').val()||"",
    status:$('#status').val()||"",
    onlineTimeBegin:$('#dateFrom').val()||"",
    onlineTimeEnd:$('#dateTo').val()||"",
    tagId:$('#labels').val()||"",
    pageSize:100000,
    pageNum:$('#pageNum').val()|| 1
  };
}
function goodLine(goodId,goodName,marketPriceDisplay,lowestPriceDisplay,status,tagName,operator){
  this.goodId = goodId || "";
  this.goodName = goodName || "";
  this.marketPriceDisplay = marketPriceDisplay || "";
  this.lowestPriceDisplay = lowestPriceDisplay || "";
  this.status = function(){
    return status!='0' ? "已上架":"未上架"; 
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
    var str ="",next_status;
    if(status){next_status = 1;}else{next_status=0;}
    str += '<a id="'+ goodId+'" href="#" onClick=\'javascript:pageOperate.showLayer("'+goodId+'",'+next_status +');\'>';
    str += status ? "上架" :"下架" ;
    str += '</a>';
    str += '<a href="./newproduct.html?goodId='+goodId+'" > 编辑</a>';
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
      pageSize = 100000,
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
      //res = mock.getGoodsList;
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
            'info': '',
            'infoEmpty': '没有符合条件的记录',
            'infoFiltered': '',
            'paginate': { "first":  " ", "last": "", "next": "下一页","previous": "上一页"}
           },
           "retrieve":true,
           "paging":   true,
           "ordering": true,
           "info":     true
           
         });
       } else{
          var table=$('#dataTables').dataTable();
          if(table){
            table.fnDestroy();
          }
         alert("系统繁忙");
       }
     }
    
  });
     
 }

function setOptions(list){
  for(var x in list){
    good.queryChildPropByParentId(list[x].propertyId,function(id,name){
      $("#labels").append("<option value="+id+">"+Name+"</option>");
    })
  }
  
}
window.pageOperate={
   showLayer:function(id,status){
      $(".layer-box").show();
      // if(status){
      //    $(".layer-box .onlineTime").show();
      //    $(".layer-box .expiredTime").hide();
      // }else{
      //   $(".layer-box .expiredTime").show();
      //   $(".layer-box .onlineTime").hide();
      // }
      //设置默认值
      $("#goodId").val(id);
      $("#nextState").val(status);
   },
   closeLayer:function(){
    $(".layer-box").hide();
   },
   modifyA_text :function(){
      var elm = $("#"+$("#goodId").val());
      if(elm.html() == '上架'){
        elm.html("下架");
        elm.parent('tr').find("td").get(4).html('已上架');
      }else{
        elm.html("上架");
        elm.parent('tr').find("td").get(4).html('已下架');
      }
      //设置状态值

   },
  shelf:function(){
    var id=$("#goodId").val() ||"";
    var status =$("#nextState").val() || 0;
    var data ={};
    data = {
      goodId:id,"status":status,
      'onlineTime':$("#onlineTime").val(),
      'expiredTime':$("#expiredTime").val()
    };
    // if(status == '1'){
    //   data = {goodId:id,"status":status,'onlineTime':$("#onlineTime").val()};
    // }else{
    //    data = {goodId:id,"status":status,'expiredTime':$("#expiredTime").val()};
    // }
    api.resultFun(
      api.ajaxFun(config.shelf,data),
      function(res){
        if(res.code && res.code=='E000'){
          //成功后修改行属性
          pageOperate.modifyA_text();
          alert("成功");
        }else{
         alert("系统繁忙");
       }
      },
      function(error){
         alert("系统繁忙");
      }
      )
  }
}
})(window,$);
