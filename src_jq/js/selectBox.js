/*
use example
$(function () {

        $.selectBox({

            ulFrom: 'sel_all_area',

            ulTo: 'sel_selected_areas',

            selectAll: 'btn_select_all_area',

            selectSelected: 'btn_choose_selected_area',

            removeAll: 'btn_remove_all_area',

            removeSelected: 'btn_remove_selected_area',

            selectedClass: 'selected',

            quickQuery: 'search-for-select'

        });

    });

*/

(function ($) {

    $.selectBox = function (options) {

        var defaults = {

                ulFrom: 'ul_all_from',

                ulTo: 'ul_all_to',

                selectAll: 'btn_select_all',

                selectSelected: 'btn_select_selected',

                removeAll: 'btn_remove_all',

                removeSelected: 'btn_remove_selected',

                selectedClass: 'selected',

                quickQuery:''

            };

        //init

        var option = $.extend(defaults, options);

        var j_all_from = $("#"+option.ulFrom),

            j_selected_to = $("#"+option.ulTo);



        var b_select_all = $("#"+option.selectAll),

            b_select_selected = $("#"+option.selectSelected),

            b_remove_all = $("#"+option.removeAll),

            b_remove_selected = $("#"+option.removeSelected);

        //快速搜索选择匹配

        var quickQuery = function(){

            var b_quick_query = $("input."+option.quickQuery);

            b_quick_query.keyup(function(){

                var select = $(this).attr("forselect");

                var keyvalue = $(this).val();

                $("#" + select).find("li").each(function(){

                    if($(this).html().indexOf(keyvalue) >= 0 || !keyvalue){

                        $(this).show();

                    }else{

                        $(this).hide();

                    }

                });

                return false;

            });

        }



        if(option.quickQuery != ''){//设定快速搜索选择匹配

            quickQuery();

        }



        b_select_all.click(function(){//全选按钮

            j_all_from.find("li").each(function(){

                $(this).appendTo(j_selected_to);

            });

            return false;

        });

        b_select_selected.click(function(){//单选按钮

            j_all_from.find("li.selected").each(function(){

                $(this).appendTo(j_selected_to);

            });

            return false;

        });

        b_remove_selected.click(function(){//单选返回按钮

            j_selected_to.find("li.selected").each(function(){

                $(this).appendTo(j_all_from);

            });

            return false;

        });

        b_remove_all.click(function(){//全选返回按钮

            j_selected_to.find("li").each(function(){

                $(this).appendTo(j_all_from);

            });

            return false;

        });



        j_all_from.find("li").on("click", function(event){

            event = event || window.event;

            //单击选中,按住Ctrl键实现多选，否则，单选

            if(event.ctrlKey){

                $(this).toggleClass("selected");

            }else{

                $(this).toggleClass("selected").siblings("li.selected").removeClass("selected");

            }

            return false;

        });

        j_selected_to.find("li").on("click", function(event){

            event = event || window.event;

            //单击选中,按住Ctrl键实现多选，否则，单选

            if(event.ctrlKey){

                $(this).toggleClass("selected");

            }else{

                $(this).toggleClass("selected").siblings("li.selected").removeClass("selected");

            }

            return false;

         });

        //双击选择选项

        j_all_from.find("li").on("dblclick", function(){

            $(this).addClass("selected");

            if ($(this).parent("ul").is(j_all_from)) {

                b_select_selected.click();

            }

            else {

                b_remove_selected.click();

            }

            return false;

        });

        //双击返回选项

        j_selected_to.find("li").on("dblclick", function(){

            $(this).addClass("selected");

            if ($(this).parent("ul").is(j_selected_to)) {

                b_select_selected.click();

            }

            else {

                b_remove_selected.click();

            }

            return false;

        });

    };

})(jQuery);
