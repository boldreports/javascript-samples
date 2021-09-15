import * as jquery from 'jquery';
window['$'] = jquery;
import './index.css';
import './../controls/globals';
import './../controls/rdlcData';
//report-viewer
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
//data-visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';

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
import {
    routerInit
} from './router';
let header, sidebar, maincontent;

document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);

async function onDOMContentLoaded() {
    header = new Header(document.getElementsByTagName('ej-header')[0]);
    sidebar = new Sidebar(document.getElementsByTagName('ej-sidebar')[0]);
    maincontent = new MainContent(document.getElementsByTagName('ej-main-content')[0]);
    await header.init();
    await sidebar.init();
    await maincontent.init();
    routerInit();
}

export function onInit() {
    document.querySelector(".splash").classList.add('e-hidden');
    document.querySelector('.ej-body.e-hidden').classList.remove('e-hidden');
    document.querySelector('.mobile-overlay').addEventListener('click', onMobileOverlayClick.bind(this));
    updateTab();
    document.querySelector('.mobile-overlay').classList.add('e-hidden');
    document.querySelector('.ej-overlay').classList.add('e-hidden');
    window.addEventListener('resize', () => {
        onResize();
    });
}

export function updateData(sampleData) {
    tocSelection(sampleData);
    updateSampleDetails(sampleData);
    loadTabContent(sampleData);
    updateMetaData(sampleData);
    setReportsHeight();
}

function onResize() {
    setReportsHeight();
    updateTab();
    updateMobileOverlay();
}

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
    let descriptionElement = document.getElementById("ej-description");
    let demo = document.getElementsByTagName("ej-sample")[0];
    let fileName = sampleData.routerPath ? sampleData.routerPath : sampleData.basePath;
    let reportRouterPath = sampleData.routerPath ? sampleData.routerPath : sampleData.basePath;
    let html = await fetchFile(`src/controls/${reportRouterPath}/${fileName}.html`);
    let js = await fetchFile(`src/controls/${reportRouterPath}/${fileName}.js`);
    let description = new DOMParser().parseFromString(html, 'text/html').getElementById("description");
    html = getStringWithOutDescription(html, /(\'|\")description/g);
    demo.innerHTML = html;
    eval(js);
    childaTab.getElementsByClassName('html-header')[0].textContent = `${fileName}.html`;
    childaTab.getElementsByClassName('js-header')[0].textContent = `${fileName}.js`;
    childaTab.getElementsByClassName('html-content')[0].innerHTML = Prism.highlight(html, Prism.languages.html);
    childaTab.getElementsByClassName('js-content')[0].innerHTML = Prism.highlight(js, Prism.languages.js);
    descriptionElement.innerHTML = '';
    descriptionElement.appendChild(description);
}

async function fetchFile(path) {
    let response = await fetch(path);
    let data = await response.text();
    return data;
}

function updateSampleDetails(sampleData) {
    let titleElement = document.querySelector('.ej-main-body-content .ej-title');
    let metaDescriptionElement = document.querySelector('.ej-main-body-content .ej-meta-description');
    titleElement.innerText = sampleData.sampleName;
    metaDescriptionElement.innerText = sampleData.metaData.description;
}


function getStringWithOutDescription(code, descRegex) {
    const lines = code.split('\n');
    let desStartLine = null;
    let desEndLine = null;
    let desInsideDivCnt = 0;
    for (let i = 0; i < lines.length; i++) {
        const curLine = lines[i];
        if (desStartLine) {
            if (/<div/g.test(curLine)) {
                desInsideDivCnt = desInsideDivCnt + 1;
            }
            if (desInsideDivCnt && /<\/div>/g.test(curLine)) {
                desInsideDivCnt = desInsideDivCnt - 1;
            } else if (!desEndLine && /<\/div>/g.test(curLine)) {
                desEndLine = i + 1;
            }
        }
        if (descRegex.test(curLine)) {
            desStartLine = i;
        }
    }
    if (desEndLine && desStartLine) {
        lines.splice(desStartLine, desEndLine - desStartLine);
    }
    return lines.join('\n');
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

function updateMobileOverlay() {
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
    let title = sampleData.metaData.title;
    if (!title) {
        title = sampleData.sampleName;
    }
    title = `${title} | JavaScript Report Viewer`;
    if (title.length < 45) {
        title = `${title} | Bold Reports`;
    }
    document.title = title;
    document.querySelector('meta[name="title"]').setAttribute('content', title);
    document.querySelector('meta[name="description"]').setAttribute('content', sampleData.metaData.description);
}

function updateTab() {
    let sourceTab = document.querySelector('.ej-nav-item.source-tab');
    let descTab = document.querySelector('.ej-nav-item.desc-tab');
    if (window.matchMedia('(max-width:850px)').matches) {
        $('#parentTab li:first-child a').tab('show');
        sourceTab.classList.add('e-hidden');
        descTab.classList.add('e-hidden');
    } else {
        if (sourceTab.classList.contains('e-hidden')) {
            sourceTab.classList.remove('e-hidden');
            descTab.classList.remove('e-hidden');
        }
    }
}

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