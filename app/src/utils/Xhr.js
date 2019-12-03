
class Xhr {
    static baseUrl = '';
    constructor(endpoint, options = {}) {
        this.endpoint = endpoint;
        this.options = options;
        this.body = this.options.body ? JSON.stringify(this.options.body) : null;
        this.result = this.result.bind(this);
        this.abort = this.abort.bind(this);
        this.initNativeXhr = this.initNativeXhr.bind(this);
        this.initNativeXhr();
    }
    initNativeXhr() {
        this.xhr = new XMLHttpRequest();
        this.xhr.open(this.options.method ? this.options.method.toUpperCase() : 'GET', Xhr.baseUrl + this.endpoint);
        this.xhr.send(this.body);
    }
    abort() {
        if (this.xhr.readyState < 4 && this.xhr.readyState > 0) {
            this.xhr.abort();
        }
    }
    result() {
        return new Promise((resolve, reject) => {
            this.xhr.onload = () => {
                if (this.xhr.status >= 200 && this.xhr.status <= 300) {
                    resolve(JSON.parse(this.xhr.response))
                } else {
                    reject(JSON.parse(this.xhr.response))
                }
            }
            this.xhr.onerror = () => {
                reject({
                    message: 'Network conection error.'
                })
            }
        })
    }
}
export default Xhr;