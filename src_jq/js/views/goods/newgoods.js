(function(window,$){
var goodName=$('#goodName'),
    goodTitle=$('#goodTitle'),
    marketPrice=$('#marketPrice'),
    lowestPrice=$('#lowestPrice'),
    remainNum=$('#remainNum'),
    merchantId=$('#pages'),
    limitNumber=$('#limitNumber '),
    tagIds=$('#labels'),
    brandId=$('#brandId'),
    beginSellDate="",
    endSellDate="",
    goodDescription=$('#goodDescription'),
    propertyIds='';

  $(document).ready(function(){
    var moduleId = '1';
    //左菜单设置
    common.setActive(moduleId,true);
    common.appendTo($('.sidebar'));

    

    var goodId=urlPara('goodId=');

    //判断是有商品id
    if( goodId == ""){
        //获取主标签
        good.queryAllMainTags(function(list){
          for(var x in list){
            tagIds.append("<option value="+list[x].id+">"+list[x].name+"</option>");
          }
        });

        //获取供应商
        good.listSupplier({pageSize:'100000',pageNum:'1'},function(list){
            for(var x in list){
                merchantId.append("<option value="+list[x].merchantId+">"+list[x].merchantName+"</option>");
            }
        });

        //获取商品名牌
        good.queryAllBrandInfo(function(list){
            for(var x in list){
                brandId.append("<option value="+list[x].id+">"+list[x].brandName+"</option>");
            }
        });
    }else{
        var data={
            'goodId' : goodId 
        };
        //获取商品详情
        good.getGoodDetail(data,function(list){

            goodName.val(list.goodName),
            goodTitle.val(list.goodTitle),
            marketPrice.val(list.marketPrice),
            lowestPrice.val(list.lowestPrice),
            remainNum.val(list.remainNum),
            limitNumber.val(list.limitNumber),
            tagIds.val(list.tagIds),
            //brandId.val(list.brandId),
            // beginSellDate.val(list.beginSellDate),
            // endSellDate.val(list.endSellDate),
            goodDescription.val(list.goodDescription);
            //propertyIds.val(list.propertyIds);


            //获取主标签
            good.queryAllMainTags(function(list){
              for(var x in list){
                tagIds.append("<option value="+list[x].id+">"+list[x].name+"</option>");
              }
            });

            //获取供应商
            good.listSupplier({pageSize:'100000',pageNum:'1'},function(list){
                for(var x in list){
                    if(list[x].merchantId == list.goodNmerchantIdame){
                        alert(1);
                        merchantId.append("<option selected value="+list[x].merchantId+">"+list[x].merchantName+"</option>");
                    }else{
                        merchantId.append("<option value="+list[x].merchantId+">"+list[x].merchantName+"</option>");
                    }
                    
                }
            });

            //获取商品名牌
            good.queryAllBrandInfo(function(list){
                for(var x in list){
                    if(list[x].id ==list.brandId){
                        brandId.append("<option selected value="+list[x].id+">"+list[x].brandName+"</option>");
                    }else{
                        brandId.append("<option value="+list[x].id+">"+list[x].brandName+"</option>");
                    }
                   
                }
            });
        });


    }


    //保存按钮事件
    $('#addgood').on('click',function(){
        var data={
            'goodName':goodName.val(),
            'goodTitle':goodTitle.val(),
            'marketPrice':marketPrice.val(),
            'lowestPrice':lowestPrice.val(),
            'remainNum':remainNum.val(),
            'merchantId':merchantId.val(),
            'limitNumber ':limitNumber.val(),
            'tagIds':tagIds.val(),
            'brandId':brandId.val(),
            'beginSellDate':"",
            'endSellDate':"",
            'goodDescription':goodDescription.val(),
            'propertyIds':''
        };
         //判断是有商品id
        if( goodId == ""){
            //添加
            good.addGood(data,function(list){
                alert(list);
            });
        }else{
            //修改
            good.update(data,function(list){
                alert(list);
            });
        }
        
    });
  });

//获取参数
function urlPara(v){
    var url = window.location.search;
    if (url.indexOf(v) != -1){
        var start = url.indexOf(v)+v.length,
            end = url.indexOf('&',start) == -1 ? url.length : url.indexOf('&',start);
        return url.substring(start,end);
    } else {
        return '';
    }
};

})(window,$);
