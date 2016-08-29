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
        dateFrom=$( "#dateFrom" ),
        dateTo=$( "#dateTo" );
        
    var _zi_attribute_id=[];
    $(document).ready(function(){

        //图片预览初始化
        img_preview();

        $('form').parsley().on('field:validated', function() {
            var ok = $('.parsley-error').length === 0;
            //alert(ok);
        })
        .on('form:submit', function() {
            // alert(1);
            //保存按钮事件
            
            var limitNumbers='';
            
            if(limitNumber.val()==""){
                limitNumbers=0;
            }else{
               limitNumbers=limitNumber.val(); 
            }
            
            var data={
                'goodName':goodName.val(),
                'goodTitle':goodTitle.val(),
                'marketPriceDisplay':marketPrice.val(),
                'lowestPriceDisplay':lowestPrice.val(),
                'remainNum':remainNum.val(),
                'merchantId':merchantId.val(),
                'limitNumber':limitNumbers,
                //'tagIds':tagIds.val(),
                'brandId':brandId.val(),
                'beginSellDate':dateFrom.val(),
                'endSellDate':dateFrom.val(),
                'goodDescription':goodDescription.val()
            };

            //校验
            if(validate.fn.nums($('#marketPrice').val(),'市场价格输入有误！') && 
                validate.fn.nums($('#lowestPrice').val(),'抢购价格输入有误！') && 
                validate.fn.regIntegers($('#remainNum').val(),'库存数量输入有误！')){

                if($('#limitNumber').val() !=""){
                    if(!validate.fn.regIntegers($('#limitNumber').val(),'限购输入有误！')){
                        return;
                    }
                }
                //判断是有商品id
                if( goodId == ""){
                    //添加
                    var tagids=chk('.tagId');//主标签
                    var propertyIds=chk('.propertyId');//子属性
                    $.extend(data,{'tagIds':tagids,'propertyIds':propertyIds});
                    good.addGood(data,function(res){
                        goodId = res.data.goodId;
                        alert('添加成功');
                        
                        $('#profile').show();
                        $('#home').hide();
                        $('.nav-tabs li').eq(0).removeClass('active');
                        $('.nav-tabs li').eq(1).addClass('active');

                    },function(res){
                        alert(JSON.stringify(res.data));
                    });
                }else{
                    var tagids=chk('.tagId');//主标签
                    var propertyIds='';
                    if($('.add_attribute').css('display') == 'block'){
                        //$.each(_zi_attribute_id, function(i,val){
                            propertyIds=chk('.propertyId');//子属性
                        //});
                    }if($('.up_attribute').css('display') == 'block'){
                        propertyIds=chk('.propertyIds');//子属性
                    }
                    //alert(propertyIds);
                    $.extend(data,{'goodId':goodId,'tagIds':tagids,'propertyIds':propertyIds});
                    //修改
                    good.update(data,function(res){
                        alert('修改成功');
                    });
                }
            }
            
 
            return false; // Don't submit form for this demo
        });

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
                if($(this)[0].checked){
                    good.queryChildPropByParentId({'propertyParentId':propertyParentId},function(res){
                    var list = res.data.list;
                    var html='';
                    for(var x in list){
                        html+="<p><label>"+list[x].propertyName+"</label><input type='checkbox' data-propertyParentId='"+propertyParentId+"'  value='"+list[x].propertyId+"' class='propertyId'></p>";
                    }
                    $('.prime_zi_attribute').append(html);
                });
                }else{
                    $('.propertyId[data-propertyparentid="'+propertyParentId+'"]').parent().remove();
                }
                
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
                    marketPrice.val(goodDetailList.marketPriceDisplay),
                    lowestPrice.val(goodDetailList.lowestPriceDisplay),
                    remainNum.val(goodDetailList.remainNum),
                    limitNumber.val(goodDetailList.limitNumber),
                    //tagIds.val(goodDetailList.tagIds),
                    goodDescription.val(goodDetailList.goodDescription);
                var goodsPicDownloadInfo=goodDetailList.goodsPicDownloadInfo;
                var goodsPicDownloadInfo_html='';

                //循环读取图片显示
                if(goodsPicDownloadInfo !=""){
                    var list_html='';
                    var main_html='';
                    var detail_html='';
                    var detail_html0='';
                    var detail_html1='';
                    var detail_html2='';
                    var detail_html3='';
                    var detail_html4='';
                    var detail_html5='';
                    var detail_html6='';
                    var detail_html7='';
                    var preview_html='';
                    var listpage_html='';


                    var listtype=[];
                    for(var x in goodsPicDownloadInfo){
                        listtype.push(goodsPicDownloadInfo[x].fileType);
                        if(goodsPicDownloadInfo[x].fileType=='goodslist'){
                            list_html='<p>主图：</p>'+
                            '<div class="file_box">'+
                              '<div>'+
                                '<img id="file_goodslist_img" data-src="holder.js/200x200" class="img-thumbnail" alt="200x200" src="'+goodsPicDownloadInfo[x].fileUrl+'" data-holder-rendered="true" style="width: 200px; height: 200px;">'+
                                '<p align="center" class="addimg-exit-sty"><a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                '<input type="file" name="filename" id="file_goodslist" data-pictureId="'+goodsPicDownloadInfo[x].pictureId+'" data-index="0" data-type="goodslist"  class="ipt_file" />'+
                             ' </div>'+
                            '</div>';

                        }else if(goodsPicDownloadInfo[x].fileType=='goodsmain'){
                            main_html='<p>首页图：</p>'+
                            '<div class="file_box">'+
                              '<div>'+
                                '<img id="file_goodsmain_img" data-src="holder.js/200x200" class="img-thumbnail" alt="200x200" src="'+goodsPicDownloadInfo[x].fileUrl+'" data-holder-rendered="true" style="width: 200px; height: 200px;">'+
                                '<p align="center" class="addimg-exit-sty"><a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                '<input type="file" name="filename" id="file_goodsmain" data-pictureId="'+goodsPicDownloadInfo[x].pictureId+'" data-index="0" data-type="goodsmain"  class="ipt_file" />'+
                             ' </div>'+
                            '</div>';

                        }else if(goodsPicDownloadInfo[x].fileType=="goodsdetail"){
                            if(goodsPicDownloadInfo[x].fileIndex=='0'){
                                detail_html0='<div class="col-xs-6 col-md-3">'+
                                  '<div class="file_box">'+
                                    '<div>'+
                                        '<img id="file_goodsdetail_img" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="'+goodsPicDownloadInfo[x].fileUrl+'" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                        '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                       '<input type="file" name="filename" id="file_goodsdetail" data-pictureId="'+goodsPicDownloadInfo[x].pictureId+'" data-index="0" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                                    '</div>'+
                                  '</div>'+
                                  
                                '</div>';
                            }else if(goodsPicDownloadInfo[x].fileIndex=='1'){
                                detail_html1='<div class="col-xs-6 col-md-3">'+
                                  '<div class="file_box">'+
                                    '<div>'+
                                        '<img id="file_goodsdetail_img1" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="'+goodsPicDownloadInfo[x].fileUrl+'" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                        '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                       '<input type="file" name="filename" id="file_goodsdetail1" data-pictureId="'+goodsPicDownloadInfo[x].pictureId+'" data-index="1" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                                    '</div>'+
                                  '</div>'+
                                  
                                '</div>';

                            }else if(goodsPicDownloadInfo[x].fileIndex=='2'){
                                detail_html2='<div class="col-xs-6 col-md-3">'+
                                  '<div class="file_box">'+
                                    '<div>'+
                                        '<img id="file_goodsdetail_img2" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="'+goodsPicDownloadInfo[x].fileUrl+'" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                        '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                       '<input type="file" name="filename" id="file_goodsdetail2" data-pictureId="'+goodsPicDownloadInfo[x].pictureId+'" data-index="2" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                                    '</div>'+
                                  '</div>'+
                                  
                                '</div>';

                            }else if(goodsPicDownloadInfo[x].fileIndex=='3'){
                                detail_html3='<div class="col-xs-6 col-md-3">'+
                                  '<div class="file_box">'+
                                    '<div>'+
                                        '<img id="file_goodsdetail_img3" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="'+goodsPicDownloadInfo[x].fileUrl+'" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                        '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                       '<input type="file" name="filename" id="file_goodsdetail3" data-pictureId="'+goodsPicDownloadInfo[x].pictureId+'" data-index="3" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                                    '</div>'+
                                  '</div>'+
                                  
                                '</div>';

                            }else if(goodsPicDownloadInfo[x].fileIndex=='4'){
                                detail_html4='<div class="col-xs-6 col-md-3">'+
                                  '<div class="file_box">'+
                                    '<div>'+
                                        '<img id="file_goodsdetail_img4" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="'+goodsPicDownloadInfo[x].fileUrl+'" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                        '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                       '<input type="file" name="filename" id="file_goodsdetail4"  data-pictureId="'+goodsPicDownloadInfo[x].pictureId+'" data-index="4" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                                    '</div>'+
                                  '</div>'+
                                  
                                '</div>';

                            }else if(goodsPicDownloadInfo[x].fileIndex=='5'){
                                detail_html5='<div class="col-xs-6 col-md-3">'+
                                  '<div class="file_box">'+
                                    '<div>'+
                                        '<img id="file_goodsdetail_img5" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="'+goodsPicDownloadInfo[x].fileUrl+'" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                        '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                       '<input type="file" name="filename" id="file_goodsdetail5" data-pictureId="'+goodsPicDownloadInfo[x].pictureId+'" data-index="5" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                                    '</div>'+
                                  '</div>'+
                                  
                                '</div>';

                            }else if(goodsPicDownloadInfo[x].fileIndex=='6'){
                                detail_html6='<div class="col-xs-6 col-md-3">'+
                                  '<div class="file_box">'+
                                    '<div>'+
                                        '<img id="file_goodsdetail_img6" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="'+goodsPicDownloadInfo[x].fileUrl+'" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                        '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                       '<input type="file" name="filename" id="file_goodsdetail6" data-pictureId="'+goodsPicDownloadInfo[x].pictureId+'" data-index="6" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                                    '</div>'+
                                  '</div>'+
                                  
                                '</div>';

                            }else if(goodsPicDownloadInfo[x].fileIndex=='7'){
                                detail_html7='<div class="col-xs-6 col-md-3">'+
                                  '<div class="file_box">'+
                                    '<div>'+
                                        '<img id="file_goodsdetail_img7" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="'+goodsPicDownloadInfo[x].fileUrl+'" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                        '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                       '<input type="file" name="filename" id="file_goodsdetail7" data-pictureId="'+goodsPicDownloadInfo[x].pictureId+'" data-index="7" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                                    '</div>'+
                                  '</div>'+
                                  
                                '</div>';
                            }

                                                       
                        }else if(goodsPicDownloadInfo[x].fileType=="goodspreview"){
                            preview_html='<p>缩略图：</p>'+
                            '<div class="file_box">'+
                              '<div>'+
                                '<img id="file_goodspreview_img" data-src="holder.js/200x200" class="img-thumbnail" alt="200x200" src="'+goodsPicDownloadInfo[x].fileUrl+'" data-holder-rendered="true" style="width: 200px; height: 200px;">'+
                                '<p align="center" class="addimg-exit-sty"><a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                '<input type="file" name="filename" id="file_goodspreview" data-pictureId="'+goodsPicDownloadInfo[x].pictureId+'" data-index="0" data-type="goodspreview"  class="ipt_file" />'+
                             ' </div>'+
                            '</div>';
                        }
                        else if(goodsPicDownloadInfo[x].fileType=="listpage"){
                            listpage_html='<p>列表图：</p>'+
                            '<div class="file_box">'+
                              '<div>'+
                                '<img id="file_listpage_img" data-src="holder.js/200x200" class="img-thumbnail" alt="200x200" src="'+goodsPicDownloadInfo[x].fileUrl+'" data-holder-rendered="true" style="width: 200px; height: 200px;">'+
                                '<p align="center" class="addimg-exit-sty"><a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                '<input type="file" name="filename" id="file_listpage"  data-pictureId="'+goodsPicDownloadInfo[x].pictureId+'" data-index="0" data-type="listpage"  class="ipt_file" />'+
                             ' </div>'+
                            '</div>';
                        }
                    }
                    //alert(goodsPicDownloadInfo_html);
                    if(listtype.indexOf('goodslist') == "-1"){
                        list_html='<p>主图：</p>'+
                            '<div class="file_box">'+
                              '<div>'+
                                '<img id="file_goodslist_img" data-src="holder.js/200x200" class="img-thumbnail" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzIwMHgyMDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTYyNjJkMTk2YyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NjI2MmQxOTZjIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9Ijc0LjA1NDY4NzUiIHk9IjEwNC41Ij4yMDB4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="width: 200px; height: 200px;">'+
                                '<p align="center" class="addimg-exit-sty"><a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                '<input type="file" name="filename" id="file_goodslist" data-index="0" data-type="goodslist"  class="ipt_file" />'+
                             ' </div>'+
                            '</div>';
                    }
                    if(listtype.indexOf('goodsmain') == "-1"){
                        main_html='<p>首页图：</p>'+
                            '<div class="file_box">'+
                              '<div>'+
                                '<img id="file_goodsmain_img" data-src="holder.js/200x200" class="img-thumbnail" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzIwMHgyMDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTYyNjJkMTk2YyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NjI2MmQxOTZjIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9Ijc0LjA1NDY4NzUiIHk9IjEwNC41Ij4yMDB4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="width: 200px; height: 200px;">'+
                                '<p align="center" class="addimg-exit-sty"><a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                '<input type="file" name="filename" id="file_goodsmain" data-index="0" data-type="goodsmain"  class="ipt_file" />'+
                             ' </div>'+
                            '</div>';
                    }
                    if(listtype.indexOf('goodspreview') == "-1"){
                        preview_html='<p>缩略图：</p>'+
                            '<div class="file_box">'+
                              '<div>'+
                                '<img id="file_goodspreview_img" data-src="holder.js/200x200" class="img-thumbnail" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzIwMHgyMDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTYyNjJkMTk2YyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NjI2MmQxOTZjIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9Ijc0LjA1NDY4NzUiIHk9IjEwNC41Ij4yMDB4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="width: 200px; height: 200px;">'+
                                '<p align="center" class="addimg-exit-sty"><a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                '<input type="file" name="filename" id="file_goodspreview"  data-index="0" data-type="goodspreview"  class="ipt_file" />'+
                             ' </div>'+
                            '</div>';
                    }
                    if(listtype.indexOf('listpage') == "-1"){
                        listpage_html='<p>列表图：</p>'+
                            '<div class="file_box">'+
                              '<div>'+
                                '<img id="file_listpage_img" data-src="holder.js/200x200" class="img-thumbnail" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzIwMHgyMDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTYyNjJkMTk2YyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NjI2MmQxOTZjIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9Ijc0LjA1NDY4NzUiIHk9IjEwNC41Ij4yMDB4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="width: 200px; height: 200px;">'+
                                '<p align="center" class="addimg-exit-sty"><a href="javascript:void(0)" class="removefile">删除</a></p>'+
                                '<input type="file" name="filename" id="file_listpage"  data-index="0" data-type="listpage"  class="ipt_file" />'+
                             ' </div>'+
                            '</div>';
                    }
                    if(detail_html0==""){
                        detail_html0='<div class="col-xs-6 col-md-3">'+
                          '<div class="file_box">'+
                            '<div>'+
                                '<img id="file_goodsdetail_img" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQzIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE0MyAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU2MzA0ZTJkZmMgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTYzMDRlMmRmYyI+PHJlY3Qgd2lkdGg9IjE0MyIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI0NS41NTQ2ODc1IiB5PSI5NC41Ij4xNDN4MTgwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                               '<input type="file" name="filename" id="file_goodsdetail" data-index="0" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                            '</div>'+
                          '</div>'+
                        '</div>';
                    }
                    if(detail_html1==""){
                        detail_html1='<div class="col-xs-6 col-md-3">'+
                          '<div class="file_box">'+
                            '<div>'+
                                '<img id="file_goodsdetail_img1" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQzIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE0MyAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU2MzA0ZTJkZmMgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTYzMDRlMmRmYyI+PHJlY3Qgd2lkdGg9IjE0MyIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI0NS41NTQ2ODc1IiB5PSI5NC41Ij4xNDN4MTgwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                               '<input type="file" name="filename" id="file_goodsdetail1" data-index="1" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                            '</div>'+
                          '</div>'+
                        '</div>';
                    }
                    if(detail_html2==""){
                        detail_html2='<div class="col-xs-6 col-md-3">'+
                          '<div class="file_box">'+
                            '<div>'+
                                '<img id="file_goodsdetail_img2" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQzIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE0MyAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU2MzA0ZTJkZmMgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTYzMDRlMmRmYyI+PHJlY3Qgd2lkdGg9IjE0MyIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI0NS41NTQ2ODc1IiB5PSI5NC41Ij4xNDN4MTgwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                               '<input type="file" name="filename" id="file_goodsdetail2" data-index="2" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                            '</div>'+
                          '</div>'+
                        '</div>';
                    }
                    if(detail_html3==""){
                        detail_html3='<div class="col-xs-6 col-md-3">'+
                          '<div class="file_box">'+
                            '<div>'+
                                '<img id="file_goodsdetail_img3" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQzIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE0MyAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU2MzA0ZTJkZmMgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTYzMDRlMmRmYyI+PHJlY3Qgd2lkdGg9IjE0MyIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI0NS41NTQ2ODc1IiB5PSI5NC41Ij4xNDN4MTgwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                               '<input type="file" name="filename" id="file_goodsdetail3" data-index="3" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                            '</div>'+
                          '</div>'+
                        '</div>';
                    }
                    if(detail_html4==""){
                        detail_html4='<div class="col-xs-6 col-md-3">'+
                          '<div class="file_box">'+
                            '<div>'+
                                '<img id="file_goodsdetail_img4" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQzIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE0MyAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU2MzA0ZTJkZmMgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTYzMDRlMmRmYyI+PHJlY3Qgd2lkdGg9IjE0MyIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI0NS41NTQ2ODc1IiB5PSI5NC41Ij4xNDN4MTgwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                               '<input type="file" name="filename" id="file_goodsdetail4" data-index="4" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                            '</div>'+
                          '</div>'+
                        '</div>';
                    }
                    if(detail_html5==""){
                        detail_html5='<div class="col-xs-6 col-md-3">'+
                          '<div class="file_box">'+
                            '<div>'+
                                '<img id="file_goodsdetail_img5" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQzIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE0MyAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU2MzA0ZTJkZmMgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTYzMDRlMmRmYyI+PHJlY3Qgd2lkdGg9IjE0MyIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI0NS41NTQ2ODc1IiB5PSI5NC41Ij4xNDN4MTgwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                               '<input type="file" name="filename" id="file_goodsdetail5" data-index="5" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                            '</div>'+
                          '</div>'+
                        '</div>';
                    }
                    if(detail_html6==""){
                        detail_html6='<div class="col-xs-6 col-md-3">'+
                          '<div class="file_box">'+
                            '<div>'+
                                '<img id="file_goodsdetail_img6" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQzIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE0MyAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU2MzA0ZTJkZmMgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTYzMDRlMmRmYyI+PHJlY3Qgd2lkdGg9IjE0MyIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI0NS41NTQ2ODc1IiB5PSI5NC41Ij4xNDN4MTgwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                               '<input type="file" name="filename" id="file_goodsdetail6" data-index="6" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                            '</div>'+
                          '</div>'+
                        '</div>';
                    }
                    if(detail_html7==""){
                        detail_html7='<div class="col-xs-6 col-md-3">'+
                          '<div class="file_box">'+
                            '<div>'+
                                '<img id="file_goodsdetail_img7" data-src="holder.js/100%x180" class="img-thumbnail" alt="100%x180" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQzIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE0MyAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MTgwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTU2MzA0ZTJkZmMgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTYzMDRlMmRmYyI+PHJlY3Qgd2lkdGg9IjE0MyIgaGVpZ2h0PSIxODAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI0NS41NTQ2ODc1IiB5PSI5NC41Ij4xNDN4MTgwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="height: 180px; width: 100%; display: block;">'+
                                '<p align="center">&nbsp;&nbsp;<a href="javascript:void(0)" class="removefile">删除</a></p>'+
                               '<input type="file" name="filename" id="file_goodsdetail7" data-index="7" data-type="goodsdetail" class="ipt_file goodsdetail_input" />'+
                            '</div>'+
                          '</div>'+
                        '</div>';
                    }
                    detail_html='<p class="mt20">说明图：</p><div class="row">'+detail_html0+detail_html1+detail_html2+detail_html3+detail_html4+detail_html5+detail_html6+detail_html7+'</div>';

                    //console.log(listtype.indexOf('listpage'));
                    goodsPicDownloadInfo_html=list_html+main_html+detail_html+preview_html+listpage_html;
                    $('#profile div.file').html(goodsPicDownloadInfo_html);
                    //图片预览初始化
                    img_preview();
                    $('.removefile').on('click', function(event) {
                        event.preventDefault();
                        /* Act on the event */
                        var file=$(this).parent().next();
                        //console.log(file);
                        file.after(file.clone().val(""));      
                        file.remove(); 
                        $(this).parent().parent().children('img').attr('src',"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzIwMHgyMDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTYyNjJkMTk2YyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NjI2MmQxOTZjIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9Ijc0LjA1NDY4NzUiIHk9IjEwNC41Ij4yMDB4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+");
                        

                        
                        if($(this).parent().next().attr('data-pictureid') !=undefined ){
                            //删除图片
                            good.del_picture({
                                goodsId:goodId,
                                pictureId:$(this).parent().next().attr('data-pictureid')
                            },function(res){
                                alert('删除成功');
                                //alert(1);
                                //图片预览初始化
                                img_preview();
                            },function(res){
                                alert('删除失败');

                            });
                            $(this).parent().parent().children('input').attr('data-pictureId',"");
                        }
                        
                        
                    });
                    

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
                            prime_zi_attribute_html+="<p><label>"+goodPropertyChilds[i].propertyName+"</label><input type='checkbox' data-propertyParentId='"+goodProperties[x].propertyId+"' onclick='return false'  checked='checked'  value='"+goodPropertyChilds[i].propertyId+"' class='propertyId'></p>";
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
                    //alert($(this));
                    if($(this)[0].checked){
                        //获取子属性
                        good.queryChildPropByParentId({'propertyParentId':propertyParentId},function(res){
                            var list = res.data.list;
                            var html='';
                            for(var x in list){
                                html+="<p><label>"+list[x].propertyName+"</label><input type='checkbox' data-propertyParentId='"+propertyParentId+"'  value='"+list[x].propertyId+"' class='propertyIds'></p>";
                            }
                            $('.prime_zi_attributes').append(html);
                        });
                    }else{
                        $('.propertyIds[data-propertyparentid="'+propertyParentId+'"]').parent().remove();
                    }   
                    
                    
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


        
        //上传保存按钮
        $('#imguplad').on('click',function () {
             if( goodId == ""){
                //alert($('#file_goodsmain').val());
                //不为空
                if($('#file_goodslist').val() == "" || $('#file_goodsmain').val() == "" ||  $('#file_goodspreview').val() == "" || $('#file_listpage').val() == ""){
                    var isnull=false;
                    if($('#file_goodsdetail').val() != ""){
                        isnull=true;
                    }
                    if($('#file_goodsdetail1').val() != ""){
                        isnull=true;
                    }
                    if($('#file_goodsdetail2').val() != ""){
                        isnull=true;
                    }
                    if($('#file_goodsdetail3').val() != ""){
                        isnull=true;
                    }
                    if($('#file_goodsdetail4').val() != ""){
                        isnull=true;
                    }
                    if($('#file_goodsdetail5').val() != ""){
                        isnull=true;
                    }
                    if($('#file_goodsdetail6').val() != ""){
                        isnull=true;
                    }
                    if($('#file_goodsdetail7').val() != ""){
                        isnull=true;
                    }
                    if(!isnull){
                        alert('每种图片必须选一张!');
                        return false;
                    }
                    alert('每种图片必须选一张!');
                    return false;
                }else if(goodId==""){
                    alert('goodId不能为空');
                    return false;
                }
                if($('#file_goodslist').val() != ""){
                    //文件上传主图
                    uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodslist').attr('data-index'),
                        type:$('#file_goodslist').attr('data-type'),
                        filename:$('#file_goodslist').val()
                    },'file_goodslist');
                }
                
                if($('#file_goodsmain').val() != ""){
                  //文件上传首页图
                    uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsmain').attr('data-index'),
                        type:$('#file_goodsmain').attr('data-type'),
                        filename:$('#file_goodsmain').val()
                    },'file_goodsmain');  
                }

                if($('#file_goodsdetail').val() != ""){
                    //文件上传主图
                    uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail').attr('data-index'),
                        type:$('#file_goodsdetail').attr('data-type'),
                        filename:$('#file_goodsdetail').val()
                    },'file_goodsdetail');
                }

                if($('#file_goodsdetail1').val() != ""){
                    //文件上传主图
                    uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail1').attr('data-index'),
                        type:$('#file_goodsdetail1').attr('data-type'),
                        filename:$('#file_goodsdetail1').val()
                    },'file_goodsdetail1');
                }
                if($('#file_goodsdetail2').val() != ""){
                    //文件上传主图
                    uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail2').attr('data-index'),
                        type:$('#file_goodsdetail2').attr('data-type'),
                        filename:$('#file_goodsdetail2').val()
                    },'file_goodsdetail2');
                }
                if($('#file_goodsdetail3').val() != ""){
                    //文件上传主图
                    uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail3').attr('data-index'),
                        type:$('#file_goodsdetail3').attr('data-type'),
                        filename:$('#file_goodsdetail3').val()
                    },'file_goodsdetail3');
                }
                if($('#file_goodsdetail4').val() != ""){
                    //文件上传主图
                    uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail4').attr('data-index'),
                        type:$('#file_goodsdetail4').attr('data-type'),
                        filename:$('#file_goodsdetail4').val()
                    },'file_goodsdetail4');
                }
                if($('#file_goodsdetail5').val() != ""){
                    //文件上传主图
                    uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail5').attr('data-index'),
                        type:$('#file_goodsdetail5').attr('data-type'),
                        filename:$('#file_goodsdetail5').val()
                    },'file_goodsdetail5');
                }
                if($('#file_goodsdetail6').val() != ""){
                    //文件上传主图
                    uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail6').attr('data-index'),
                        type:$('#file_goodsdetail6').attr('data-type'),
                        filename:$('#file_goodsdetail6').val()
                    },'file_goodsdetail6');
                }
                if($('#file_goodsdetail7').val() != ""){
                    //文件上传主图
                    uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail7').attr('data-index'),
                        type:$('#file_goodsdetail7').attr('data-type'),
                        filename:$('#file_goodsdetail7').val()
                    },'file_goodsdetail7');
                }
                
                if($('#file_goodspreview').val() != ""){
                    //文件上传主图
                    uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodspreview').attr('data-index'),
                        type:$('#file_goodspreview').attr('data-type'),
                        filename:$('#file_goodspreview').val()
                    },'file_goodspreview');
                }

                if($('#file_listpage').val() != ""){
                   //文件上传主图
                    uploadfile({
                        goodsId:goodId,
                        index:$('#file_listpage').attr('data-index'),
                        type:$('#file_listpage').attr('data-type'),
                        filename:$('#file_listpage').val()
                    },'file_listpage'); 
                }
             }else{
                if(goodId==""){
                    alert('goodId不能为空');
                    return false;
                }
                if($('#file_goodslist').val() != ""){
                    //文件上传主图
                    up_uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodslist').attr('data-index'),
                        type:$('#file_goodslist').attr('data-type'),
                        filename:$('#file_goodslist').val(),
                        pictureId:$('#file_goodslist').attr('data-pictureid')
                    },'file_goodslist');
                }
                
                if($('#file_goodsmain').val() != ""){
                    //alert($('#file_goodsmain').val());
                  //文件上传首页图
                    up_uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsmain').attr('data-index'),
                        type:$('#file_goodsmain').attr('data-type'),
                        filename:$('#file_goodsmain').val(),
                        pictureId:$('#file_goodsmain').attr('data-pictureid')
                    },'file_goodsmain');  
                }

                if($('#file_goodsdetail').val() != ""){
                    //文件上传主图
                    up_uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail').attr('data-index'),
                        type:$('#file_goodsdetail').attr('data-type'),
                        filename:$('#file_goodsdetail').val(),
                        pictureId:$('#file_goodsdetail').attr('data-pictureid')
                    },'file_goodsdetail');
                }

                if($('#file_goodsdetail1').val() != ""){
                    //文件上传主图
                    up_uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail1').attr('data-index'),
                        type:$('#file_goodsdetail1').attr('data-type'),
                        filename:$('#file_goodsdetail1').val(),
                        pictureId:$('#file_goodsdetail1').attr('data-pictureid')
                    },'file_goodsdetail1');
                }
                if($('#file_goodsdetail2').val() != ""){
                    //文件上传主图
                    up_uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail2').attr('data-index'),
                        type:$('#file_goodsdetail2').attr('data-type'),
                        filename:$('#file_goodsdetail2').val(),
                        pictureId:$('#file_goodsdetail2').attr('data-pictureid')
                    },'file_goodsdetail2');
                }
                if($('#file_goodsdetail3').val() != ""){
                    //文件上传主图
                    up_uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail3').attr('data-index'),
                        type:$('#file_goodsdetail3').attr('data-type'),
                        filename:$('#file_goodsdetail3').val(),
                        pictureId:$('#file_goodsdetail3').attr('data-pictureid')
                    },'file_goodsdetail3');
                }
                if($('#file_goodsdetail4').val() != ""){
                    //文件上传主图
                    up_uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail4').attr('data-index'),
                        type:$('#file_goodsdetail4').attr('data-type'),
                        filename:$('#file_goodsdetail4').val(),
                        pictureId:$('#file_goodsdetail4').attr('data-pictureid')
                    },'file_goodsdetail4');
                }
                if($('#file_goodsdetail5').val() != ""){
                    //文件上传主图
                    up_uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail5').attr('data-index'),
                        type:$('#file_goodsdetail5').attr('data-type'),
                        filename:$('#file_goodsdetail5').val(),
                        pictureId:$('#file_goodsdetail5').attr('data-pictureid')
                    },'file_goodsdetail5');
                }
                if($('#file_goodsdetail6').val() != ""){
                    //文件上传主图
                    up_uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail6').attr('data-index'),
                        type:$('#file_goodsdetail6').attr('data-type'),
                        filename:$('#file_goodsdetail6').val(),
                        pictureId:$('#file_goodsdetail6').attr('data-pictureid')
                    },'file_goodsdetail6');
                }
                if($('#file_goodsdetail7').val() != ""){
                    //文件上传主图
                    up_uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodsdetail7').attr('data-index'),
                        type:$('#file_goodsdetail7').attr('data-type'),
                        filename:$('#file_goodsdetail7').val(),
                        pictureId:$('#file_goodsdetail7').attr('data-pictureid')
                    },'file_goodsdetail7');
                }
                
                if($('#file_goodspreview').val() != ""){
                    //文件上传主图
                    up_uploadfile({
                        goodsId:goodId,
                        index:$('#file_goodspreview').attr('data-index'),
                        type:$('#file_goodspreview').attr('data-type'),
                        filename:$('#file_goodspreview').val(),
                        pictureId:$('#file_goodspreview').attr('data-pictureid')
                    },'file_goodspreview');
                }

                if($('#file_listpage').val() != ""){
                   //文件上传主图
                    up_uploadfile({
                        goodsId:goodId,
                        index:$('#file_listpage').attr('data-index'),
                        type:$('#file_listpage').attr('data-type'),
                        filename:$('#file_listpage').val(),
                        pictureId:$('#file_listpage').attr('data-pictureid')
                    },'file_listpage'); 
                }

             }

        });

        //图片删除
        $('.removefile').on('click', function(event) {
            event.preventDefault();
            /* Act on the event */
            var file=$(this).parent().next();
            //console.log(file);
            file.after(file.clone().val(""));      
            file.remove(); 
            $(this).parent().parent().children('img').attr('src',"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzIwMHgyMDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTYyNjJkMTk2YyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NjI2MmQxOTZjIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9Ijc0LjA1NDY4NzUiIHk9IjEwNC41Ij4yMDB4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+")
             //图片预览初始化
            img_preview();
        });
        
        
        //tb切换
        $('.nav-tabs').on('click', 'li', function(event) {
            $('.nav-tabs li').removeClass('active');
            $(this).addClass('active');
            if($(this).attr('data-id')=='home'){
                $('#home').show();
                $('#profile').hide();
            }else if($(this).attr('data-id')=='profile'){
                $('#profile').show();
                $('#home').hide();
            }
        });

        //关闭弹窗
        $(".layer-close").bind("click",function(e){
            $(".layer-box").hide();
        })
        
    });
    

    //图片预览
    function img_preview(){
        $("#file_goodslist").uploadPreview({ Img: "file_goodslist_img" });
        $("#file_goodsmain").uploadPreview({ Img: "file_goodsmain_img" });
        $("#file_goodsdetail").uploadPreview({ Img: "file_goodsdetail_img" });
        $("#file_goodsdetail1").uploadPreview({ Img: "file_goodsdetail_img1" });
        $("#file_goodsdetail2").uploadPreview({ Img: "file_goodsdetail_img2" });
        $("#file_goodsdetail3").uploadPreview({ Img: "file_goodsdetail_img3" });
        $("#file_goodsdetail4").uploadPreview({ Img: "file_goodsdetail_img4" });
        $("#file_goodsdetail5").uploadPreview({ Img: "file_goodsdetail_img5" });
        $("#file_goodsdetail6").uploadPreview({ Img: "file_goodsdetail_img6" });
        $("#file_goodsdetail7").uploadPreview({ Img: "file_goodsdetail_img7" });
        $("#file_goodspreview").uploadPreview({ Img: "file_goodspreview_img" });
        $("#file_listpage").uploadPreview({ Img: "file_listpage_img" });
    }

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

    //图片上传
    function uploadfile(data,id){
        //alert(data.goodsId);
        //alert('type'+data.type);
        $.ajaxFileUpload({
            url : config.im_uploadpicture,
            data: data,
            secureuri : false,
            type : 'POST',
            dataType : 'json',
            fileElementId : id,
            jsonp:'callback',
            success : function(data) {
                if(data.code=="E000"){
                    $('.imgmsg').append('<p>图片添加成功</p>');
                    $('.images-msg').show();
                }
                //alert(data.code);    
            },
            error : function(data) {
                alert('上传失败');
                console.log(data.code);
            }
       });
                
    }


    //图片上传
    function up_uploadfile(data,id){
        //alert(id);
        if(data.pictureId==undefined){
            data.pictureId="";
        }
        //alert(data.goodsId);
        //alert('type'+data.type);
        $.ajaxFileUpload({
            url : config.update_picture,
            data: data,
            secureuri : false,
            type : 'POST',
            dataType : 'json',
            fileElementId : id,
            jsonp:'callback',
            success : function(data) {
                //alert(data.code);
                if(data.code=="E000"){
                    $('.imgmsg').append('<p>图片更新成功</p>');
                    $('.images-msg').show();
                }
            },
            error : function(data) {
                console.log(data.code);
            }
       });
                
    }

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
    //图片预览
    jQuery.fn.extend({
        uploadPreview: function (opts) {
            //console.log(opts);
            var _self = this,
                _this = $(this);
            opts = jQuery.extend({
                Img: "ImgPr",
                Width: 100,
                Height: 100,
                ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
                Callback: function () {}
            }, opts || {});
            _self.getObjectURL = function (file) {
                var url = null;
                if (window.createObjectURL != undefined) {
                    url = window.createObjectURL(file)
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file)
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file)
                }
                return url
            };
            _this.change(function () {
                if (this.value) {
                    if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                        alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
                        this.value = "";
                        return false
                    }
                    if ($.browser.msie) {
                        try {
                            $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]))
                        } catch (e) {
                            var src = "";
                            var obj = $("#" + opts.Img);
                            var div = obj.parent("div")[0];
                            _self.select();
                            if (top != self) {
                                window.parent.document.body.focus()
                            } else {
                                _self.blur()
                            }
                            src = document.selection.createRange().text;
                            document.selection.empty();
                            obj.hide();
                            obj.parent("div").css({
                                'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
                                'width': opts.Width + 'px',
                                'height': opts.Height + 'px'
                            });
                            div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src
                        }
                    } else {
                        $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]))
                    }
                    opts.Callback()
                }
            })
        }
    });

    //数字
    function number(val){
         
    }
})(window,$);

