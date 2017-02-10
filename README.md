# jquery.threelevelcategoryselect
三级联动下拉菜单 只需几行代码就可实现三级联动功能。使用场景：省市区、商品三级分类等。
详细介绍请参考：http://www.cnblogs.com/eggTwo/p/5991925.html
#核心功能
* 可以根据需要设置是否显示“请选择”项
* 支持回调(在三级分类加载完成后触发回调事件)
* 支持一个页面多个级联菜单

#使用方法
    <body>
    <script>

        $(function () {
            var c1 = new WJH_Three_Category_Select();
            c1.Category1ID = "select1";
            c1.Category2ID = "select2";
            c1.Category3ID = "select3";
            c1.DataURL = "/Demo/GetThreeCategorysData";//数据格式：[{"Value":310100,"Display":"市辖区"},{"Value":310200,"Display":"县"}]
            c1.Init("DIV1", 0, 0, 0, true, function () { });
            $(".wjh_category1_span").text("省：");
            $(".wjh_category2_span").text("市：");
            $(".wjh_category3_span").text("县：");

            var c2 = new WJH_Three_Category_Select();
            c2.Category1ID = "select4";
            c2.Category2ID = "select5";
            c2.Category3ID = "select6";
            c2.DataURL = "/Demo/GetThreeCategorysData";
            c2.Init("DIV2", 310000, 310100, 310101, false, function () {
                //三级分类加载完成后执行
                alert("loaded");
            });

        });
    </script>
    <div id="DIV1"></div>
    <div id="DIV2"></div>
</body>
