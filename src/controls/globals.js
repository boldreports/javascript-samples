window.Globals = {
    SERVICE_URL: '/services/api/ReportViewerWebApi',
    DESIGNER_SERVICE_URL: '/services/api/ReportDesignerWebApi',
    REPORT_CONTROL_ID: 'container',
    TOOLBAR_OPTIONS: {
        showToolbar: true,
        items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Find,
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
            // Need to remove the css (e-reportviewer-toolbarcontainer ul.e-ul:nth-child(4)) once the group index issue resolved
            cssClass: "e-show"
        }]
    },
    EXPORT_OPTIONS: {
        exportOptions: ej.ReportViewer.ExportOptions.PPT
    },
    DESTROY_REPORT: true,
    EXPORT_ITEM_CLICK: function() {
        window.Globals.DESTROY_REPORT = false;
    },
    EDIT_REPORT: function(args) {
        if (args.value == "edit-report") {
            let rootPath = location.href.split('#')[0];
            if (location.hash.length < 1) {
                rootPath = location.href.substring(0, location.href.indexOf('report-viewer/'));
            }
            const reportPath = this.element[0].baseURI.lastIndexOf('external-parameter-report') !== -1 ? 'external-parameter-report' : this.element[0].baseURI.lastIndexOf('parameter-customization') !== -1 ? 'parameter-customization' : args.model.reportPath;
            const ReportDesignerPath = reportPath.indexOf('.rdlc') !== -1 ? 'report-designer/rdlc/' : 'report-designer/';
            window.open(`${rootPath}${ReportDesignerPath}?report-name=${reportPath}`,
                location.href.indexOf('/preview') === -1 ? '_blank' : '_self');

        }
    },
    DESIGNER_TOOLBAR_RENDERING: function(args) {
        var reportControlId = window.Globals.REPORT_CONTROL_ID;
        if (args && args.target && $(args.target).hasClass('e-rptdesigner-toolbarcontainer')) {
            if (args.action === 'beforeCreate') {
                args.items.splice(0, 0, {
                    GroupName: 'customfileactionitems',
                    GroupId: reportControlId + '_custom_fileaction_group',
                    Items: [{
                            prefixIcon: 'b-toolbar-item e-rptdesigner-toolbar-icon e-toolbarfonticonbasic e-rptdesigner-toolbar-new',
                            tooltipText: 'New',
                            id: reportControlId + '_custom_toolbar_btn_new',
                            htmlAttributes: {
                                id: reportControlId + '_custom_toolbar_new',
                                'aria-label': 'New'
                            }
                        },
                        {
                            prefixIcon: 'b-toolbar-item e-toolbarfonticonbasic e-rptdesigner-toolbar-save',
                            tooltipText: 'Save',
                            id: reportControlId + '_custom_toolbar_btn_save',
                            htmlAttributes: {
                                id: reportControlId + '_custom_toolbar_save',
                                'aria-label': 'Save'
                            }
                        }
                    ]
                });
            }
        }
    },
    DESIGNER_TOOLBAR_CLICK: function(args) {
        if (args.click === 'Save') {
            args.cancel = true;
            $('#container').data('boldReportDesigner').saveToDevice();
        }
    }
};
