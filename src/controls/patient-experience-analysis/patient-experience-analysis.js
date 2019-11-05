/**
 * Patient Experience Analysis - This sample analyze the patient satisfaction trends during hospital visits with random data.
 */
$(function () {
    $("#container").ejReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'patient-experience-analysis',
        toolbarSettings: window.Globals.TOOLBAR_OPTIONS,
        toolBarItemClick: window.Globals.EDIT_REPORT
    });
});
