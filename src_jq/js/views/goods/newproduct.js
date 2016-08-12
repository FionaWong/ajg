(function(window,$){
  $(document).ready(function(){
    var moduleId = '1';
    //左菜单设置
    common.setActive(moduleId,true);
    common.appendTo($('.sidebar'));


    //获取商品详情
    good.getGoodDetail(getGoodDetailCb);



    //获取商品详情cb
    function getGoodDetailCb(list){
      
    }

  });

})(window,$);
