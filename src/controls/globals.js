window.Globals = {
    SERVICE_URL: 'https://reports.syncfusion.com/demos/services/api/SamplesReportViewer',
    DESIGNER_SERVICE_URL: 'https://reports.syncfusion.com/demos/services/api/SamplesReportDesigner',
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
            groupIndex: 3
        }]
    },
    EDIT_REPORT: function (args) {
        if (args.value == "edit-report") {
            var rootPath = location.href.split('#')[0];
            if (location.hash.length < 1) {
                rootPath = location.href.substring(0, location.href.indexOf('report-viewer/'));
            }
            window.open(`${rootPath}report-designer/?report-name=${args.model.reportPath}`, location.hash.length > 0 ? '_blank' : '_self');
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
            $('#container').data('ejReportDesigner').saveToDevice();
        }
    }
};