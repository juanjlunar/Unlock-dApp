import { dateHumanize } from './dateFunctions';
import BigNumber from 'bignumber.js';

export function setRef(variableName, callback, DOMElement) {
    if (DOMElement) {
        this[variableName] = DOMElement;
        if (typeof callback === 'function') {
            callback();
        }
    }
}
export function renderColumnAccordingLabel(obj, key) {
    const { data } = this.props;
    if (key === 'goal') {
        return toEther(data[key]);
    }
    if (key === 'title') {
        return data[key].split(/\/\//)[0];
    }
    if (key === 'size') {
        return data.title.split(/\/\//)[1];
    }
    if (key === 'type') {
        return data.title.split(/\/\//)[2];
    }
    if (key === 'fileLink') {
        return data[key] === 'Hidden' ? data[key] : 'Available';
    }
    if (key === 'dateCreated') 
        return dateHumanize(parseInt(data[key]));
    return data[key];
}
export function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]};

export function toEther(value) {
    return BigNumber(value).dividedBy('1000000000000000000').toString();
}
export function toWei(value) {
    return BigNumber(value).multipliedBy('1000000000000000000').toString();
}