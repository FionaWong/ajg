var common={};
//左边栏配置对象--global 默认
//左边栏菜单

common.modulesList =[
  {
    id:'0',
    name:'广告位管理',
    url:'advert.html',
    isActive:false
  },
  {
    id:'1',
    name:'商品管理',
    url:'good.html',
    isActive:true
  },
  {
    id:'2',
    name:'商品标签管理',
    url:'label.html',
    isActive:false
  },
  {
    id:'3',
    name:'订单管理',
    url:'order.html',
    isActive:false
  },
  {
    id:'4',
    name:'供应商管理',
    url:'supplier.html',
    isActive:false
  },
  {
    id:'5',
    name:'优惠券管理',
    url:'supplier.html',
    isActive:false,
    children:[
      {
        id:'0',
        name:'成券管理',
        url:'supplier.html',
        isActive:false
      },
      {
        id:'1',
        name:'分发管理',
        url:'supplier.html',
        isActive:false
      },
      {
        id:'2',
        name:'消息管理',
        url:'supplier.html',
        isActive:false
      },
      {
        id:'3',
        name:'统计管理',
        url:'supplier.html',
        isActive:false
      }
    ]
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
};
//设置active属性
/* id format 5_1 */
common.setActive = function(id,val){
  modulesList = common.modulesList;
  for(var x in modulesList){
    modulesList[x].isActive = false;
  }
  var ids = id.split('_');

  modulesList[ids[0]].isActive = true;
  var module = modulesList[ids[0]];
  if(ids.length > 1){
    for(var i=0,l=ids.length;i<l;i++){
      if(ids[i+1]){
        module.children[ids[i+1]].isActive = true;
        module = module.children[ids[i+1]];
      }
    }
  }

};
//左边菜单
common.getmoduleStr =function(modules){
 modules = modules ||[];
 var modStr = "";
 var i=0,l= modules.length;
 var sort = function(modules){
   return modules.sort(function(a,b){
     return (parseInt(a.id) - parseInt(b.id));
   });
 },
 mainMenu = function(module){
   var modStr = "";
   modStr +=  "<li class =";
   modStr += module.isActive ?'active':'';
   modStr += " ><a href="+module.url+">"+module.name+"</a>";
   if(module.children && module.children.length >0 ){
     modStr += "<div>";
     modStr += forElm("",module.children,true);
     modStr += "</div>";
   }
   modStr +="</li>";
   return modStr;
 },
 subMenu = function(module){
   var modStr = "";
   modStr += "<a href='"+module.url+"' class='";
   modStr += module.isActive ? 'active' : '';
   modStr += "'>" +module.name+"</a>";
   return modStr;
 },
 forElm = function(str,modules,isSub){
   str = str || "";
   for(var x in modules){
     if(isSub) str += subMenu(modules[x]);
     else str += mainMenu(modules[x]);
   }
   return str;
 };
 //排序根据id
 modules = sort(modules);
 modStr += '<ul class="nav nav-sidebar">';
 modStr += forElm('',modules,false);
 modStr += '</ul>';
 return modStr;
};

common.appendTo = function(target){
  var str = common.getmoduleStr(common.modulesList);
  target.append(str);
};

/*login*/
/*common.loginTarget = $(".layer-login");
common.openlogin = function(target){
  var loginHtml = function(){
    return (
      '<div class="layer-bg_login"></div>'+

      '<div class="login content ng-scope">'+
      '<a href="javascript:void(0);" class="layer_login-close">&times;</a>'+
      '<form >'+
        '<fieldset class="question">'+
          '<legend>安金购后台管理登录</legend>'+
          '<div class="row">'+
            '<div class="col-md-2 labletitle"><label>用户名:</label></div>'+
            '<div class="col-md-10">'+
              '<input type="text" maxlength="50" class="form-control login_username">'+
            '</div>'+
          '</div>'+
          '<div class="row">'+
            '<div class="col-md-2 labletitle"><label>密码:</label></div>'+
            '<div class="col-md-10">'+
              '<input type="password" maxlength="100" class="form-control login_password">'+
            '</div>'+
          '</div>'+
          '<p ng-bind="errmessage" class="ng-binding"></p>'+
          '<div class="row">'+
            '<div class="col-md-12 text-center" style="line-height: 50px">'+
              '<button class="btn btn-sm" onClick="common.login()">登录</button>'+
            '</div>'+
          '</div>'+
        '</fieldset>'+
      '</form>'+
  '</div>');
  };

  target.find(".login").length>0 ? target.show() :
  (function(){
    target.append(loginHtml());
    target.show();
  } )();
}
common.closeLogin= function(target){
  target.hide();
}
common.login = function(){
    $.ajax({
        type: "get",
        url: config.login,
        dataType: "jsonp",
        data:{
          username:$('.login .login_username').val(),
          password: $('.login .login_password').val()
        } ,
        success: function(res) {
            if("E000" == res.code){

              common.closeLogin(common.loginTarget);
              return ;
            }
            else if("E210" == res.code) {
              alert("用户名密码有误");
              return ;
            }
            else {
              alert("系统繁忙，请稍后再试");
              return ;
            }

        },
        error: function(err) {
           alert("系统繁忙，请稍后再试");
              return ;
        }
    })
}
*/
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
  return function(res,cb,error_cb){
    if(!res){alert("系统数据返回错误，请稍后重试");return false;}
    //res.code="E254";
    if(res && res.code == 'E000'){
      cb.call(this,res);
    }else if(res.code == 'E254' || res.code == 'E253' ){
      //登陆
      common.openlogin(common.loginTarget);
    }else{
      error_cb.call(this,res);
      //alert(res.message);
    }
  };
};
