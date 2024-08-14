/**
 * Sales Order Detail - This sample demonstrates the sales order information based on order id.
 */
$(function () {
    $("#container").boldReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'product-line-sales.rdl',
        toolbarSettings: {
            customGroups: window.Globals.TOOLBAR_OPTIONS.customGroups,
            toolbars: ej.ReportViewer.Toolbars.All & ~ej.ReportViewer.Toolbars.Vertical
        },
        toolBarItemClick: window.Globals.EDIT_REPORT,
        exportItemClick: window.Globals.EXPORT_ITEM_CLICK,
        parameterSettings: { hideParameterBlock: true }
    });
    ejs.popups.createSpinner({ target: document.getElementById("spinner-container") })
    ejs.popups.showSpinner(document.getElementById("spinner-container"));
    var userAgent = window.navigator.userAgent;
    var isMobile = /mobile/i.test(userAgent);
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    if (wheelEvent && !isMobile) {
        window.addEventListener(wheelEvent, function () { }, { passive: false });
    }
    var startDate, endDate, category, subCategory;
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: window.Globals.SERVICE_URL + '/GetExternalParameterData',
        success: function (data) {
            startDate = new ejs.calendars.DatePicker({ value: new Date("1/1/2003"), width: "180px" });
            endDate = new ejs.calendars.DatePicker({ value: new Date("12/31/2003"), width: "180px" });
            var productCategoryList = JSON.parse(data.productCategoryDetail);
            var productSubCategoryList = JSON.parse(data.productSubCategoryDetail);
            var subCategoryDropDownList = productSubCategoryList.filter(({ ProductCategoryID }) => ProductCategoryID == 1);
            category = new ejs.dropdowns.DropDownList({
                dataSource: productCategoryList,
                fields: {
                    text: "Name",
                    value: "ProductCategoryID",
                },
                index: 1,
                width: "180px",
                height: "10px",
                showClearButton: false,
                change: function (e) {
                    var categoryID = e.value;
                    var categoryDropDownList = productSubCategoryList.filter(({ ProductCategoryID }) => ProductCategoryID == categoryID);
                    if (subCategory.value != null)
                        subCategory.clear();
                    subCategory.dataSource = categoryDropDownList;
                    $('#update').prop('disabled', !subCategory.value);
                }
            });
            subCategory = new ejs.dropdowns.MultiSelect({
                dataSource: subCategoryDropDownList,
                fields: {
                    text: "Name",
                    value: "ProductSubcategoryID",
                },
                mode: 'CheckBox',
                showClearButton: true,
                showDropDownIcon: true,
                showSelectAll: true,
                width: "180px",
                height: "30px",
                value: [2],
                placeholder: "Select Option",
                change: function(args) {
                    $('#update').prop('disabled', !args.value.length);
                }
            });
            startDate.appendTo('#startdate');
            endDate.appendTo('#enddate');
            category.appendTo('#category');
            subCategory.appendTo('#subcategory');
            ejs.popups.hideSpinner(document.getElementById("spinner-container"));
            $("#r-w-property-title").css("display", "block");
            $(".r-w-property").css("display", "inline-flex");
            $(".r-w-genearte").css("display", "block");
        }
    });
    $("#update").click(function () {
        var reportViewer = $("#container").boldReportViewer("instance");
        var productCategory = category.value.toString();
        var productSubcategory = (subCategory.value == null ? [''] : subCategory.value.map((i) => { return i.toString(); }));
        var startDateValue = startDate.value;
        var endDateValue = endDate.value;
        var parameters = [{ name: 'ProductCategory', labels: [productCategory], values: [productCategory] }, { name: 'ProductSubcategory', labels: productSubcategory, values: productSubcategory }, { name: 'StartDate', labels: [startDateValue], values: [startDateValue] }, { name: 'EndDate', labels: [endDateValue], values: [endDateValue] }];
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
