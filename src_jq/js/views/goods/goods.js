(function(window,$){
  $(document).ready(function(){
    var moduleId = '1';
    //左菜单设置
    common.setActive(moduleId,true);
    common.appendTo($('.sidebar'));

   
    pageOperate.getTable(config.getGoodsList);
    $("#search").bind("click",function(e){
      pageOperate.getTable(config.getGoodsList);
    })
    //get all main tags
    good.queryAllMainTags(function(res){
      var list = res.data.list;
      for(var x in list){
        $("#labels").append("<option value="+list[x].id+">"+list[x].name+"</option>");
      }
    });

    $( "#dateFrom" ).datepicker({

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
		 $( "#dateTo" ).datepicker({

		      showOtherMonths: true,
		    	selectOtherMonths: true,
          showSecond: true,
          //timeFormat:'hh:mm:ss',
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
          timeFormat:'hh:mm:ss',
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
          timeFormat:'hh:mm:ss',
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
  var dateFrom = $('#dateFrom').val();
  dateFrom = dateFrom ? dateFrom+" 00:00:00" :"";
  var dateTo = $('#dateTo').val();
  dateTo = dateTo ? dateTo+" 00:00:00" :"";
  return {
    goodId:$('#id').val()||"",
    goodName:$('#name').val()||"",
    status:$('#status').val()||"",
    onlineTimeBegin: dateFrom,
    onlineTimeEnd:dateTo,
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
    // if(!tagName){return "";}
    // var _tag = "";
    // for(var x in tagName){
    //   _tag += tagName[x]+","; 
    // }
    // return _tag.substring(0,_tag.length);
    return tagName||"";
  };
  this.operator = function(){
    var str ="",next_status;
    if(status){next_status = 1;}else{next_status=0;}
    str += '<a id="'+ goodId+'" href="#" onClick=\'javascript:pageOperate.showLayer("'+goodId+'",'+next_status +');\'>';
    str += status=='0' ? "上架" :"下架" ;
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



window.pageOperate={
  getTable:function (url) {
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
        api.resultCode()(
          res,function(){
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
          function(){
            var table=$('#dataTables').dataTable();
                if(table){
                  table.fnDestroy();
                }
               alert("系统繁忙");
          }
        )
      }
    });
       
   },
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
        elm.parents('tr').find("td").get(4).innerHTML = '已上架';
      }else{
        elm.html("上架");
        elm.parents('tr').find("td").get(4).innerHTML = '已下架';
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
    good.shelf(
      function(){
        alert("操作成功");
        //关闭
        pageOperate.closeLayer();
        pageOperate.getTable(config.getGoodsList);
      }
    );
    
  }
}
})(window,$);
