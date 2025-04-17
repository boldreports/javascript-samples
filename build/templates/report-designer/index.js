/**
 * Report designer control
 */
var reportName = getReportName();
if (reportName) {
    updateDescription();
} else {
    let metaDes = document.getElementsByName('description')[0].content;
    metaDes = metaDes.replace(/{{sampleName}}/g, 'RDL sample');
    document.getElementsByName('description')[0].content = metaDes;
}

$(function () {
    var url = location.host;
    $("#container").boldReportDesigner({
        // Specifies the URL of the WebAPI service. It will be used for processing the report.
        serviceUrl: window.Globals.DESIGNER_SERVICE_URL,
        // This event will be triggered when the Report Designer widget is created
        create: controlCreate,
        permissionSettings: url.indexOf("demos.boldreports.com") !== -1 ? { dataSource: ej.ReportDesigner.Permission.All & ~ej.ReportDesigner.Permission.Create } : { dataSource: ej.ReportDesigner.Permission.All },
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
        }, {
            name: 'ESignature',
            className: 'EJSignature',
            imageClass: 'customitem-signature',
            displayName: 'Electronic',
            category: 'Signature',
            toolTip:{
                requirements: 'Add a report item to the designer area.',
                description: 'This report item is used to add a graphic signature.',
                title: 'Signature'
            }
        }, {
            name: 'Shape',
            className: 'EJShape',
            imageClass: 'customitem-shape',
            displayName: 'Shape',
            category: 'Shapes',
            toolTip: {
                requirements: 'Add a report item to the designer area',
                description: 'Display the different types of shapes as report item',
                title: 'Shapes'
            }
        }],
        toolbarSettings: {
            items: ej.ReportDesigner.ToolbarItems.All & ~ej.ReportDesigner.ToolbarItems.New & ~ej.ReportDesigner.ToolbarItems.Save & ~ej.ReportDesigner.ToolbarItems.Open
        },
        ajaxBeforeLoad: onAjaxBeforeLoad,
        toolbarRendering: window.Globals.DESIGNER_TOOLBAR_RENDERING,
        toolbarClick: window.Globals.DESIGNER_TOOLBAR_CLICK
    });
});

let designerInst;

function controlCreate() {
    designerInst = $('#container').data('boldReportDesigner');
    designerInst.setModel({
        previewOptions: {
            exportItemClick: window.Globals.EXPORT_ITEM_CLICK,
            toolbarSettings: {
                items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Find
            }
        }
    });
    if (reportName) {
        designerInst.openReport(reportName.indexOf("external-parameter-report") !== -1 ? "product-line-sales.rdl" : reportName.indexOf("parameter-customization") !== -1 ? "product-line-sales.rdl" : reportName);
    }
    if (reportName == "load-large-data.rdl") {
        designerInst.setModel({
            previewOptions: {
                toolbarSettings: {
                    items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Export & ~ej.ReportViewer.ToolbarItems.Print,
                    toolbars: ej.ReportViewer.Toolbars.All & ~ej.ReportViewer.Toolbars.Vertical
                }
            }
        });
    }
    if (reportName == "powerpoint-report.rdl") {
      designerInst.setModel({
        previewOptions: {
          exportSettings: {
            exportOptions: ej.ReportViewer.ExportOptions.PPT
          }
        }
      });
    }
}

function onAjaxBeforeLoad(args) {
    args.data = JSON.stringify({ reportType: "RDL" });
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
    const titleWithBoldReports = (title.length < 45) ? title += ' | Bold Reports' : title;
    document.title = titleWithBoldReports;
    document.querySelector('meta[property="og:title"]').setAttribute('content', titleWithBoldReports);
}

function getReportName() {
    const reportNameRegex = /[\\?&]report-name=([^&#]*)/.exec(location.search);
    return reportNameRegex ? reportNameRegex[1] : undefined;
};
