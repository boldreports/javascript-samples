/**
 * Load Large Data - This RDLC report demonstrates complete details of sales orders in Adventure Works.
 */
$(function () {
    $("#container").boldReportViewer({
        // Specifies the report Web API service URL. It is used to process the reports.
        reportServiceUrl: window.Globals.SERVICE_URL,
        // Specifies the path of the RDL report file
        reportPath: 'load-large-data.rdl',
        toolbarSettings: {
            showToolbar: true,
            items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Export & ~ej.ReportViewer.ToolbarItems.Print,
            toolbars: ej.ReportViewer.Toolbars.All & ~ej.ReportViewer.Toolbars.Vertical,
            customGroups: [{
                items: [{
                    type: 'Default',
                    cssClass: "e-icon e-edit e-reportviewer-icon ej-webicon CustomGroup",
                    prefixIcon: "e-viewer-icons edit",
                    id: "edit-report",
                    // Need to add the proper header and content once, the tool tip issue resolved.
                    tooltip: {
                        header: 'Edit Report',
                        content: 'Edit this report in designer'
                    }
                }],
                groupIndex: 3,
                Index: 1,
                // Need to remove the css (e-reportviewer-toolbarcontainer ul.e-ul:nth-child(4)) once the group index issue resolved
                cssClass: "e-show"
            }]},
        toolBarItemClick: window.Globals.EDIT_REPORT,
        exportItemClick: window.Globals.EXPORT_ITEM_CLICK
    });
});
