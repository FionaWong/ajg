(function(window,$){
	var brandId="";
	var mainList = function(){
		mainLabel.list(
			{
				id : "",
				name:'',
				mark :'',
				pageSize:100,
				pageNum	:1
			},
			function(res){
				maindataTable($("#mainTable"),res.data.list);
			}
		);
	},
	mainAdd = function(){
		mainLabel.create(
			{
				name:$("#mainTag").val(),
				mark:""
			},
			function(res){
				alert("添加成功");
				mainList();
			}
		);
	},
	maindataTable = function(elem,data){
		var table=elem.dataTable();
	      if(table){
	        table.fnDestroy();
	      }
		elem.dataTable({
          "data": data,
          "columns":[
          	{"data":"id"},
            {"data":"name"}
          ],
          "aoColumnDefs":[
            {"sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[],
        	}
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
	limitList = function(){
		limitLabel.list(
			{
				goodId : $("#limitId").val() || "",
				limitType:$("#limitState").val() || "",
				beginTime :formateDates($("#limitTimeFrom").val(),2),
				endTime :formateDates($("#limitTimeTo").val(),3),
				beginLimitNumber :$("#limitAmount1").val() || 0,
				endLimitNumber :$("#limitAmount").val() || 0,
				pageSize:100,
				pageNum	:1
			},
			function(res){
				limitdataTable($("#limitTable"),getLimitData(res.data.list));
			}
		);
	},
	getLimitData = function(list){
		var objArray = [];
		for(var x in list){
			var obj = list[x];
			//console.log(list[x].limitType);
			obj.type = function(){
				if(list[x].limitType == '1'){
					return "限时抢购";
				}else if(list[x].limitType == '2'){
					return "限量抢购";
				}else{
					return "未选中";
				}
			}
			obj.operate="<a href='javascript:;' onClick='javascript:openDialog(\""+list[x].goodId+"\");'>修改</a>";
			objArray.push(obj);
		}
		return objArray;
	},
	limitInsert = function(){
		limitLabel.insert(
			{
				idRygGoodLimitTag : $("#idRygGoodLimitTag_d").val() || "",
				limitType:$("#limitType_d").val() || "",
				goodId:$("#goodId_d").val() || "",
				//limitTagOrderNumber:$("#limitTagOrderNumber_d").val(),
				remainLimitNumber:$("#remainLimitNumber_d").val() || "",
				limitSort:$("#limitSort_d").val() || "",
				beginTime :formateDate($("#beginTime_d").val()),
				endTime :formateDate($("#endTime_d").val(),1),
				limitNumber :$("#limitNumber_d").val() || ""
				// updatedBy :$("#updatedBy_d").val() || "",
				// createdBy:$("#createdBy_d").val() || "",
				// mark	:$("#mark_d").val() || ""
			},
			function(res){
				console.log(res);
				alert('添加成功');
				location.reload();
			}
		);
	},
	limitUpdate = function(){
		limitLabel.update(
			{		
				idRygGoodLimitTag : $("#idRygGoodLimitTag_d").val() || "",
				limitType:$("#limitType_d").val() || "",
				goodId:$("#goodId_d").val() || "",
				//limitTagOrderNumber:$("#limitTagOrderNumber_d").val(),
				remainLimitNumber:$("#remainLimitNumber_d").val() || "",
				limitSort:$("#limitSort_d").val() || "",
				beginTime :formateDate($("#beginTime_d").val()),
				endTime :formateDate($("#endTime_d").val(),1),
				limitNumber :$("#limitNumber_d").val() || ""
				// updatedBy :$("#updatedBy_d").val() || "",
				// createdBy:$("#createdBy_d").val() || "",
				// mark	:$("#mark_d").val() || ""
			},
			function(res){
				alert('更新成功');
				console.log(res);
				location.reload();
				//limitdataTable($("#limitTable"),res.data.list);
			},
			function(res){
				alert('更新失败');
				console.log(res);
				//limitdataTable($("#limitTable"),res.data.list);
			}
		);
	},
	limitDetail = function(id){
		limitLabel.limitDetail(
			{
				goodId : id || ""
			},
			function(res){
				var list = res.data;
				$('#goodId_d').val(list.goodId)
				$("#idRygGoodLimitTag_d").val(list.idRygGoodLimitTag);
				$("#limitType_d").val(list.limitType);
				//$("#limitTagOrderNumber_d").val(list.limitTagOrderNumber);
				$("#remainLimitNumber_d").val(list.remainLimitNumber);
				$("#limitSort_d").val(list.limitSort);
				$("#beginTime_d").val(list.beginTime);
				$("#endTime_d").val(list.endTime);
				$("#limitNumber_d").val(list.limitNumber);
				// $("#updatedBy_d").val(list.updatedBy);
				// $("#createdBy_d").val(list.createdBy);
				// $("#mark_d").val(list.mark);
			}
		);
	},

	limitdataTable = function(elem,data){
		var table=elem.dataTable();
	      if(table){
	        table.fnDestroy();
	      }
		elem.dataTable({
          "data": data,
          "columns":[
          	{"data":"goodId"},
          	{"data":"goodName"},
            {"data":"type()"},
            {"data":"beginTime"},
            {"data":"endTime"},
            {"data":"limitNumber"},
            {"data":"remainLimitNumber"},
            {"data":"operate"},
          ],
          "aoColumnDefs":[
            {"sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[]
        	}
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
	formateDate = function(val,to){
		// if(!val) return "";	
		// if(to) return val+" 23:59:59";
		// return val+" 00:00:00";
		return val;
	},
	formateDates = function(val,to){
		 if(!val) return "";	
		// if(to) return val+" 23:59:59";
		// return val"+ 00:00:00";
		if(to==2) return val+" 00:00:00";
		if(to==3) return val+" 23:59:59";
		return val;
	},
	dataPicker = function(elm){
		elm.datepicker({
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
	},
	brandList = function(){
		brandLabel.getGoodBrandList(
			{
				id :"",
				brandName:$("#brandName").val() || "",
				beginTime :"",
				endTime : "",
				brandCode :$("#brandCode").val() || "",
				status :$("#brandStatus").val() || "",
				pageSize:100,
				pageNum	:1
			},
			function(res){
				branddataTable($("#brandTable"),getBrandData(res.data.list));
			}
		);
	},
	brandInsert = function(){
		brandLabel.insert(
			{
				brandName : $("#brandName_a").val() || "",
				brandCode:$("#brandCode_a").val() || "",
				mark :$("#mark_a").val()
			},
			function(res){
				brandId=res.data;
				alert("添加成功");
				//location.reload();
			}
		);
	},
	brandDetail = function(id){
		brandLabel.detailBrand(
			{
				id : id
			},
			function(res){
				var list=res.data.goodBrand;
				console.log(list.endTime);
				$('#brand_Id_d').val(list.id);
				$("#brandName_d").val(list.brandName);
				$("#brandCode_d").val(list.brandCode);
				$("#brandType_d").val(list.status);
				$("#brandOrderNumber_d").val(list.sort);
				$("#brandBeginTime_d").val(list.beginTime);
				$("#brandEndTime_d").val(list.endTime);
				//$("#brandCode").val(list[x].brandCode);
				$("#brandMark_d").val(list.mark);
				var brand_img_up_html="";
				if(list.picture == null || list.picture==""){
					brand_img_up_html='<img id="file_brand_up_img" data-src="holder.js/200x200" class="img-thumbnail" alt="200x200" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzIwMHgyMDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTYyNjJkMTk2YyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NjI2MmQxOTZjIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9Ijc0LjA1NDY4NzUiIHk9IjEwNC41Ij4yMDB4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+" data-holder-rendered="true" style="width: 200px; height: 200px;">'+
            		'<p align="center" class="addimg-exit-sty"><a href="javascript:void(0)" class="removeImg">删除</a></p>'+
            		'<input type="file" name="filename" style="bottom: 70px;top: inherit;left: 20px;" id="file_brands" class="ipt_file" />';
				}else{
					brand_img_up_html='<img id="file_brand_up_img" data-src="holder.js/200x200" class="img-thumbnail" alt="200x200" src="'+list.picture.fileUrl+'" data-holder-rendered="true" style="width: 200px; height: 200px;">'+
            		'<p align="center" class="addimg-exit-sty"><a href="javascript:void(0)" class="removeImg">删除</a></p>'+
            		'<input type="file" name="filename" style="bottom: 70px;top: inherit;left: 20px;" data-pictureid="'+list.picture.pictureId+'" id="file_brands" class="ipt_file" />';
				}
				$('#brand_img_up').html(brand_img_up_html);

				$("#file_brands").uploadPreview({ Img: "file_brand_up_img" });

				$('.removeImg').on('click', function(event) {
		            event.preventDefault();
		            /* Act on the event */
		                var file=$(this).parent().next();
		                //console.log(file);
		                file.after(file.clone().val(""));      
		                file.remove(); 
		                $(this).parent().parent().children('img').attr('src',"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzIwMHgyMDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTYyNjJkMTk2YyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NjI2MmQxOTZjIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9Ijc0LjA1NDY4NzUiIHk9IjEwNC41Ij4yMDB4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+")
		                //图片加载
						$("#file_brands").uploadPreview({ Img: "file_brand_up_img" });
						
						//$("#file_brand").uploadPreview({ Img: "file_brand_img" });

						if($(this).parent().next().attr('data-pictureid') !=undefined ){
                            //删除图片
                            brandLabel.del_img({
                                id:$('#brand_Id_d').val()
                            },function(res){
                                alert('删除成功');
                            },function(res){
                                alert('删除失败');

                            });
                        }
		        });
			}
		);
	},
	brandUpdate = function(){
		brandLabel.update(
			{
				id:$('#brand_Id_d').val(),
				brandName:$("#brandName_d").val(),
				status:$("#brandType_d").val(),
				sort:$("#brandOrderNumber_d").val(),
				beginTime:$("#brandBeginTime_d").val(),
				endTime:$("#brandEndTime_d").val(),
				mark:$('#brandMark_d').val()
			},
			function(res){
				console.log(res);

				alert('更新成功');
				//limitdataTable($("#limitTable"),getLimitData(res.data.list));
			}
		);
	},
	getBrandData = function(list){
		var objArray = [];
		for(var x in list){
			var obj = list[x];
			//console.log(list[x].status);

			var statusFns="";
			if(list[x].status == '1'){
				//console.log(1);
				statusFns= "已推荐";
			}else if((list[x].status == '0')){
				//console.log(0);

				statusFns= "未推荐";
			}else{
				//console.log(2);

				statusFns= "未选中";
			}
			obj.statusFn = statusFns;
			obj.operate = "<a href='javascript:;' onClick='javascript:openBrandDialog(\""+obj.id+"\");'>修改</a> &nbsp;<a href='javascript:;' onClick='javascript:brandDelete(\""+obj.id+"\");'>删除</a>";
		
			objArray.push(obj);
		}
		return objArray; 
	},
	
	branddataTable = function(elem,data){
		var table=elem.dataTable();
	      if(table){
	        table.fnDestroy();
	      }
		elem.dataTable({
          "data": data,
          "columns":[
          	// {"data":"id"},
          	{"data":"brandName"},
            {"data":"brandCode"},
            {"data":"beginTime"},
            {"data":"endTime"},
            {"data":"statusFn"},
            {"data":"mark"},
            // {"data":"createdBy"},
            // {"data":"createdDate"},
            // {"data":"updatedBy"},
            // {"data":"updatedDate"},
            {"data":"operate"}
          ],
          "aoColumnDefs":[
            {"sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[],
            // "sWidth":"200px","aTargets":[],
            // "sWidth":"200px","aTargets":[],
            // "sWidth":"200px","aTargets":[],
            // "sWidth":"200px","aTargets":[],
            // "sWidth":"200px","aTargets":[],
            // "sWidth":"200px","aTargets":[],
            "sWidth":"200px","aTargets":[]
        	}
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
	 //图片上传
    uploadfile =function (data,id){
        //alert(data.goodsId);
        //alert('type'+data.type);
        $.ajaxFileUpload({
            url : config.addImage,
            data: data,
            secureuri : false,
            type : 'POST',
            dataType : 'json',
            fileElementId : id,
            jsonp:'callback',
            success : function(data) {
                alert(data.code);
                
            },
            error : function(data) {
                console.log(data.code);
            }
       });
                
    },

    //图片修改
    uploadfile_up =function (data,id){
        //alert(data.goodsId);
        //alert('type'+data.type);
        $.ajaxFileUpload({
            url : config.updateImage,
            data: data,
            secureuri : false,
            type : 'POST',
            dataType : 'json',
            fileElementId : id,
            jsonp:'callback',
            success : function(data) {
                alert(data.code);
                
            },
            error : function(data) {
                console.log(data.code);
            }
       });
                
    }
	,
	getPageById = function(i){
		if(!i){
			$("#home").show();
			return ;
		}

		$("#profile_"+i).show();
	},
	valit = validate.fn;

	window.openDialog  = function(id){
		$(".layer-box-1imit").show();
		limitDetail(id);
	}
	window.closeLimitDialog = function(){
		$(".layer-box-1imit").hide();
	}
	window.openBrandDialog  = function(id){
		$(".layer-box-brand").show();
		brandDetail(id);
	}
	window.closeBrandDialog = function(){
		$(".layer-box-brand").hide();
	}
	window.openNewbrandDialog = function(){
		$(".layer-box-newbrand").show();
	}
	window.showPage = function(i){
		$(".tab-pane").hide();
		getPageById(i);
	};
	window.brandDelete = function(id){
		brandLabel.remove(
			{
				id : id || "",
				
			},
			function(res){
				alert("删除成功");
				location.reload();
			}
		);
	};
	
		$(document).ready(function(){
			//左菜单设置
		    common.setActive("2",true);
		    common.appendTo($('.sidebar'));
		    //加载数据
		    mainList();
		    limitList();
		    brandList();
		    //绑定add
		    $("#mainAdd").bind("click",function(e){
		    	if($('#mainTag').val() == ""){
		    		alert('请填写主标签');
		    		return false;
		    	}
		    	mainAdd();
		    });
		    //按钮绑定
		    $("#limitSearch").bind("click",function(e){
		    	limitList();
		    })
		    //修改限时限量
		    $("#limitAdd").bind("click",function(e){
		    	//validate
		    	if($("#limitType_d").val() == '1'){
		    		if (!valit.isNull($("#limitSort_d").val(),"排序不能为空.") 
		    			||  !valit.regIntegers($("#limitSort_d").val(),"排序必须是数字.") 
						||  !valit.isNull($("#beginTime_d").val(),"开始时间不能为空.")
						||  !valit.isNull($("#endTime_d").val(),"结束时间不能为空.")
					){
		    				return false;
					} 
		    	}else if($("#limitType_d").val() == '2'){
		    		if (!valit.isNull($("#limitSort_d").val(),"排序不能为空.") 
		    			||  !valit.regIntegers($("#limitSort_d").val(),"排序必须是数字.") 
						||  !valit.isNull($("#limitNumber_d").val(),"参加抢购的商品数量不能为空.")
						||  !valit.regIntegers($("#limitNumber_d").val(),"参加抢购的商品数量必须是数字.")
						||  !valit.isNull($("#remainLimitNumber_d").val(),"剩余参加抢购的商品数量不能为空.")
						||  !valit.regIntegers($("#remainLimitNumber_d").val(),"剩余参加抢购的商品数量必须是数字.")
					){
		    				return false;
					} 
		    	}else{
		    		alert("请选择限时购买或者限量购买");
		    		return false;
		    	}

		    	if($("#idRygGoodLimitTag_d").val()==""){
		    		limitInsert();
		    	}else{
		    		limitUpdate();
		    	}
		    	
		    })
		    //添加品牌
		    $("#newBrandAdd").bind("click",function(e){
		    	//validate
		    	if (!valit.isNull($("#brandName_a").val(),"品牌名称不能为空.") 
					||  !valit.isNull($("#brandCode_a").val(),"品牌编码不能为空.")
				){
	    				return false;
				} 
		    	brandInsert();
		    })
		    //d
		    $("#brandSearch").bind("click",function(e){
		    	brandList();
		    })
		    $(".layer-close").bind("click",function(e){
		    	$(".layer-box").hide();
		    })

		    $('#brandUpdate').bind("click",function(e){
		    	if (!valit.isNull($("#brandName_d").val(),"品牌名称不能为空.") 
					||  !valit.isNull($("#brandCode_d").val(),"品牌编码不能为空.")
					||  !valit.isNull($("#brandBeginTime_d").val(),"开始时间不能为空.")
					||  !valit.isNull($("#brandEndTime_d").val(),"结束时间不能为空.")
					||  !valit.isNull($("#brandOrderNumber_d").val(),"推荐序号不能为空.")
					||  !valit.regIntegers($("#brandOrderNumber_d").val(),"推荐序号必须是数字.")
					||  !valit.isNull($("#brandMark_d").val(),"备注不能为空.")
				){
	    				return false;
				} 
		    	brandUpdate();
		    })



		    //图片上传
		    $("#file_brand").uploadPreview({ Img: "file_brand_img" });
		    $('#file_brand_add').bind("click",function(e){
		    	uploadfile({
		    		brandId:brandId,
                    filename:$('#file_brand').val()
		    	},'file_brand');
		    })


		   //修改图片
		    $('#file_brand_up').bind("click",function(e){
		    	if($('#file_brands').attr('data-pictureid') == undefined){
		    		uploadfile({
			    		brandId:$('#brand_Id_d').val(),
	                    filename:$('#file_brands').val()
			    	},'file_brands');
			    	return false;
		    	}
		    	uploadfile_up({
		    		brandId:$('#brand_Id_d').val(),
                    filename:$('#file_brands').val()
		    	},'file_brands');
		    })

		    //日期格式
		    //datepicker
		    dataPicker($("#limitTimeFrom"));
		    dataPicker($("#limitTimeTo"));



		    $('#limitType_d').on('change', function(event) {
		    	event.preventDefault();
		    	var limitType_d_val=$(this).val();
		    	if(limitType_d_val==1){
		    		$('#beginTime_d').parent('span').show();
		    		$('#endTime_d').parent('span').show();
		    		$('#limitNumber_d').parent('span').hide();
		    		$('#remainLimitNumber_d').parent('span').hide();
		    	}else if (limitType_d_val==2) {
		    		$('#limitNumber_d').parent('span').show();
		    		$('#remainLimitNumber_d').parent('span').show();
		    		$('#beginTime_d').parent('span').hide();
		    		$('#endTime_d').parent('span').hide();
		    	}else{
		    		$('#beginTime_d').parent('span').show();
		    		$('#endTime_d').parent('span').show();
		    		$('#limitNumber_d').parent('span').show();
		    		$('#remainLimitNumber_d').parent('span').show();
		    	}
		    });



		    $( "#beginTime_d" ).datetimepicker({
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
	         $( "#endTime_d" ).datetimepicker({

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

	         $( "#brandBeginTime_d" ).datetimepicker({

            showSecond: true,
            	timeFormat:'hh:mm:ss',
	            showOtherMonths: true,
	            selectOtherMonths: true,
	            changeMonth: true,
	          changeYear: true,
	          showAnim:'fadeIn',
	          onClose: function( selectedDate ) {
	            $( ".toDate,.toDate_icon" ).datepicker( "option", "minDate", selectedDate );
	          }
	        });
	         $( "#brandEndTime_d" ).datetimepicker({

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
			});

	
})(window,$)