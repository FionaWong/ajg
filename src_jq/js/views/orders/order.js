(function(window,$){
	var dataPicker = function(elm){
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
	}
	$(document).ready(function(){
	    //左菜单设置
	    common.setActive("3",true);
	    common.appendTo($('.sidebar'));
	})

})(window,$);