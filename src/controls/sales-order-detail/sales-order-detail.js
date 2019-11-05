/**
 * Sales Order Detail - This sample demonstrates the sales order information based on order id.
 */
$(function () {
    $("#container").ejReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'sales-order-detail',
        toolbarSettings: window.Globals.TOOLBAR_OPTIONS,
        toolBarItemClick: window.Globals.EDIT_REPORT
    });
});
