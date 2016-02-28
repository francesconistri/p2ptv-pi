function PiStreamCtl($q, $http, $interval, $sce) {
    var self = this;

    var init = function()  {
        var refresh = 5000;
        self.loaded = false;

        self.config = null;
        self.sopcast = null;
        self.mplayer = null;
        self.sopcast_urls = [];
        loadSopcastUrls();
        $http.get('/api/config')
            .then(
            function(r) {
                self.config = r.data;
            })
            .then(loadProcesses)
            .then(function() {
            self.loaded = true;
        });

        $interval(loadProcesses, refresh);

    };

    var loadProcesses = function () {
        return $q.all([
            $http.get('/api/sopcast')
                .then(function(r) {
                        self.sopcast = r.data;
                    }),
            $http.get('/api/mplayer')
                .then(function(r) {
                    self.mplayer = r.data;
                }),
        ]);
    }

    var loadSopcastUrls = function() {
        $http.get('/api/sopcast/url')
            .then(function(r) {
                self.sopcast_urls = r.data.data;
            })
    };

    self.launchSopcast = function() {
        $http.post('/api/sopcast', {url: self.sopcast_url}).then(loadProcesses).then(loadSopcastUrls);
    };

    self.launchMplayer = function() {
        $http.post('/api/mplayer', {mplayer_url: self.mplayer_url}).then(loadProcesses);
    }

    self.kill = function(proc) {
        $http.post('/api/kill', {pid: proc.pid}).then(loadProcesses);
    }

    self.killMplayer = function() {
        $http['delete']('/api/mplayer').then(loadProcesses);
    }

    self.getStreamingUrl = function() {
        if (!self.config) {
            return '/static/video.mp4';
        }
        return $sce.trustAsUrl(
            'http://' +
            self.config.DEFAULT_STREAMING_HOST +
            ':' + self.config.DEFAULT_STREAMING_PORT +
            '/tv.asf'
        );
    }

    init()
}

PiStreamCtl.$inject = ['$q', '$http', '$interval', '$sce'];

export default PiStreamCtl;
