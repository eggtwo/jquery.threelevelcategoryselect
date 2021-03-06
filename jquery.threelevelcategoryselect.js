﻿
//三级分类选择器  by 王军华 20160721
function WJH_Three_Category_Select() {

    this.Category1ID= "wjh_category1_select";
    this.Category2ID = "wjh_category2_select";
    this.Category3ID = "wjh_category3_select";
    this.DataURL = "";//数据URL   
    //初始化
    //wrapID :   包裹三级分类的标签ID
    //category1： 省ID 对应的初始化 Value
    //category2：     市ID 对应的初始化 Value
    //category3：   县ID 对应的初始化 Value
    //useEmpty： 是否支持请选择,如果为false则默认三级都加载
    //successCallBack：加载完成后的回调函数
    this.Init = function (wrapID, category1, category2, category3, useEmpty, successCallBack) {      
        this.InitTag(wrapID, useEmpty);
        this.InitData(category1, category2, category3, useEmpty, successCallBack);
        this.category1Select(useEmpty);
        this.category2Select(useEmpty);
    };
    //初始化标签
    this.InitTag = function (wrapID, useEmpty) {
        var tmpInit = "";
        tmpInit += "<span class='wjh_category1_span'>一级分类：</span>";
        if (useEmpty) {
            tmpInit += "<select id='" + this.Category1ID + "' name='" + this.Category1ID + "'><option value='0'>--请选择--</option></select>";
        } else {
            tmpInit += "<select id='" + this.Category1ID + "' name='" + this.Category1ID + "'></select>";
        }
        tmpInit += "<span class='wjh_category2_span'>二级分类：</span>";
        if (useEmpty) {
            tmpInit += "<select id='" + this.Category2ID + "' name='" + this.Category2ID + "'><option value='0'>--请选择--</option></select>";
        } else {
            tmpInit += "<select id='" + this.Category2ID + "' name='" + this.Category2ID + "'></select>";
        }
        tmpInit += "<span class='wjh_category3_span'>三级分类：</span>";
        if (useEmpty) {
            tmpInit += "<select id='" + this.Category3ID + "' name='" + this.Category3ID + "'><option value='0'>--请选择--</option></select>";
        } else {
            tmpInit += "<select id='" + this.Category3ID + "' name='" + this.Category3ID + "'></select>";
        }
        $("#" + wrapID + "").html(tmpInit);
    };
    //初始化数据--包括修改
    this.InitData = function (incategory1, incategory2, incategory3, useEmpty, successCallBack) {
        var c1 = this.Category1ID;
        var c2 = this.Category2ID;
        var c3 = this.Category3ID;
        var dataUrl = this.DataURL;
        //添加
        if (incategory1 == 0) {
          
            $.get(dataUrl, {}, function (category1) {
                var firstcategory1Guid = category1[0].Value;
                //初始化一级分类
                for (var i = 0; i < category1.length; i++) {                   
                    var tmp_option = " <option value='" + category1[i].Value + "'>" + category1[i].Display + "</option>";
                    $("#" + c1 + "").html($("#" + c1 + "").html() + tmp_option);

                }

                if (useEmpty) {
                    successCallBack();
                    return;
                }
                //初始化二级分类
                $.get(dataUrl, { pid: firstcategory1Guid }, function (category2) {
                    var firstcategory2Guid = category2[0].Value;
                    for (var i = 0; i < category2.length; i++) {
                        var tmp_option = " <option value='" + category2[i].Value + "'>" + category2[i].Display + "</option>";
                        $("#" + c2 + "").html($("#" + c2 + "").html() + tmp_option);

                    }

                    //初始化县
                    $.get(dataUrl, { pid: firstcategory2Guid }, function (category3) {
                        for (var i = 0; i < category3.length; i++) {
                            var tmp_option = " <option value='" + category3[i].Value + "'>" + category3[i].Display + "</option>";
                            $("#" + c3 + "").html($("#" + c3 + "").html() + tmp_option);
                        }
                        successCallBack();

                    }, "json");


                }, "json");
            }, "json");
        }
            //修改
        else {

            $.get(dataUrl, {}, function (category1) {

                //初始化一级分类
                for (var i = 0; i < category1.length; i++) {
                    var tmp_option = "";
                    if (category1[i].Value == incategory1) {

                        tmp_option = " <option selected='selected' value='" + category1[i].Value + "'>" + category1[i].Display + "</option>";
                    } else {
                        tmp_option = " <option value='" + category1[i].Value + "'>" + category1[i].Display + "</option>";
                    }
                    $("#" + c1 + "").html($("#" + c1 + "").html() + tmp_option);

                }

                //初始化二级分类
                $.get(dataUrl, { pid: incategory1 }, function (category2) {
                    for (var i = 0; i < category2.length; i++) {
                        var tmp_option = "";
                        if (category2[i].Value == incategory2) {
                            tmp_option = " <option  selected='selected' value='" + category2[i].Value + "'>" + category2[i].Display + "</option>";
                        } else {
                            tmp_option = " <option value='" + category2[i].Value + "'>" + category2[i].Display + "</option>";
                        }
                        $("#" + c2+ "").html($("#" + c2 + "").html() + tmp_option);

                    }

                    //初始化三级分类
                    $.get(dataUrl, { pid: incategory2 }, function (category3) {
                        for (var i = 0; i < category3.length; i++) {
                            var tmp_option = "";
                            if (category3[i].Value == incategory3) {
                                tmp_option = " <option selected='selected' value='" + category3[i].Value + "'>" + category3[i].Display + "</option>";
                            } else {
                                tmp_option = " <option value='" + category3[i].Value + "'>" + category3[i].Display + "</option>";
                            }

                            $("#" + c3 + "").html($("#" + c3 + "").html() + tmp_option);

                        }
                        successCallBack();
                    }, "json");
                });
            });

        }
    };
    //一级分类change
    this.category1Select = function (useEmpty) {
        var c1 = this.Category1ID;
        var c2 = this.Category2ID;
        var c3 = this.Category3ID;
        var dataUrl = this.DataURL;
        $("#" + c1 + "").change(function () {
            var optionHtml = "";
            if (useEmpty) {
                optionHtml = "<option value='0'>--请选择--</option>";
            }
            $("#" + c2+ "").html(optionHtml);
            $("#" + c3 + "").html(optionHtml);
            var tmpSelectedcategory1 = $("#" + c1 + " option:selected").val();
            //初始化二级分类
            $.get(dataUrl, { pid: tmpSelectedcategory1 }, function (category2) {
                var firstcategory2Guid = category2[0].Value;
                for (var i = 0; i < category2.length; i++) {
                    var tmp_option = " <option value='" + category2[i].Value + "'>" + category2[i].Display + "</option>";
                    $("#" + c2 + "").html($("#" +c2+ "").html() + tmp_option);
                }
                if (useEmpty) {
                    return;
                }
                //初始化三级分类
                $.get(dataUrl, { pid: firstcategory2Guid }, function (category3) {
                    for (var i = 0; i < category3.length; i++) {
                        var tmp_option = " <option value='" + category3[i].Value + "'>" + category3[i].Display + "</option>";
                        $("#" + c3 + "").html($("#" + c3 + "").html() + tmp_option);
                    }
                }, "json");


            }, "json");

        });
    };
    //二级分类change
    this.category2Select = function (useEmpty) {
        var c1 = this.Category1ID;
        var c2 = this.Category2ID;
        var c3 = this.Category3ID;
        var dataUrl = this.DataURL;
        $("#" + c2 + "").change(function () {
            var optionHtml = "";
            if (useEmpty) {
                optionHtml = "<option value='0'>--请选择--</option>";
            }
            $("#" + c3+ "").html(optionHtml);
            var tmpSelectedcategory2 = $("#" + c2 + " option:selected").val();
            //初始化三级分类
            $.get(dataUrl, { pid: tmpSelectedcategory2 }, function (category3) {
                for (var i = 0; i < category3.length; i++) {
                    var tmp_option = " <option value='" + category3[i].Value + "'>" + category3[i].Display + "</option>";
                    $("#" +c3 + "").html($("#" + c3+ "").html() + tmp_option);
                }
            }, "json");
        });
    }
}

