/**
 * Sales Order Detail - This sample demonstrates the sales order information based on order id.
 */
 $(function () {
    $("#container").boldReportViewer({   
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'product-line-sales.rdl',
        toolbarSettings: window.Globals.TOOLBAR_OPTIONS,
        toolBarItemClick: window.Globals.EDIT_REPORT,
        exportItemClick: window.Globals.EXPORT_ITEM_CLICK,
        parameterSettings: { hideParameterBlock: true}
    });
    var userAgent = window.navigator.userAgent;
    var isMobile = /mobile/i.test(userAgent);
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    if (wheelEvent && !isMobile) {
        window.addEventListener(wheelEvent, function () { }, { passive: false });
    }
     $("#startdate").ejDatePicker({ value: new Date("1/1/2003"),width:"180px" });
     $("#enddate").ejDatePicker({ value: new Date("12/31/2003"),width:"180px"});
     $.ajax({
         type: "GET",
         contentType: "application/json; charset=utf-8",
         url: window.Globals.SERVICE_URL+'/GetExternalParameterData',
         success: function (data) {
             var productCategoryList = JSON.parse(data.ProductCategoryDetail);
             var productSubCategoryList = JSON.parse(data.ProductSubCategoryDetail);
             $("#category").ejDropDownList({
                 dataSource:productCategoryList,
                 fields: {
                     text: "Name",
                     value: "ProductCategoryID",
                    },
                 change: function (args) {
                     $("#checkall").ejCheckBox({ checked: false });
                     var subCategoryDropDownList = productSubCategoryList.filter(({ ProductCategoryID }) => ProductCategoryID == $("#category").ejDropDownList("getSelectedValue"));
                     var subCategoryObj = $('#subcategory').data("ejDropDownList");
                     subCategoryObj.option("dataSource", subCategoryDropDownList);
                    },
                 selectedIndex: 1,
                 width: "180px"
                });
             var subCategoryDropDownList = productSubCategoryList.filter(({ ProductCategoryID }) => ProductCategoryID == 1);
             $("#subcategory").ejDropDownList({
                 dataSource: subCategoryDropDownList,
                 fields: {
                     text: "Name",
                     value: "ProductSubcategoryID",
                    },
                 showCheckbox: true,
                 change: dropDownCheckAll,
                 headerTemplate: "<div id='checkall_wrap' ><input id ='checkall' type='checkbox'/></div>",
                 selectedIndex: 1,
                 width: "180px",
                 watermarkText: "Select Option"
                });
             $("#checkall").ejCheckBox({ text: "Select All", change: selectAllSubCategory });
            }
        });
        $("#update").click(function(){
            var reportViewer = $("#container").boldReportViewer("instance");
                var productCategory = $("#category").ejDropDownList("getSelectedValue");
                var productSubcategory = $("#subcategory").ejDropDownList("getSelectedValue").split(',');
                var startDate = $("#startdate").data("ejDatePicker").getValue();
                var endDate = $("#enddate").data("ejDatePicker").getValue();
                var parameters = [{ name: 'ProductCategory', labels: [productCategory], values: [productCategory] }, { name: 'ProductSubcategory', labels: productSubcategory, values: productSubcategory }, { name: 'StartDate', labels: [startDate], values: [startDate] }, { name: 'EndDate', labels: [endDate], values: [endDate] }];
                reportViewer.model.parameters = parameters;
                reportViewer.reload();
        });    
});
var flag;
function selectAllSubCategory(args) {
    if (!flag) {
        var subCategoryObj = $("#subcategory").ejDropDownList("instance");
        if (args.isChecked) subCategoryObj.checkAll();
        else subCategoryObj.uncheckAll();
    }
}
function dropDownCheckAll(args) {
    var subCategoryObj = $("#subcategory").ejDropDownList("instance");
    var instance = $("#checkall").data("ejCheckBox");
    if (!args.isChecked) {
        flag = true;
        instance.setModel({ checked: false });
        flag = false;
    }
    if (subCategoryObj.getSelectedItem().length == subCategoryObj.getListData().length) {
        $("#checkall").ejCheckBox({ checked: true });
    }
}

