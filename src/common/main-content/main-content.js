import {
    routerInit
} from './../router';
import * as data from '../../controls/samples.json';
import * as hasher from 'hasher';

export class MainContent {
    constructor(element) {
        this.element = element;
        this.init();
    }

    async init() {
        this.element.innerHTML = await this.fetchFile('src/common/main-content/main-content.html');
        this.element.getElementsByClassName('ej-nav-new')[0].addEventListener('click', this.onTabBtnClick.bind(this));
        this.element.getElementsByClassName('ej-nav-prev')[0].addEventListener('click', this.onTabPrev.bind(this));
        this.element.getElementsByClassName('ej-nav-next')[0].addEventListener('click', this.onTabNext.bind(this));
        var style = document.createElement('style');
        style.textContent = await this.fetchFile('src/common/main-content/main-content.css');
        this.element.appendChild(style);
        routerInit();
    }

    async fetchFile(path) {
        let response = await fetch(path);
        let data = await response.text();
        return data;
    }
    isUndefined(value) {
        return ('undefined' === typeof value);
    }

    onTabBtnClick() {
        const sampleData = data.default.samples.filter((sample) => sample.routerPath === hasher.getHash())[0];
        if (sampleData) {
            window.open(`${location.href.split('#')[0]}report-viewer/${sampleData.routerPath}/preview/`, '_blank');
        }
    }

    onTabPrev() {
        let samples = data.default.samples;
        const curRouterData = this.getCurRouterData();
        const curRouterIndex = curRouterData.curIndex;
        const sampleData = !this.isUndefined(curRouterIndex) ?
            (curRouterData.isFirst ? samples[data.samples.length - 1] : samples[curRouterIndex - 1]) : data.samples[0];
        hasher.setHash(sampleData.routerPath);
    }

    onTabNext() {
        let samples = data.default.samples;
        const curRouterData = this.getCurRouterData();
        const curRouterIndex = curRouterData.curIndex;
        const sampleData = !this.isUndefined(curRouterIndex) ?
            (curRouterData.isLast ? samples[0] : samples[curRouterIndex + 1]) : samples[0];
        hasher.setHash(sampleData.routerPath);
    }

    getCurRouterData() {
        const curData = {
            curIndex: undefined,
            isFirst: undefined,
            isLast: undefined
        };
        let samples = data.default.samples;
        samples.some((sample, index) => {
            if (sample.routerPath === hasher.getHash()) {
                curData.curIndex = index;
                return true;
            } else {
                return false;
            }
        });
        if (!this.isUndefined(curData.curIndex)) {
            curData.isFirst = curData.curIndex === 0 ? true : false;
            curData.isLast = curData.curIndex === (samples.length - 1) ? true : false;
        }
        return curData;
    }
}