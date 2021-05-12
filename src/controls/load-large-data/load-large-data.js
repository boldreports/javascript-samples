/**
 * Load Large Data - This RDLC report demonstrates complete details of sales orders in Adventure Works.
 */
$(function () {
    $("#container").boldReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'load-large-data.rdlc',
        toolbarSettings: {
            showToolbar: true,
            items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Export & ~ej.ReportViewer.ToolbarItems.Print & ~ej.ReportViewer.ToolbarItems.ExportSetup,
            customGroups: [{
                items: [{
                    type: 'Default',
                    cssClass: "e-icon e-edit e-reportviewer-icon ej-webicon CustomGroup",
                    id: "edit-report",
                    // Need to add the proper header and content once, the tool tip issue resolved.
                    tooltip: {
                        header: 'Edit Report',
                        content: 'Edit this report in designer'
                    }
                }],
                // Need to remove the css (e-reportviewer-toolbarcontainer ul.e-ul:nth-child(4)) once the group index issue resolved
                groupIndex: 3,
                cssClass: "e-show"
            }]},
        toolBarItemClick: window.Globals.EDIT_REPORT,
        reportLoaded: onReportLoaded,
        processingMode: 'Local',
        exportItemClick: window.Globals.EXPORT_ITEM_CLICK
    });
});

function onReportLoaded(args) {
}
