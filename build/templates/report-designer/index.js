/**
 * Report designer control
 */
$(function () {
    $("#container").ejReportDesigner({
        // Specifies the URL of the WebAPI service. It will be used for processing the report.
        serviceUrl: window.Globals.DESIGNER_SERVICE_URL,
        // This event will be triggered when the Report Designer widget is created
        create: 'controlCreate',
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
        toolbarRendering: window.Globals.DESIGNER_TOOLBAR_RENDERING,
        toolbarClick: window.Globals.DESIGNER_TOOLBAR_CLICK
    });
});

// Open the RDL files in report designer
function controlCreate() {
    if (location.search) {
        updateDescription();
        var designer = $('#container').data('ejReportDesigner');
        // This method opens the report from the Server.
        designer.openReport(location.search.split('=')[1]);
    }
}

function updateDescription() {
    var sampleName = location.search.split('=')[1].split('.')[0].replace(/-/g, ' ');
    var formattedSampleName = "";
    sampleName.replace(/\w\S*/g, function (value) {
        formattedSampleName += value.charAt(0).toUpperCase() + value.substr(1).toLowerCase() + " ";
    });
    var metaDes = document.getElementsByName('description')[0].content;
    var title = formattedSampleName + ' | JavaScript Report Designer';
    document.title = title;
    if (title.length < 45) {
        document.title = title + ' | Syncfusion';
    }
    metaDes = metaDes.replace(/{{sampleName}}/g, formattedSampleName);
    document.getElementsByName('description')[0].content = metaDes;
}