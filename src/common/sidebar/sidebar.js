import * as data from '../../controls/samples.json';
import * as hasher from 'hasher';

export class Sidebar {
    constructor(element) {
        this.element = element;
    }

    async init() {
        let samples = data.default.samples;
        this.element.innerHTML = await this.fetchFile('src/common/sidebar/sidebar.html');
        let toc = this.element.getElementsByClassName('ej-sb-toc')[0];
        toc.addEventListener('mousedown', this.onTocClick.bind(this));
        let homeElement = this.element.getElementsByClassName('ej-sb-home')[0];
        homeElement.addEventListener('click', this.onHomeBtnClick.bind(this));
        for (let i = 0; i < samples.length; i++) {
            let tocCard = document.createElement('div');
            tocCard.setAttribute('data-uid', i);
            tocCard.classList.add('ej-sb-toc-card');
            tocCard.tabIndex = -1;
            var isLandscape = samples[i].imageDetails.isLandscape;
            let img = document.createElement("div");
            img.classList.add(isLandscape ? 'ej-landscape-img' : 'ej-portrait-img');
            img.style.backgroundPositionY = -(isLandscape ? samples[i].imageDetails.index * 70 :
                samples[i].imageDetails.index * 120) + 'px';
            let title = document.createElement('div');
            title.classList.add('ej-sb-toc-title');
            title.textContent = samples[i].sampleName;
            tocCard.appendChild(img);
            tocCard.appendChild(title);
            var status = samples[i].status;
            if (!ej.isNullOrUndefined(status) && (status.toUpperCase() == 'UPDATED' || status.toUpperCase() == 'NEW')) {
                let label = document.createElement("span");
                label.classList.add(isLandscape ? 'ej-landscape' : 'ej-portrait', 'ej-status-label', `ej-${status.toLowerCase()}`);
                label.textContent = status.toUpperCase();
                tocCard.appendChild(label);
            }
            toc.appendChild(tocCard);
        }
    }
    async fetchFile(path) {
        let response = await fetch(path);
        let data = await response.text();
        return data;
    }

    onTocClick(e) {
        e.preventDefault();
        let ele = this.closest(e.target, '.ej-sb-toc-card');
        if (ele) {
            let index = ele.getAttribute('data-uid');
            let sampleData = data.default.samples[index];
            const reportPath = sampleData.routerPath ? (sampleData.basePath + '/' + sampleData.routerPath) : sampleData.basePath;
            hasher.setHash(reportPath);
        }
    }

    onHomeBtnClick() {
        let homePageUrl = location.origin.indexOf('demos.boldreports.com') !== -1 ? '/home/' : '/';
        location.href = location.origin + homePageUrl;
    }

    closest(element, selector) {
        let el = element;
        if (typeof el.closest === 'function') {
            return el.closest(selector);
        }

        while (el && el.nodeType === 1) {
            if (this.matches(el, selector)) {
                return el;
            }

            el = el.parentNode;
        }

        return null;
    }

    matches(element, selector) {
        let matches = element.matches || element.msMatchesSelector || element.webkitMatchesSelector;
        if (matches) {
            return matches.call(element, selector);
        } else {
            return [].indexOf.call(document.querySelectorAll(selector), element) !== -1;
        }
    }
}