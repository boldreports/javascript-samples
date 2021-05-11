/**
 * Report designer control
 */
var reportName = getReportName();
if (reportName) {
    updateDescription();
} else {
    let metaDes = document.getElementsByName('description')[0].content;
    metaDes = metaDes.replace(/{{sampleName}}/g, 'RDLC sample');
    document.getElementsByName('description')[0].content = metaDes;
}

$(function () {
    $("#container").boldReportDesigner({
        // Specifies the URL of the WebAPI service. It will be used for processing the report.
        serviceUrl: window.Globals.DESIGNER_SERVICE_URL,
        // This event will be triggered when the Report Designer widget is created
        create: controlCreate,
        reportItemExtensions: [{
            name: 'barcode',
            className: 'EJBarcode',
            imageClass: 'customitem-barcode',
            displayName: '1D Barcode',
            category: 'Barcodes',
            toolTip: {
                requirements: 'Add a report item to the designer area.',
                description: 'Display the barcode lines as report item.',
                title: 'Barcode'
            }
        }, {
            name: 'matrixbarcode',
            className: 'EJQRBarcode',
            imageClass: 'customitem-qrbarcode',
            displayName: '2D Barcode',
            category: 'Barcodes',
            toolTip: {
                requirements: 'Add a report item to the designer area.',
                description: 'Display the barcode lines as report item.',
                title: '2D Barcode'
            }
        }],
        toolbarSettings: {
            items: ej.ReportDesigner.ToolbarItems.All & ~ej.ReportDesigner.ToolbarItems.Save
        },
        ajaxBeforeLoad: onAjaxBeforeLoad,
        reportOpened: onReportOpened,
        toolbarRendering: window.Globals.DESIGNER_TOOLBAR_RENDERING,
        toolbarClick: window.Globals.DESIGNER_TOOLBAR_CLICK
    });
});

let designerInst;
let isServerReoport;

function controlCreate() {
    designerInst = $('#container').data('boldReportDesigner');
    if (reportName == "load-large-data.rdlc") {
        designerInst.setModel({
            reportType: 'RDLC',
            previewReport: previewReport,
            previewOptions: {
                exportItemClick: window.Globals.EXPORT_ITEM_CLICK,
                toolbarSettings: {
                    items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Export & ~ej.ReportViewer.ToolbarItems.Print
                }
            }
        });
    }
    else {
        designerInst.setModel({
            reportType: 'RDLC',
            previewReport: previewReport,
            previewOptions: {
                exportItemClick: window.Globals.EXPORT_ITEM_CLICK
            }
        });
    }
    if (reportName) {
        designerInst.openReport(reportName);
    }
}

function onAjaxBeforeLoad(args) {
    args.data = JSON.stringify({ reportType: "RDLC" });
}

function onReportOpened(args) {
    isServerReoport = args.isServerReport;
}

function previewReport(args) {
    if (isServerReoport) {
        let reportPath = args.model.reportPath;
        reportPath = reportPath.indexOf('//') !== -1 ? reportPath.substring(2) : reportPath
        let reportNameWithoutExt = reportPath.split(".rdlc")[0];
        if (reportNameWithoutExt != "load-large-data") {
            datasource = rdlcData[reportNameWithoutExt];
            args.dataSets = datasource;
        }
        args.cancelDataInputDialog = true;
    }
}

function updateDescription() {
    var sampleName = location.search.split('=')[1].split('.')[0];
    var reportSampleData = window.reportSamples.filter(function (sample) {
        return (sample.routerPath === sampleName)
    })[0];
    let title = reportSampleData.metaData.title;
    if (!title) {
        title = reportSampleData.sampleName;
    }
    var metaDes = document.getElementsByName('description')[0].content;
    metaDes = metaDes.replace(/{{sampleName}}/g, title);
    document.getElementsByName('description')[0].content = metaDes;
    title += ' | JavaScript Report Designer';
    document.title = title.length < 45 ? title += ' | Bold Reports' : title;
}

function getReportName() {
    const reportNameRegex = /[\\?&]report-name=([^&#]*)/.exec(location.search);
    return reportNameRegex ? reportNameRegex[1] : undefined;
};
