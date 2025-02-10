/**
 * Infographics Report - Visualize student demographics, course interests, achievements, and study preferences.
 */
$(function () {
    $("#container").boldReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'infographics-report.rdl',
        toolbarSettings: window.Globals.TOOLBAR_OPTIONS,
        toolBarItemClick: window.Globals.EDIT_REPORT,
        exportItemClick: window.Globals.EXPORT_ITEM_CLICK
    });
});
