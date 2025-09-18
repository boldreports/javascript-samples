import * as jquery from 'jquery';
window['$'] = jquery;
import samplesData from './../../../src/controls/samples.json';
window['reportSamples'] = samplesData.samples;
import './../../../src/controls/rdlcData';

//bootstrap
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

//common
import './index.css';

//report-viewer
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/common/bold.reports.common.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/common/bold.reports.widgets.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/bold.report-viewer.min';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.en-US.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.fr-CA.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.de-DE.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.hi-IN.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.es-ES.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.nl-NL.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.ko-KR.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.he-IL.min.js';
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/localization/l10n/ej.localetexts.ru-RU.min.js';
import '@boldreports/javascript-reporting-controls/Content/v2.0/tailwind-light/bold.report-viewer.min.css';

//report-designer
import '@boldreports/javascript-reporting-controls/Scripts/v2.0/bold.report-designer.min'
import '@boldreports/javascript-reporting-controls/Content/v2.0/tailwind-light/bold.report-designer.min.css';

//barcode
import './../extensions/report-item-extensions/barcode.reportitem.css';
import { EJBarcode } from './../extensions/report-item-extensions/barcode.reportitem';
import { EJQRBarcode } from './../extensions/report-item-extensions/qrbarcode.reportitem';

//Document
import './../extensions/report-item-extensions/document.reportitem.css';
import { EJPdfDocument } from './../extensions/report-item-extensions/pdfdocument.reportitem';
import { EJHtmlDocument } from './../extensions/report-item-extensions/htmldocument.reportitem';

//signature
import './../extensions/report-item-extensions/signature.reportitem.css';
import './../extensions/report-item-extensions/signature.dialog.css';
import { EJSignature } from './../extensions/report-item-extensions/signature.reportitem';
import { SignatureDialog } from './../extensions/report-item-extensions/signature.dialog';

//shape
import './../extensions/report-item-extensions/shape.reportitem.css';
import { EJShape } from './../extensions/report-item-extensions/shape.reportitem';

//globals
import './../../../src/controls/globals';

let barcode = 'EJBarcode';
let qrBarcode = 'EJQRBarcode';
window[barcode] = EJBarcode;
window[qrBarcode] = EJQRBarcode;

let signature = 'EJSignature';
let signatureDialog = 'SignatureDialog';
window[signature] = EJSignature;
window[signatureDialog] = SignatureDialog;

let shape = 'EJShape';
window[shape] = EJShape;

let pdfDocument = 'EJPdfDocument';
let htmlDocument = 'EJHtmlDocument';
window[pdfDocument] = EJPdfDocument;
window[htmlDocument] = EJHtmlDocument;

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

$(function() {
    document.getElementById('home_page').setAttribute('href', '/javascript/#/');
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
