var common={};
//左边栏配置对象--global 默认
//左边栏菜单

common.modulesList =[
  {
    id:'0',
    name:'广告位管理',
    url:'advert.html',
    isActive:'false'
  },
  {
    id:'1',
    name:'商品管理',
    url:'good.html',
    isActive:'false'
  },
  {
    id:'2',
    name:'商品标签管理',
    url:'label.html',
    isActive:'false'
  },
  {
    id:'3',
    name:'订单管理',
    url:'order.html',
    isActive:'false'
  },
  {
    id:'4',
    name:'供应商管理',
    url:'supplier.html',
    isActive:'false'
  }
];
//设置属性
common.setAttr = function(attr,val,id){
  modulesList = common.modulesList;
  for(var x in modulesList){
    if(id == 'all'){
        modulesList[x][attr] = val ||'';
        continue;
    }
  }
  modulesList[id][attr] = val ||'';
}
//设置active属性
common.setActive = function(id,val){
  modulesList = common.modulesList;
  for(var x in modulesList){
    modulesList[x]['isActive'] = false;
  }
  modulesList[id]['isActive'] = true;
}
//左边菜单
common.getmoduleStr =function(modules){
 modules = modules ||[];
 var modStr = "";
 var i=0,l= modules.length;
 //排序根据id
 modules = modules.sort(function(a,b){
   return (parseInt(a.id) - parseInt(b.id));
 });
 modStr += '<ul class="nav nav-sidebar">';
 for( ; i<l ; i++){
   modStr +=  "<li class =";
   modStr += modules[i].isActive ?'active':'';
   modStr += " ><a href="+modules[i].url+">"+modules[i].name+"</a></li>";
 }
 modStr += '</ul>';
 return modStr;
}

common.appendTo = function(target){
  var str = common.getmoduleStr(common.modulesList);
  target.append(str);
}

//api 模块开始---------
var api={};
api.ajaxFun_noExe = function(url,data){
  return {
    url:url,
    type:'post',
    data: data ||{}
  };
};
api.ajaxFun = function(url,data){
  return $.ajax({
    url:url,
    type:'post',
    dataType:'jsonp',
    jsonp:'callback',
    data: data ||{}
  });
};
api.resultFun = function(promise,successCb,errorCb){
  errorCb = errorCb || function(){
    alert("系统繁忙，请稍后再试!");
  };
  return promise.then(function(res){
    successCb.call(this,res)},errorCb);
};
api.resultCode = function(){
  var code ={
    "E408":	"商品id不存在",
    "E001":	"Inter Error",
    'E705': '上传失败,无法调用影像系统',
    'E9001': '	无效的图片类型',
    'E702': '	上传附件文件名的长度不能超过 128 位',
    'E701': '	上传的附件为空',
    'E851': '	参数不能空',
    'E000': '	Success'
  };
  return function(res,cb){
    if(res.code == 'E000'){
      cb.bind(this,res);
    }else{
      alert(code[res.code]);
    }
  };
};
