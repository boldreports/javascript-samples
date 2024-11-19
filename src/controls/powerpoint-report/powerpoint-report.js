/**
 * Powerpoint Report - This sample demonstrates the online food ordering details which is presented as a power point report using page break.
 */
$(function () {
    $("#container").boldReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'powerpoint-report.rdl',
        toolbarSettings: window.Globals.TOOLBAR_OPTIONS,
        exportSettings: window.Globals.EXPORT_OPTIONS,
        toolBarItemClick: window.Globals.EDIT_REPORT,
        exportItemClick: window.Globals.EXPORT_ITEM_CLICK
    });
});
