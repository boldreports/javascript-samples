import * as jquery from 'jquery';
window['$'] = jquery;
import * as data from './../../../src/controls/samples.json';
window['reportSamples'] = data.default.samples;
import './../../../src/controls/globals';
import './../../../src/controls/rdlcData';

//bootstrap
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

//common
import './index.css';

//report-viewer
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
import './../../../node_modules/@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.min.css';

//report-designer
import './../../../node_modules/@boldreports/javascript-reporting-controls/Content/material/bold.reportdesigner.min.css';
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-designer.min';

//barcode
import './../extensions/report-item-extensions/barcode.css';
import { EJBarcode } from './../extensions/report-item-extensions/barcode';
import { EJQRBarcode } from './../extensions/report-item-extensions/qrbarcode';

let barcode = 'EJBarcode';
let qrBarcode = 'EJQRBarcode';
window[barcode] = EJBarcode;
window[qrBarcode] = EJQRBarcode;

//data-visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';

//code-mirror
import 'codemirror/lib/codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/vb/vb';
import './../../../node_modules/codemirror/lib/codemirror.css';
import './../../../node_modules/codemirror/addon/hint/show-hint.css';

import * as CodeMirror from 'codemirror';
window['CodeMirror'] = CodeMirror;

$(function () {
    let url = location.origin.indexOf('demos.boldreports.com') !== -1 ? '/' : '/demos/';
    document.getElementById('home_page').setAttribute('href', url + 'javascript/#/');
});

window.addEventListener('beforeunload', () => {
    if (window.Globals.DESTROY_REPORT) {
        destroyReportControls();
    } else {
        window.Globals.DESTROY_REPORT = true;
    }
});

function destroyReportControls() {
    const reportViewerElement = document.querySelector('.e-reportviewer.e-js');
    if (reportViewerElement) { $(reportViewerElement).data('boldReportViewer')._ajaxCallMethod("ClearCache", "_clearCurrentServerCache", false); }
}
