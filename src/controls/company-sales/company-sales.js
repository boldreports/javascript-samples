/**
 * Company sales - This sample demonstrates the Sales data by year with grouping.
 */
$(function () {
    $("#container").boldReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'company-sales.rdl',
        toolbarSettings: window.Globals.TOOLBAR_OPTIONS,
        toolBarItemClick: window.Globals.EDIT_REPORT,
        exportItemClick: window.Globals.EXPORT_ITEM_CLICK
    });
});
