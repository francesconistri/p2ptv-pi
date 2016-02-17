
class PiStreamCtl {
    constructor ($http) {
        this._ = {};
        this._.$http = $http;
        this.processes = [];
        this.loadProcesses();
        this.url = null;

    }

    loadProcesses () {
        this._.$http.get('/api/process')
            .then(
                (r) => {this.processes = r.data.processes;}
            );
    }
    openUrl () {
        this._.$http.post('/api/sopcast', {url: this.url}).then(loadProcesses);
    }


}

PiStreamCtl.$inject = ['$http'];

export default PiStreamCtl;
