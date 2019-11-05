/**
 * Territory Sales - This sample demonstrates the Tablix with Row Grouping by sales region and drill down (expand/collapse) the group details.
 */
$(function () {
    $("#container").ejReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'territory-sales',
        toolbarSettings: window.Globals.TOOLBAR_OPTIONS,
        toolBarItemClick: window.Globals.EDIT_REPORT
    });
});
