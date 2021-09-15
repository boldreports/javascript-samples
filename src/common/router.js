import * as data from '../controls/samples.json';
import * as hasher from 'hasher';
import {
    onInit,
    updateData
} from './index';

export function routerInit() {
    onInit();
    hasher.changed.add(hashHandler);
    hasher.initialized.add(hashHandler);
    hasher.init();
}

function hashHandler(newHash, oldHash) {
    let sampleData;
    let defaultSampleData = data.default.samples[0];
    let defaultReportPath = defaultSampleData.routerPath ? (defaultSampleData.basePath + '/' + defaultSampleData.routerPath) : defaultSampleData.basePath;
    if (oldHash === undefined) { //initial loading
        if (newHash === '') {
            hasher.setHash(defaultReportPath);
            sampleData = defaultSampleData;
        } else {
            let routerData = getRouterData(newHash);
            sampleData = data.default.samples.filter((sample) => sample.routerPath === routerData.reportRouterPath && sample.basePath === routerData.reportBasePath)[0];
        }
    } else {
        if (newHash && oldHash) { //sample switching
            let reportViewerElement = document.querySelector('.e-reportviewer.e-js');
            if (reportViewerElement) {
                let reportInstance = $(reportViewerElement).data('boldReportViewer');
                reportInstance.destroy();
            }
            let routerData = getRouterData(newHash);
            sampleData = data.default.samples.filter((sample) => sample.routerPath === routerData.reportRouterPath && sample.basePath === routerData.reportBasePath)[0];
        }
    }
    if (!sampleData) {
        hasher.setHash(defaultReportPath);
    } else {
        updateData(sampleData);
    }
}

export function getRouterData(path, basePathIndex = 0, routerPathIndex = 1) {
    const modifiedUrl = path.indexOf('?') !== -1 ? path.substring(0, path.indexOf('?')) : path;
    const spilttedUrl = modifiedUrl.split('/');
    const reportBasePath = spilttedUrl[basePathIndex];
    const reportRouterPath = spilttedUrl[routerPathIndex] ? spilttedUrl[routerPathIndex] : '';
    return { reportBasePath: reportBasePath, reportRouterPath: reportRouterPath };
}