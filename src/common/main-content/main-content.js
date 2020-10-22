import {
    getRouterData
} from './../router';
import * as data from '../../controls/samples.json';
import * as hasher from 'hasher';

export class MainContent {
    constructor(element) {
        this.element = element;
    }

    async init() {
        this.element.innerHTML = await this.fetchFile('src/common/main-content/main-content.html');
        this.element.getElementsByClassName('ej-nav-new')[0].addEventListener('click', this.onTabBtnClick.bind(this));
        this.element.getElementsByClassName('ej-nav-prev')[0].addEventListener('click', this.onTabPrev.bind(this));
        this.element.getElementsByClassName('ej-nav-next')[0].addEventListener('click', this.onTabNext.bind(this));
        $('a[data-toggle="tab"][href="#demo"]').on('shown.bs.tab', this.resizeReportViewer);
    }

    async fetchFile(path) {
        let response = await fetch(path);
        let data = await response.text();
        return data;
    }

    togglePopup() {
        let overlay = document.querySelector('.ej-overlay');
        overlay.classList.remove('e-hidden');
        setTimeout(() => {
            overlay.classList.add('e-hidden');
        });
    }

    resizeReportViewer() {
        const reportViewerElement = document.querySelector('.e-reportviewer.e-js');
        if (reportViewerElement) $(reportViewerElement).trigger('resize');
    }

    onTabBtnClick() {
        let routerData = getRouterData(hasher.getHash());
        const sampleData = data.default.samples.filter((sample) => sample.routerPath === routerData.reportRouterPath && sample.basePath === routerData.reportBasePath)[0];
        const reportPath = sampleData.routerPath ? (sampleData.basePath + '/' + sampleData.routerPath) : sampleData.basePath;
        window.open(`${location.href.split('#')[0]}${reportPath}/preview/`, '_blank');
    }

    onTabPrev() {
        this.togglePopup();
        let samples = data.default.samples;
        const curRouterData = this.getCurRouterData();
        const curRouterIndex = curRouterData.curIndex;
        const sampleData = curRouterData.isFirst ? samples[data.samples.length - 1] : samples[curRouterIndex - 1];
        const reportPath = sampleData.routerPath ? (sampleData.basePath + '/' + sampleData.routerPath) : sampleData.basePath;
        hasher.setHash(reportPath);
    }

    onTabNext() {
        this.togglePopup();
        let samples = data.default.samples;
        const curRouterData = this.getCurRouterData();
        const curRouterIndex = curRouterData.curIndex;
        const sampleData = curRouterData.isLast ? samples[0] : samples[curRouterIndex + 1];
        const reportPath = sampleData.routerPath ? (sampleData.basePath + '/' + sampleData.routerPath) : sampleData.basePath;
        hasher.setHash(reportPath);
    }

    getCurRouterData() {
        const curData = {
            curIndex: undefined,
            isFirst: undefined,
            isLast: undefined
        };
        let samples = data.default.samples;
        let routerData = getRouterData(hasher.getHash());
        samples.some((sample, index) => {
            if (sample.routerPath === routerData.reportRouterPath && sample.basePath === routerData.reportBasePath) {
                curData.curIndex = index;
                return true;
            } else {
                return false;
            }
        });
        curData.isFirst = curData.curIndex === 0 ? true : false;
        curData.isLast = curData.curIndex === (samples.length - 1) ? true : false;
        return curData;
    }
}