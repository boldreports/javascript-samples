/**
 * Report designer control
 */
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
            name: 'qrbarcode',
            className: 'EJQRBarcode',
            imageClass: 'customitem-qrbarcode',
            displayName: 'QR Barcode',
            category: 'Barcodes',
            toolTip: {
                requirements: 'Add a report item to the designer area.',
                description: 'Display the barcode lines as report item.',
                title: 'QR Barcode'
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
    let reportName = getReportName();
    designerInst.setModel({
        reportType: 'RDLC',
        previewReport: previewReport
    });
    if (reportName) {
        updateDescription();
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
        datasource = rdlcData[reportNameWithoutExt];
        args.cancelDataInputDialog = true;
        args.dataSets = datasource;        
    }
}

function updateDescription() {
    var sampleName = location.search.split('=')[1].split('.')[0];
    var reportSampleData = window.reportSamples.filter(function (sample) {
        return (sample.routerPath === sampleName)
    })[0];
    title = reportSampleData.metaData.title;
    if (!title) {
        title = reportSampleData.sampleName;
    }
    var metaDes = document.getElementsByName('description')[0].content;
    metaDes = metaDes.replace(/{{sampleName}}/g, title);
    document.getElementsByName('description')[0].content = metaDes;
    var title = title + ' | JavaScript Report Designer';
    document.title = title;
    if (title.length < 45) {
        document.title = title + ' | Bold Reports';
    }
}

function getReportName() {
    const reportNameRegex = /[\\?&]report-name=([^&#]*)/.exec(location.search);
    return reportNameRegex ? reportNameRegex[1] : undefined;
};
