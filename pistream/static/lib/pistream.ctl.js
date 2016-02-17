
class PiStreamCtl {
    constructor ($http) {
        this._ = {};
        this._.$http = $http;
        this.processes = [];
        this.loadProcesses();
        this.url = null;

    }

    loadProcesses () {
        this._.$http.get('/api/sopcast')
            .then(
                (r) => {this.sopcast = r.data;}
            );
        this._.$http.get('/api/mplayer')
            .then(
                (r) => {this.mplayer = r.data;}
            );
    }

    launchSopcast () {
        this._.$http.post('/api/sopcast', {url: this.url}).then(loadProcesses);
    }

    launchMplayer () {
        this._.$http.post('/api/mplayer', {url: this.url}).then(loadProcesses);
    }



}

PiStreamCtl.$inject = ['$http', ];

export default PiStreamCtl;
