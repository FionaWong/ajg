//商品管理模块
var good={};
//所有商品列表
good.getGoodsList = function(){
    resultFun(ajaxFun(url,data),function(res){
      resultCode()(res,function(){//callback

      });
    });

};
//添加商品
good.addGood= function(data,cb){
  api.resultFun(
    api.ajaxFun(config.addGood,data),
    function(res){
      if(res.code && res.code=='E000'){
        var list = res.data.list;
        cb(list);
      } else{
        alert("系统繁忙");
      }
    }
  );
};
//修改商品
good.update= function(data,cb){
  api.resultFun(
    api.ajaxFun(config.update,data),
    function(res){
      if(res.code && res.code=='E000'){
        var list = res.data;
        cb(list);
      } else{
        alert("系统繁忙");
      }
    }
  );
};

//商品详情
good.getGoodDetail= function(data,cb){
  api.resultFun(
    api.ajaxFun(config.getGoodDetail,data),
    function(res){
      if(res.code && res.code=='E000'){
        var list = res.data.goodNewInfo;
        cb(list);
      } else{
        alert("系统繁忙");
      }
    }
  );
};

//商品上下架
good.shelf = function(data,successCb,errorCb){
  api.resultFun(
    //发送请求
    api.ajaxFun(config.shelf,data),
    //200 成功响应
    function(res){
      api.resultCode(res)(
        res,
        //code :E000 正常回调
        successCb,
        //code :非E000 回调
        errorCb || function(){
          alert("系统繁忙");
        }
      );

    },
    //request error
    function(error){
       alert("系统繁忙");
    }
  )
};

good.queryAllParentProp= function(cb){
  api.resultFun(
    api.ajaxFun(config.queryAllParentProp,{}),
    function(res){
      if(res.code && res.code=='E000'){
        var list = res.data.list;
        cb(list);
        // for(var x in list){
        //   good.queryChildPropByParentId(list[x]['propertyParentId'],cb);
        // }
      } else{
        alert(res.message ||"系统繁忙");
      }
    }
  );
};

good.queryChildPropByParentId = function(parentId,cb){
  api.ajaxFun(config.queryChildPropByParentId,parentId),
    function(res){
    if(res.code && res.code=='E000'){
      cb.call(this,res);

    } else{
      alert("系统繁忙");
    }
  }
};

//拿到所有标签信息
good.queryAllMainTags = function(cb,errorCb){
  api.resultFun(
  //发送请求
    api.ajaxFun(config.queryAllMainTags,{}),
    //200 成功响应
    function(res){
      api.resultCode(res)(
        res,
        //code :E000 正常回调
        cb,
        //code :非E000 回调
        errorCb || function(){
          alert("系统繁忙");
        }
      );

    },
    //request error
    function(error){
       alert("系统繁忙");
    }
  )

};


//拿到所有供应商
good.listSupplier = function(data,cb){
  api.resultFun(
    api.ajaxFun(config.listSupplier,data),
    function(res){
      if(res.code && res.code=='E000'){
        var list = res.data;
        cb(list);
      } else{
        alert("系统繁忙");
      }
    }
  );
}

//拿到商品品牌
good.queryAllBrandInfo =function(cb){
  api.resultFun(
    api.ajaxFun(config.queryAllBrandInfo,{}),
    function(res){
      if(res.code && res.code=='E000'){
        var list = res.data.list;
        cb(list);
      } else{
        alert("系统繁忙");
      }
    }
  );
}
