$(document).ready(function(){
    // 初始化Web Uploader
    var filePicker_goodslist = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: true,

        // swf文件路径
        swf:  './js/libs/upload/Uploader.swf',

        // 文件接收服务端。
        server: 'http://webuploader.duapp.com/server/fileupload.php',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker_goodslist',

        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 当有文件添加进来的时候
    filePicker_goodslist.on( 'fileQueued', function( file ) {
        var $li = $(
                '<div id="' + file.id + '" data-name="'+file.name+'" class="file-item thumbnail">' +
                '<img>' +
                '<span class="shanchu">删除</span>'+
                '</div>'
            ),
            $img = $li.find('img');

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

    $('#imguplad').on('click',function () {
        // var $thumbnail=$('.thumbnail');
        // for (var x in $thumbnail){
        //     imgs+=$thumbnail[x].attr('data-name');
        // }
        // console.log(imgs)

        var arr=document.getElementsByClassName("thumbnail");

        for(var i=0;i<arr.length;i++)
        {

            arr[i].attributes["data-name"].value;
            good.im_uploadpicture({},function () {

            });
        }
    });
});

