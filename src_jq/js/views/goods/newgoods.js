(function(window,$){
var goodName=$('#goodName'),
    goodTitle=$('#goodTitle'),
    marketPrice=$('#marketPrice'),
    lowestPrice=$('#lowestPrice'),
    remainNum=$('#remainNum'),
    merchantId=$('#pages'),
    limitNumber=$('#limitNumber'),
    brandId=$('#brandId'),
    goodDescription=$('#goodDescription'),
    goodID="";//添加成功后保存goodID
    var _zi_attribute_id=[];
  $(document).ready(function(){
    var moduleId = '1';
    //左菜单设置
    common.setActive(moduleId,true);
    common.appendTo($('.sidebar'));

    
    //拿到地址栏的goodId
    var goodId=urlPara('goodId=');

    //判断是有商品id
    if( goodId == ""){
        //获取主标签
        good.queryAllMainTags(function(res){
            var list=res.data.list;
            var html='';
            for(var x in list){
                html+="<p><label>"+list[x].name+"</label><input class='tagId' type='checkbox' value='"+list[x].id+"' ></p>";
                //tagIds.append("<option value="+list[x].id+">"+list[x].name+"</option>");
            }
            //alert(html);
            $('.goodtag').html(html);
        });

        //获取供应商
        good.listSupplier({pageSize:'100000',pageNum:'1'},function(res){
            var list = res.data;
            for(var x in list){
                merchantId.append("<option value="+list[x].merchantId+">"+list[x].merchantName+"</option>");
            }
        });

        //获取商品名牌
        good.queryAllBrandInfo(function(res){
            var list = res.data.list;
            for(var x in list){
                brandId.append("<option value="+list[x].id+">"+list[x].brandName+"</option>");
            }
        });

        //获取主属性
        good.queryAllParentProp(function(res){
            var list = res.data.list;
            var html='';
            for(var x in list){
                html+="<p><label>"+list[x].propertyName+"</label><input type='checkbox' value='"+list[x].propertyId+"' class='checkbox'></p>";
            }
            $('.prime_attribute').html(html);
        });

        //点击主属性查询子属性
        $('.prime_attribute').on('click','input', function(event) {
            var propertyParentId=$(this).val();
            //获取子属性
            good.queryChildPropByParentId({'propertyParentId':propertyParentId},function(res){
                var list = res.data.list;
                var html='';
                for(var x in list){
                    html+="<p><label>"+list[x].propertyName+"</label><input type='checkbox'  value='"+list[x].propertyId+"' class='propertyId'></p>";
                }
                $('.prime_zi_attribute').append(html);
            });
        });

        

    }else{
        $('.update_attribute').css('display','inline-block').css('width','auto');
        var data={
            'goodId' : goodId 
        };
        //获取商品详情
        good.getGoodDetail(data,function(res){
            var goodDetailList = res.data.goodNewInfo;
            goodName.val(goodDetailList.goodName),
            goodTitle.val(goodDetailList.goodTitle),
            marketPrice.val(goodDetailList.marketPrice),
            lowestPrice.val(goodDetailList.lowestPrice),
            remainNum.val(goodDetailList.remainNum),
            limitNumber.val(goodDetailList.limitNumber),
            //tagIds.val(goodDetailList.tagIds),
            goodDescription.val(goodDetailList.goodDescription);
            var goodsPicDownloadInfo=goodDetailList.goodsPicDownloadInfo;
            var goodsPicDownloadInfo_html='';

            //循环读取图片显示
            if(goodsPicDownloadInfo!=""){
                for(var x in goodsPicDownloadInfo){
                    if(goodsPicDownloadInfo[x].fileType=='goodsdetail'){
                        goodsPicDownloadInfo_html+="<p>添加主图：</p>"+
                            "<div>"+
                            "<img data-src='holder.js/200x200' class='img-thumbnail' alt='200x200' src='"+goodsPicDownloadInfo[x].fileUrl+"' data-holder-rendered='true' style='width: 200px; height: 200px;'>"+
                            "<p align='center' class='addimg-exit-sty'><a href='javascript:void(0)''>修改</a><a href='javascript:void(0)'>删除</a></p>"+
                            "</div>";

                    }else if(goodsPicDownloadInfo[x].fileType=="goodslist"){

                    }else if(goodsPicDownloadInfo[x].fileType=="goodspreview"){

                    }
                }
                alert(goodsPicDownloadInfo_html);
                $('#profile').html(goodsPicDownloadInfo_html);
            }

            //获取主标签
            good.queryAllMainTags(function(res){
                var list=res.data.list;
                var tgs=[];
                if(goodDetailList.tagId != null && goodDetailList.tagId !=""){
                   tgs=goodDetailList.tagId.split(',');  
                }
                
                var html='';
                for(var x in list){
                    if(tgs.indexOf(list[x].id) > -1){
                       html+="<p><label>"+list[x].name+"</label><input  checked='checked'  class='tagId' type='checkbox' value='"+list[x].id+"' ></p>";
                    }else{
                        html+="<p><label>"+list[x].name+"</label><input class='tagId' type='checkbox' value='"+list[x].id+"' ></p>";
                    }
                    $('.goodtag').html(html);
                }
            });

            //获取供应商
            good.listSupplier({pageSize:'100000',pageNum:'1'},function(res){
                var list = res.data;
                for(var x in list){
                    if(list[x].merchantId == goodDetailList.merchantId){
                        //alert(1);
                        merchantId.append("<option selected value="+list[x].merchantId+">"+list[x].merchantName+"</option>");
                    }else{
                        merchantId.append("<option value="+list[x].merchantId+">"+list[x].merchantName+"</option>");
                    }  
                }
            });

            //获取商品名牌
            good.queryAllBrandInfo(function(res){
                var list = res.data.list;
                for(var x in list){
                    if(list[x].id ==goodDetailList.brandId){
                        brandId.append("<option selected value="+list[x].id+">"+list[x].brandName+"</option>");
                    }else{
                        brandId.append("<option value="+list[x].id+">"+list[x].brandName+"</option>");
                    }
                   
                }
            });



            //主属性赋值
            var goodProperties=goodDetailList.goodProperties;
            if(goodProperties != "" || goodProperties != null){
                var prime_attribute_html="";
                var prime_zi_attribute_html='';
                for(var x in goodProperties){
                    prime_attribute_html+="<p><label>"+goodProperties[x].propertyName+"</label><input type='checkbox' onclick='return false'  checked='checked'   value='"+goodProperties[x].propertyId+"' class='checkbox'></p>";
                    var goodPropertyChilds=goodProperties[x].goodPropertyChilds;
                    for(var i in goodPropertyChilds){
                        _zi_attribute_id.push(goodPropertyChilds[i].propertyParentId);
                        prime_zi_attribute_html+="<p><label>"+goodPropertyChilds[i].propertyName+"</label><input type='checkbox' onclick='return false'  checked='checked'  value='"+goodPropertyChilds[i].propertyParentId+"' class='checkbox'></p>";
                    }
                }
                //alert(prime_attribute_html);
                $('.prime_attribute').html(prime_attribute_html);
                $('.prime_zi_attribute').html(prime_zi_attribute_html);
            }


            //获取主属性
            good.queryAllParentProp(function(res){
                var list = res.data.list;
                var html='';
                for(var x in list){
                    html+="<p><label>"+list[x].propertyName+"</label><input type='checkbox' value='"+list[x].propertyId+"' class='checkbox'></p>";
                }
                $('.prime_attributes').html(html);
            });

            //点击主属性查询子属性
            $('.prime_attributes').on('click','input', function(event) {
                var propertyParentId=$(this).val();
                //获取子属性
                good.queryChildPropByParentId({'propertyParentId':propertyParentId},function(res){
                    var list = res.data.list;
                    var html='';
                    for(var x in list){
                        html+="<p><label>"+list[x].propertyName+"</label><input type='checkbox' value='"+list[x].propertyId+"' class='propertyIds'></p>";
                    }
                    $('.prime_zi_attributes').append(html);
                });
            });
        });


        //详情的时候点击修改属性
        $('.update_attribute').on('click',function () {
            $('.add_attribute').hide();
            $('.up_attribute').show();
        })
        //详情的时候点击返回
        $('.ad_attribute').on('click',function () {
            $('.add_attribute').show();
            $('.up_attribute').hide();
        })
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
            'limitNumber':limitNumber.val(),
            //'tagIds':tagIds.val(),
            'brandId':brandId.val(),
            'beginSellDate':"",
            'endSellDate':"",
            'goodDescription':goodDescription.val()
        };
        
         //判断是有商品id
        if( goodId == ""){
            //添加
            var tagids=chk('.tagId');//主标签
            var propertyIds=chk('.propertyId');//子属性

            $.extend(data,{'tagIds':tagids,'propertyIds':propertyIds});
            good.addGood(data,function(res){
                goodID = res.data.goodId;
                alert('添加成功');
            });
        }else{
            var tagids=chk('.tagId');//主标签
            var propertyIds='';
            if($('.add_attribute').css('display') == 'block'){
                $.each(_zi_attribute_id, function(i,val){
                    propertyIds+=val+',';
                });
            }if($('.up_attribute').css('display') == 'block'){
                propertyIds=chk('.propertyIds');//子属性
            }
            alert(propertyIds);
            $.extend(data,{'goodId':goodId,'tagIds':tagids,'propertyIds':propertyIds});
            //修改
            good.update(data,function(res){
                alert('修改成功');
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

//获取ckb的值
function chk(name){ 
    var obj=$(name);
    check_val = '';
    for(k in obj){
        if(obj[k].checked)
            check_val+=obj[k].value+',';
    }
    return check_val;
} 

})(window,$);
