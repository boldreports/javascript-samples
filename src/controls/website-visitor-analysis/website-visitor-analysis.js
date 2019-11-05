/**
 * Website Visitor Analysis - This sample analyze the user behavior for a fictitious e-commerce website with random data.
 */
$(function () {
    $("#container").ejReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'website-visitor-analysis',
        toolbarSettings: window.Globals.TOOLBAR_OPTIONS,
        toolBarItemClick: window.Globals.EDIT_REPORT
    });
});
