import {
    getRouterData
} from './../router';
import * as data from '../../controls/samples.json';
import * as hasher from 'hasher';

export class Header {
    constructor(element) {
        this.element = element;
    }

    async init() {
        this.element.innerHTML = await this.fetchFile('src/common/header/header.html');
        let otherPlatforms = Object.keys(data.default.otherPlatforms);
        let dropDownItems = this.element.querySelector('.dropdown-menu');
        dropDownItems.addEventListener('click', this.platformSwitcher.bind(this));
        this.createdropdownItem(data.default.platform, dropDownItems, true);
        for (let i = 0; i < otherPlatforms.length; i++) {
            this.createdropdownItem(otherPlatforms[i].trim(), dropDownItems);
        }
        this.element.getElementsByClassName('ej-sb-hamburger-icon')[0].addEventListener('click', this.onHamBurgerClick.bind(this));
    }
    async fetchFile(path) {
        let response = await fetch(path);
        let data = await response.text();
        return data;
    }

    createdropdownItem(text, target, isActive = false) {
        let dropDownItem = document.createElement('a');
        dropDownItem.innerText = text;
        dropDownItem.classList.add('dropdown-item');
        if (isActive) {
            dropDownItem.classList.add('active');
        }
        target.appendChild(dropDownItem);
    }

    onHamBurgerClick() {
        if (window.matchMedia('(max-width:550px)').matches) {
            let mobileOverlay = document.querySelector('.mobile-overlay');
            let mobileSideBar = document.querySelector('ej-sidebar');
            if (mobileSideBar.classList.contains('ej-toc-mobile-slide-left')) {
                mobileSideBar.classList.remove('ej-toc-mobile-slide-left');
                mobileOverlay.classList.add('e-hidden');
            } else {
                mobileSideBar.classList.add('ej-toc-mobile-slide-left');
                mobileOverlay.classList.remove('e-hidden');
            }
        } else {
            let desktopSidebar = document.querySelector('.ej-main-parent-content');
            let classFn = desktopSidebar.classList.contains('ej-toc-slide-left') ? 'remove' : 'add';
            desktopSidebar.classList[classFn]('ej-toc-slide-left');
        }
    }

    platformSwitcher(e) {
        if (e.target.tagName == 'A') {
            let targetPlatform = e.target.innerText.trim();
            let routerData = getRouterData(hasher.getHash());
            let platformBasePath;
            let platformSamplePath;
            const sampleName = routerData.reportRouterPath ? routerData.reportRouterPath : routerData.reportBasePath;
            if (routerData.reportRouterPath) {
                platformBasePath = this.getRouterPath(data.default.platform, targetPlatform, routerData.reportBasePath);
            }
            platformSamplePath = this.getRouterPath(data.default.platform, targetPlatform, sampleName);
            const reportPath = routerData.reportRouterPath ? (platformBasePath + '/' + platformSamplePath) : platformSamplePath;
            let url = location.origin.indexOf('demos.boldreports.com') !== -1 ? '/' : '/demos/';
            window.open(location.origin + url + data.default.otherPlatforms[targetPlatform] + reportPath, '_self');

        }
    }

    getRouterPath(curPlatform, targetplatform, sampleName) {
        curPlatform = curPlatform.toLowerCase();
        targetplatform = targetplatform.toLowerCase();
        const samePath = (curPlatform.indexOf('asp') === -1 && targetplatform.indexOf('asp') === -1) ||
            (curPlatform.indexOf('asp') >= 0 && targetplatform.indexOf('asp') >= 0);
        if (samePath) {
            return sampleName;
        } else {
            if (curPlatform.indexOf('asp') !== -1) {
                return sampleName.split(/(?=[A-Z])/).map((name) => {
                    return name.toLowerCase();
                }).join('-');

            } else {
                return sampleName.split(/-/).map((name) => {
                    return name.charAt(0).toUpperCase() + name.slice(1);
                }).join('');

            }
        }
    }
}