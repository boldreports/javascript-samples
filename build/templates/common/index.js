import * as jquery from 'jquery';
window['$'] = jquery;
import './../../../src/controls/globals'

//report-viewer
import '@syncfusion/reporting-javascript/Scripts/reports/ej.report-viewer.min';
import './../../../node_modules/@syncfusion/reporting-javascript/Content/reports/material/ej.reports.all.min.css';

//report-designer
import './../../../node_modules/@syncfusion/reporting-javascript/Content/reports/material/ej.reportdesigner.min.css';
import '@syncfusion/reporting-javascript/Scripts/reports/ej.report-designer.min';
import './../report-designer/extensions/report-item-extensions/barcode.css';
import { EJBarcode } from './../report-designer/extensions/report-item-extensions/barcode';
import { EJQRBarcode } from './../report-designer/extensions/report-item-extensions/qrbarcode';

let barcode = 'EJBarcode';
let qrBarcode = 'EJQRBarcode';
window[barcode] = EJBarcode;
window[qrBarcode] = EJQRBarcode;

//data-visualization
import '@syncfusion/reporting-javascript/Scripts/reports/data-visualization/ej.bulletgraph.min';
import '@syncfusion/reporting-javascript/Scripts/reports/data-visualization/ej.chart.min';
import '@syncfusion/reporting-javascript/Scripts/reports/data-visualization/ej.circulargauge.min';
import '@syncfusion/reporting-javascript/Scripts/reports/data-visualization/ej.lineargauge.min';
import '@syncfusion/reporting-javascript/Scripts/reports/data-visualization/ej.map.min';

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
