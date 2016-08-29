(function(window,$){
	var propertylist = function(){
		property.propertylist({
			pageNum:'1',
			pageSize:'10000',
			propertyParentId:'0'
		},function(res){
			console.log(res);
			maindataTable($("#attrTable"),getBrandData(res.data.nowList));
		},function(res){
			console.log(res);
		});
	},
	propertyDetail = function(propertyId){
		property.propertylist({
			pageNum:'1',
			pageSize:'10000',
			propertyParentId:'0',
			propertyId:propertyId
		},function(res){
			for(var x in res.data.nowList){
				$('#propertyId').val(res.data.nowList[x].propertyId);
				$('#propertyName').val(res.data.nowList[x].propertyName);
				$('#propertyCode').val(res.data.nowList[x].propertyCode);
			}
		},function(res){
			console.log(res);
		});
	},

	addProperty = function(propertyParentId){
		propertyParentId = propertyParentId || 0;
		var data = {};
		if(propertyParentId){
			data = {
				propertyCode:$('#propertyChildsCode').val(),
				propertyName:$('#propertyChildsName').val(),
				propertyParentId: propertyParentId
			};
			
		}else{
			data = {
				propertyCode:$('#propertyCode').val(),
				propertyName:$('#propertyName').val(),
				propertyParentId: propertyParentId
			};
		}
		
		property.addProperty(data,function(res){
			console.log(res);
			alert('属性添加成功');
			location.reload();
		},function(res){
			console.log(res);
			alert('属性添加失败');

		});
	},
	
	maindataTable = function(elem,data){
		var table=elem.dataTable();
	      if(table){
	        table.fnDestroy();
	      }
		elem.dataTable({
          "data": data,
          "columns":[
          	{"data":"propertyCode"},
            {"data":"propertyName"},
            {"data":"operate"},
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
	getBrandData = function(list){
		var objArray = [];
		for(var x in list){
			var obj = list[x];
			//alert(list[x].propertyId);
			// obj.operate = function(){
			// 	return "<a href='javascript:;' onClick='javascript:openUpProperty(\""+list[x].propertyId+"\");'>修改</a> &nbsp;<a href='javascript:;' onClick='javascript:shelfProperty(\""+list[x].propertyId+"\");'>删除</a>&nbsp;<a href='javascript:;' onClick='javascript:openNewChildsProperty(\""+list[x].propertyId+"\");'>添加子属性</a>"
			// }
			obj.operate = "<a href='javascript:;' onClick='javascript:openUpProperty(\""+list[x].propertyId+"\");'>修改</a> &nbsp;<a href='javascript:;' onClick='javascript:openNewChildsProperty(\""+list[x].propertyId+"\");'>添加子属性</a>&nbsp;<a href='javascript:;' onClick='javascript:openChildsProperty(\""+list[x].propertyId+"\");'>编辑子属性</a>";
			objArray.push(obj);
		}
		// console.log(objArray[0].operate);
		// console.log(objArray[1].operate);

		return objArray; 

	},
	valit = validate.fn;
	
	window.shelfProperty = function(propertyId){
		property.shelfProperty({
			propertyId:propertyId
		},function(res){
			console.log(res);
			alert('删除成功');
			location.reload();
		},function(res){
			console.log(res);
			alert(res.message);

		});
	}

	window.updateProperty = function(propertyParentId,x){
		
		if(propertyParentId == undefined || propertyParentId==""){
			property.updateProperty({
				propertyId:$('#propertyId').val(),
				propertyCode:$('#propertyCode').val(),
				propertyName:$('#propertyName').val(),
				propertyParentId:'0'
			},function(res){
				console.log(res);
				alert('属性更新成功');
				location.reload();
			},function(res){
				alert(res.message);

				console.log(res);
			});
		}else{
			if (valit.isNull($('.propertyChildsNames'+x+'').val(),"属性名称不能为空.") 
				&& valit.isNull($('.propertyChildsCodes'+x+'').val(),"属性编码不能为空.")
			) {
				property.updateProperty({
					propertyId:$('.parentIds'+x+'').val(),
					propertyCode:$('.propertyChildsCodes'+x+'').val(),
					propertyName:$('.propertyChildsNames'+x+'').val(),
					propertyParentId:$('.propertyParentIds'+x+'').val()
				},function(res){
					console.log(res);
					alert('属性更新成功');
				},function(res){
					alert(res.data);

					console.log(res);
				});
			}
			
		}
		
	}

	window.openNewPropertyDialog = function(){
		$('.layer-box-newproperty').show();
	}

	window.openUpProperty  = function(id){
		$(".layer-box-newproperty").show();
		propertyDetail(id);
		
	}
	window.openNewChildsProperty = function(id){
		$(".layer-box-newChildsProperty").show();
		$('#propertyParentId').val(id);
		//propertyDetail(id);
	} 
	window.openChildsProperty = function(id){
		
		good.queryChildPropByParentId({
			'propertyParentId':id
		},
		function(res){
			var list = res.data.list;
            var html='';
            for(var x in list){
                html+='<div><input type="hidden" class="propertyParentIds'+x+'" name="" value="'+list[x].propertyParentId+'">'+
                '<input type="hidden" name="" class="parentIds'+x+'" value="'+list[x].propertyId+'">'+
            '<span><label>属性名称：</label> <input class="form-control propertyChildsNames'+x+'"  type="text" value="'+list[x].propertyName+'" style="margin-right:0;">'+
            '<label>属性编码：</label> <input class="form-control propertyChildsCodes'+x+'"  type="text"   value="'+list[x].propertyCode+'" style="margin-right:0;">'+
            '<a href="javascript:;" onClick="javascript:updateProperty(\''+list[x].propertyParentId+'\',\''+x+'\');">修改</a>'+
            '<a href="javascript:;" onClick="javascript:shelfProperty(\''+list[x].propertyId+'\');">删除</a>'+
            '</span></div>';
            }
            $('#ChildsPropertyDetail').html(html);
            //alert(list.length);
            if(list.length==0){
            	alert('还没有子属性，请先添加子属性');
            }else{
            	$(".layer-box-ChildsProperty").show();
            }
		},function(res){

		});
	}

	$(document).ready(function(){
    	
		
		propertylist();

		$('#newPropertyAdd').click(function(event) {
			//validate
			
			if (valit.isNull($("#propertyName").val(),"属性名称不能为空.") 
				&& valit.isNull($("#propertyCode").val(),"属性编码不能为空.")
			) {
    		 	if($('#propertyId').val() != ""){
					updateProperty();
					return false;
				}else{
					addProperty();
				}
    		 }
			
			
		});

		$('#newChildsPropertyAdd').click(function(event) {
			if (valit.isNull($("#propertyChildsName").val(),"子属性名称不能为空.") 
				&& valit.isNull($("#propertyChildsCode").val(),"子属性编码不能为空.")
			) {
    		 	addProperty($('#propertyParentId').val());
    		 }
			
		});


		//tb切换
        $('.nav-tabs').on('click', 'li', function(event) {
            $('.nav-tabs li').removeClass('active');
            $(this).addClass('active');
            if($(this).attr('data-id')=='home'){
                $('#home').show();
                $('#profile1').hide();
                $('#profile2').hide();

                $('#profile3').hide();

            }else if($(this).attr('data-id')=='profile1'){
                $('#profile1').show();
                $('#home').hide();
                $('#profile2').hide();

                $('#profile3').hide();
            }
            else if($(this).attr('data-id')=='profile2'){
                $('#profile2').show();
                $('#home').hide();
                $('#profile1').hide();

                $('#profile3').hide();
            }
            else if($(this).attr('data-id')=='profile3'){
                $('#profile3').show();
                $('#home').hide();
                $('#profile1').hide();
                $('#profile2').hide();
            }
        });
	})
})(window,$)