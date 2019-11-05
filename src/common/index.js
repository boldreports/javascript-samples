import * as jquery from 'jquery';
window['$'] = jquery;
import './index.css';
import './../controls/globals';
//report-viewer
import '@syncfusion/reporting-javascript/Scripts/reports/ej.report-viewer.min';
//data-visualization
import '@syncfusion/reporting-javascript/Scripts/reports/data-visualization/ej.bulletgraph.min';
import '@syncfusion/reporting-javascript/Scripts/reports/data-visualization/ej.chart.min';
import '@syncfusion/reporting-javascript/Scripts/reports/data-visualization/ej.circulargauge.min';
import '@syncfusion/reporting-javascript/Scripts/reports/data-visualization/ej.lineargauge.min';
import '@syncfusion/reporting-javascript/Scripts/reports/data-visualization/ej.map.min';

import 'bootstrap';
import {
    Header
} from './header/header';
import {
    Sidebar
} from './sidebar/sidebar';
import {
    MainContent
} from './main-content/main-content';
import Prism from 'prismjs';
import * as data from '../controls/samples.json';
let header;

document.addEventListener('DOMContentLoaded', function () {
    header = new Header(document.getElementsByTagName('ej-header')[0]);
    new Sidebar(document.getElementsByTagName('ej-sidebar')[0]);
    new MainContent(document.getElementsByTagName('ej-main-content')[0]);
}, false);

export function onInit() {
    document.querySelector(".splash").classList.add('e-hidden');
    document.querySelector('.ej-body.e-hidden').classList.remove('e-hidden');
    document.querySelector('.mobile-overlay').addEventListener('click', onMobileOverlayClick.bind(this));
    setReportsHeight();
    updateTab();
    document.querySelector('.mobile-overlay').classList.add('e-hidden');
}

export function updateData(sampleData) {
    tocSelection(sampleData);
    loadTabContent(sampleData);
    updateMetaData(sampleData);
}

window.addEventListener('resize', () => {
    setReportsHeight();
    updateTab();
    updateOverlay();
});

function tocSelection(sampleData) {
    let ele = document.querySelectorAll('.ej-sb-toc-card')[data.default.samples.indexOf(sampleData)];
    let previousSelected = document.querySelector('.toc-selected');
    if (previousSelected) {
        previousSelected.classList.remove('toc-selected')
    }
    ele.classList.add('toc-selected');
    ele.focus();
}


async function loadTabContent(sampleData) {
    $('#parentTab li:first-child a').tab('show');
    $('#childtTab li:first-child a').tab('show');
    let childaTab = document.getElementById("childTabContainer");
    let demo = document.getElementsByTagName("ej-sample")[0];
    let html = await fetchFile(`src/controls/${sampleData.directoryName}/${sampleData.routerPath}.html`);
    let js = await fetchFile(`src/controls/${sampleData.directoryName}/${sampleData.routerPath}.js`);
    demo.innerHTML = html;
    eval(js);
    childaTab.getElementsByClassName('html-header')[0].textContent = `${sampleData.routerPath}.html`;
    childaTab.getElementsByClassName('js-header')[0].textContent = `${sampleData.routerPath}.js`;
    childaTab.getElementsByClassName('html-content')[0].innerHTML = Prism.highlight(html, Prism.languages.html);
    childaTab.getElementsByClassName('js-content')[0].innerHTML = Prism.highlight(js, Prism.languages.js);;
}


async function fetchFile(path) {
    let response = await fetch(path);
    let data = await response.text();
    return data;
}


function setReportsHeight() {
    let style = document.getElementById('reports-style');
    if (!style) {
        style = document.createElement('style');
        style.id = 'reports-style';
        document.body.appendChild(style);
    }
    style.textContent = `ej-sample{
      display:block;
      overflow: hidden;
      height: ${window.innerHeight -
        (document.getElementById('parentTabContent').getBoundingClientRect().top - document.body.getBoundingClientRect().top)}px
    }`;
}

function updateOverlay() {
    let mobileOverlay = document.querySelector('.mobile-overlay');
    let mobileSideBar = document.querySelector('ej-sidebar');
    if (!window.matchMedia('(max-width:550px)').matches) {
        mobileSideBar.classList.remove('ej-toc-mobile-slide-left');
        mobileOverlay.classList.add('e-hidden');
    }
}

function onMobileOverlayClick() {
    header.onHamBurgerClick();
}

function updateMetaData(sampleData) {
    var title = sampleData.metaData.title;
    if (!title) {
        title = sampleData.sampleName;
    }
    if (title.length <= 20) {
        document.title = `${title} | JavaScript Report Viewer | Syncfusion`;
    }
    else {
        document.title = `${title} | JavaScript Report Viewer`;
    }
    document.querySelector('meta[name="description"]').setAttribute('content', sampleData.metaData.description);
}

function updateTab() {
    let sourceTab = document.querySelector('.ej-nav-item.source-tab');
    if (window.matchMedia('(max-width:850px)').matches) {
        $('#parentTab li:first-child a').tab('show');
        sourceTab.classList.add('e-hidden');
    } else {
        if (sourceTab.classList.contains('e-hidden')) {
            sourceTab.classList.remove('e-hidden');
        }
    }
}