export function setRef(variableName, callback, DOMElement) {
    if (DOMElement) {
        this[variableName] = DOMElement;
        if (typeof callback === 'function') {
            callback();
        }
    }
}