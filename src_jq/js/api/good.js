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
good.addGood= function(data,successCb,errorCb){
  api.resultFun(
    //发送请求
    api.ajaxFun(config.addGood,data),
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
//修改商品
good.update= function(data,successCb,errorCb){
  api.resultFun(
    //发送请求
    api.ajaxFun(config.update,data),
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

//商品详情
good.getGoodDetail= function(data,successCb,errorCb){
  api.resultFun(
    //发送请求
    api.ajaxFun(config.getGoodDetail,data),
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

//拿到主属性
good.queryAllParentProp= function(successCb,errorCb){
  api.resultFun(
    //发送请求
    api.ajaxFun(config.queryAllParentProp,{}),
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
//拿到子属性
good.queryChildPropByParentId = function(data,successCb,errorCb){
  api.resultFun(
    //发送请求
    api.ajaxFun(config.queryChildPropByParentId,data),
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
good.listSupplier = function(data,successCb,errorCb){
  api.resultFun(
  //发送请求
    api.ajaxFun(config.listSupplier,{}),
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
}

//拿到商品品牌
good.queryAllBrandInfo =function(successCb,errorCb){
  api.resultFun(
  //发送请求
    api.ajaxFun(config.queryAllBrandInfo,{}),
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
}

//上传图片
good.im_uploadpicture =function(data,successCb,errorCb){
    api.resultFun(
        //发送请求
        api.ajaxFun(config.im_uploadpicture,data),
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
}
