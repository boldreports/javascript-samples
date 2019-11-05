window.Globals = {
    SERVICE_URL: '/demos/services/api/ReportViewerWebApi',
    DESIGNER_SERVICE_URL: '/demos/services/api/ReportDesignerWebApi',
    TOOLBAR_OPTIONS: {
        showToolbar: true,
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
        }]
    },
    DESTROY_REPORT: true,
    EXPORT_ITEM_CLICK: function () {
        window.Globals.DESTROY_REPORT = false;
    },
    EDIT_REPORT: function (args) {
        if (args.value == "edit-report") {
            let rootPath = location.href.split('#')[0];
            if (location.hash.length < 1) {
                rootPath = location.href.substring(0, location.href.indexOf('report-viewer/'));
            }
            const reportPath = args.model.reportPath;
            const ReportDesignerPath = reportPath.indexOf('.rdlc') !== -1 ? 'report-designer/rdlc/' : 'report-designer/';
            window.open(`${rootPath}${ReportDesignerPath}?report-name=${reportPath}`,
                location.href.indexOf('/preview') === -1 ? '_blank' : '_self');

        }
    },
    DESIGNER_TOOLBAR_RENDERING: function (args) {
        if ($(args.target).hasClass('e-rptdesigner-toolbarcontainer')) {
            var saveButton = ej.buildTag('li.e-rptdesigner-toolbarli e-designer-toolbar-align e-tooltxt', '', {}, {});
            var saveIcon = ej.buildTag('span.e-rptdesigner-toolbar-icon e-toolbarfonticonbasic e-rptdesigner-toolbar-save e-li-item', '', {}, { title: 'Save' });
            args.target.find('ul:first').append(saveButton.append(saveIcon));
        }
    },
    DESIGNER_TOOLBAR_CLICK: function (args) {
        if (args.click === 'Save') {
            args.cancel = true;
            $('#container').data('boldReportDesigner').saveToDevice();
        }
    }
};
