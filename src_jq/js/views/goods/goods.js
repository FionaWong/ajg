(function(window,$){
  $(document).ready(function(){
    var moduleId = '2';
    //左菜单设置
    common.setActive(moduleId,true);
    common.appendTo($('.sidebar'));


    //取
    //取所有数据
    //good.getGoodsList(url,data,cb);

    //data数据处理

    //列宽处理
    var table_w = 1000;
    var aoColumns = [
      {'sWidth':1.25*table_w},
      {'sWidth':1.25*table_w},
      {'sWidth':1.25*table_w},
      {'sWidth':1.25*table_w},
      {'sWidth':1.25*table_w},
      {'sWidth':1.25*table_w},
      {'sWidth':1.25*table_w},
      {'sWidth':1.25*table_w}
    ];
    var data =getQueryParam();
    $("#datable").dataTable({
      ajax:api.ajaxFun_noExe(config.getGoodsList,data),
      "columns": [
            { "data": "" },
            { "data": "tagId" },
            { "data": "tagName" },
            { "data": "marketPrice" },
            { "data": "lowestPrice" },
            { "data": "status" },
            { "data": "mainTags" },
            { "data": "" }
        ],
      'aaSorting':[[1,'asc']],
      'aaData':data,
      'sPaginationType':'commonStandard',
      'bPaginate':true,
      'aoColumns':aoColumns,
      'bProcessing':true,
      "serverSide": true
    });

    //取标签数据
    childPropArray.forEach(function(e,i){
      $("#labels").append("<option value="+e.id+">"+e.name+"</option>");
    })
});
function getQueryParam(){
  return {
    goodId:$('good').val()||"",
    goodName:$('name').val()||"",
    status:$('status').val()||"",
    onlineTimeBegin:$('dateFrom').val()||""
    onlineTimeEnd:$('dateTo').val()||""
    tagId:('status').val()||""
  };
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
      var obj = new childPropObj(res.data.list.propertyId,res.data.list.propertyName);
      childPropArray.push(obj);
    } else{
      alert("系统繁忙");
    }
  }
}


})(window,$);
