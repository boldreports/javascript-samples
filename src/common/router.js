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
    hasher.prependHash = '/report-viewer/';
    hasher.init();
}

function hashHandler(newHash, oldHash) {
    let sampleData;
    if (oldHash === undefined) { //initial loading
        if (newHash === '') {
            hasher.setHash(data.default.samples[0].routerPath);
            sampleData = data.default.samples[0];
        } else {
            sampleData = data.default.samples.filter((sample) => sample.routerPath === newHash)[0];
        }
    } else {
        if (newHash && oldHash) { //sample switching
            let reportViewerElement = document.querySelector('.e-reportviewer.e-js');
            if(reportViewerElement){
             let reportInstance = $(reportViewerElement).data('ejReportViewer');
             reportInstance.destroy();
            }
            sampleData = data.default.samples.filter((sample) => sample.routerPath === newHash)[0];
        }
    }
    if (!sampleData) {
        hasher.setHash(data.default.samples[0].routerPath);
    } else {
        updateData(sampleData);
    }

}