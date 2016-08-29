//主标签
var mainLabel ={};
mainLabel.list = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.mainList,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
}
mainLabel.create = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.mainCreate,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
}
mainLabel.update = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.mainUpdate,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
}
mainLabel.detail = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.mainDetail,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
}

//限时限量
var limitLabel ={};
limitLabel.list = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.limitList,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
}
limitLabel.insert= function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.limitInsert,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
}
limitLabel.update= function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.limitUpdate,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
}
limitLabel.limitDetail= function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.limitDetail,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
}

//品牌
var brandLabel ={};
brandLabel.getGoodBrandList = function(data,successCb,errorCb) {
	// body...
	api.resultFun(
	    api.ajaxFun(config.getGoodBrandList,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
};
brandLabel.insert = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.insertBrand,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
};
brandLabel.update = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.updateBrand,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
};
brandLabel.remove = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.removeBrand,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
};
brandLabel.detailBrand = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.detailBrand,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
};

//删除图片
brandLabel.del_img =function(data,successCb,errorCb){
    api.resultFun(
        //发送请求
        api.ajaxFun(config.removeImage,data),
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


//属性
var property={};

property.propertylist = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.propertylist,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
};

property.addProperty = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.addProperty,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
};
property.updateProperty = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.updateProperty,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
};
property.shelfProperty = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.shelfProperty,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
};