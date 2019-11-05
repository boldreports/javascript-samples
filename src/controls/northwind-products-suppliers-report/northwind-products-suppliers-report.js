/**
 * Northwind Products and Suppliers Report - This sample demonstrates the sales performance of different products.
 */
$(function () {
    $("#container").ejReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'northwind-products-suppliers-report',
        toolbarSettings: window.Globals.TOOLBAR_OPTIONS,
        toolBarItemClick: window.Globals.EDIT_REPORT
    });
});
