import * as data from '../../controls/samples.json';
import * as hasher from 'hasher';
export class Sidebar {
    constructor(element) {
        this.element = element;
        this.init();
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
            tocCard.setAttribute('data-mode', samples[i].imageDetails.isLandscape ? 'ej-landscape' : 'ej-portrait');
            tocCard.setAttribute('data-uid', i);
            tocCard.classList.add('ej-sb-toc-card');
            tocCard.tabIndex = -1;
            let img = document.createElement("img");
            img.alt = samples[i].sampleName;
            img.src = `assets/sidebar/${samples[i].imageDetails.imageName}`;
            let title = document.createElement('div');
            title.classList.add('ej-sb-toc-title');
            title.textContent = samples[i].sampleName;
            tocCard.appendChild(img);
            tocCard.appendChild(title);
            toc.appendChild(tocCard);
        }
        let style = document.createElement('style');
        style.textContent = await this.fetchFile('src/common/sidebar/sidebar.css');
        this.element.appendChild(style);
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
            hasher.setHash(data.default.samples[index].routerPath);
        }
    }

    onHomeBtnClick() {
        hasher.setHash(data.default.samples[0].routerPath);
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