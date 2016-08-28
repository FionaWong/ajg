$(document).ready(function(){
    // 初始化Web Uploader
    var filePicker_goodslist = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: true,

        // swf文件路径
        swf:  './js/libs/upload/Uploader.swf',

        // 文件接收服务端。
        server: 'http://10.28.122.11:8080/gbd-anybuy/consolemanage/im_uploadpicture',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker_goodslist',

        formData: {  
            goodsId:'3A143E96C2B15544E0531480140A6AD6',
            index:0,
            type:'goodslist'
        },
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 当有文件添加进来的时候
    filePicker_goodslist.on( 'fileQueued', function( file ) {
        console.log(file);
        var $li = $(
                '<div id="' + file.id + '" data-name="'+file.name+'" class="file-item thumbnail">' +
                '<img>' +
                '<span class="shanchu">删除</span>'+
                '</div>'
            ),
            $img = $li.find('img');
            filePicker_goodslist.options.formData.filename = file.name;  
        // $list为容器jQuery实例
        $('#fileList_goodslist').append( $li );

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        filePicker_goodslist.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr( 'src', src );
        }, 100, 100 );
    });



    // 初始化Web Uploader
    var filePicker_goodsmain = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: true,

        // swf文件路径
        swf:  './js/libs/upload/Uploader.swf',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker_goodsmain',

        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 当有文件添加进来的时候
    filePicker_goodsmain.on( 'fileQueued', function( file ) {
        var $li = $(
                '<div id="' + file.id + '" data-name="'+file.name+'" class="file-item thumbnail">' +
                '<img>' +
                '<span class="shanchu">删除</span>'+
                '</div>'
            ),
            $img = $li.find('img');


        // $list为容器jQuery实例
        $('#fileList_goodsmain').append( $li );

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        filePicker_goodsmain.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr( 'src', src );
        }, 100, 100 );
    });



    // 初始化Web Uploader
    var filePicker_goodsdetail = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: true,

        // swf文件路径
        swf:  './js/libs/upload/Uploader.swf',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker_goodsdetail',

        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 当有文件添加进来的时候
    filePicker_goodsdetail.on( 'fileQueued', function( file ) {
        var $li = $(
                '<div id="' + file.id + '" data-name="'+file.name+'" class="file-item thumbnail">' +
                '<img>' +
                '<span class="shanchu">删除</span>'+
                '</div>'
            ),
            $img = $li.find('img');


        // $list为容器jQuery实例
        $('#fileList_goodsdetail').append( $li );

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        filePicker_goodsdetail.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr( 'src', src );
        }, 100, 100 );
    });



    // 初始化Web Uploader
    var filePicker_goodspreview = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: true,

        // swf文件路径
        swf:  './js/libs/upload/Uploader.swf',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker_goodspreview',

        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 当有文件添加进来的时候
    filePicker_goodspreview.on( 'fileQueued', function( file ) {
        var $li = $(
                '<div id="' + file.id + '" data-name="'+file.name+'" class="file-item thumbnail">' +
                '<img>' +
                '<span class="shanchu">删除</span>'+
                '</div>'
            ),
            $img = $li.find('img');


        // $list为容器jQuery实例
        $('#fileList_goodspreview').append( $li );

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        filePicker_goodspreview.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr( 'src', src );
        }, 100, 100 );
    });


    // 初始化Web Uploader
    var filePicker_listpage = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: true,

        // swf文件路径
        swf:  './js/libs/upload/Uploader.swf',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker_listpage',

        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 当有文件添加进来的时候
    filePicker_listpage.on( 'fileQueued', function( file ) {
        var $li = $(
                '<div id="' + file.id + '" data-name="'+file.name+'" class="file-item thumbnail">' +
                '<img>' +
                '<span class="shanchu">删除</span>'+
                '</div>'
            ),
            $img = $li.find('img');


        // $list为容器jQuery实例
        $('#fileList_listpage').append( $li );

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        filePicker_listpage.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr( 'src', src );
        }, 100, 100 );
    });

    //删除
    $('#fileList_goodslist').on("click", ".thumbnail .shanchu", function () {
        var $ele = $(this);
        var id = $ele.parent().attr("id");
        filePicker_goodslist.removeFile(filePicker_goodslist.getFile(id),true);
        $ele.parent().remove();
    });
    //删除
    $('#fileList_goodsmain').on("click", ".thumbnail .shanchu", function () {
        var $ele = $(this);
        var id = $ele.parent().attr("id");
        filePicker_goodsmain.removeFile(filePicker_goodsmain.getFile(id),true);
        $ele.parent().remove();
    });
    //删除
    $('#fileList_goodsdetail').on("click", ".thumbnail .shanchu", function () {
        var $ele = $(this);
        var id = $ele.parent().attr("id");
        filePicker_goodsdetail.removeFile(filePicker_goodsdetail.getFile(id),true);
        $ele.parent().remove();
    });
    //删除
    $('#fileList_goodspreview').on("click", ".thumbnail .shanchu", function () {
        var $ele = $(this);
        var id = $ele.parent().attr("id");
        filePicker_goodspreview.removeFile(filePicker_goodspreview.getFile(id),true);
        $ele.parent().remove();
    });
    //删除
    $('#fileList_listpage').on("click", ".thumbnail .shanchu", function () {
        var $ele = $(this);
        var id = $ele.parent().attr("id");
        filePicker_listpage.removeFile(filePicker_listpage.getFile(id),true);
        $ele.parent().remove();
    });




    // 文件上传过程中创建进度条实时显示。
    filePicker_goodslist.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<p class="progress"><span></span></p>')
                    .appendTo( $li )
                    .find('span');
        }

        $percent.css( 'width', percentage * 100 + '%' );
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    filePicker_goodslist.on( 'uploadSuccess', function( file ) {
        $( '#'+file.id ).addClass('upload-state-done');
    });

    // 文件上传失败，显示上传出错。
    filePicker_goodslist.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');

        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    filePicker_goodslist.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
    });
});



jQuery.fn.extend({
        uploadPreview: function (opts) {
            var _self = this,
                _this = $(this);
            opts = jQuery.extend({
                Img: "ImgPr",
                Width: 150,
                Height: 80,
                ImgType: ["gif", "jpeg", "jpg", "png"],
                Callback: function () {}
            }, opts || {});
            _self.getObjectURL = function (file) {
                var url = null;
                if (window.createObjectURL != undefined) {
                    url = window.createObjectURL(file);
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            };
            _this.change(function () {
                if (this.value) {
                    if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                        alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
                        this.value = "";
                        return false;
                    }
                    console.log($);
                    if ($.browser.msie) {
                        try {
                            $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]));
                        } catch (e) {
                            var src = "";
                            var obj = $("#" + opts.Img);
                            var div = obj.parent("div")[0];
                            _self.select();
                            if (top != self) {
                                window.parent.document.body.focus();
                            } else {
                                _self.blur();
                            }
                            src = document.selection.createRange().text;
                            document.selection.empty();
                            obj.hide();
                            obj.parent("div").css({
                                'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
                                'width': opts.Width + 'px',
                                'height': opts.Height + 'px'
                            });
                            div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                        }
                    } else {
                        $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]));
                    }
                    opts.Callback();
                }
            });
        }
    });

