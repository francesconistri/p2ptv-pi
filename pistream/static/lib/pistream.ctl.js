function PiStreamCtl($q, $http, $interval) {
    var self = this;

    var init = function()  {
        var refresh = 5000;
        self.loaded = false;

        self.config = null;
        self.sopcast = null;
        self.mplayer = null;

        loadProcesses().then(function() {
            self.loaded = true;
        });

        $interval(loadProcesses, refresh);

    };

    var loadProcesses = function () {
        return $q.all([
            $http.get('/api/sopcast')
                .then(function(r) {
                        self.sopcast = r.data;
                        console.log(self)
                    }),
            $http.get('/api/mplayer')
                .then(function(r) {
                    self.mplayer = r.data;
                    console.log(self)
                }),
            $http.get('/api/config')
                .then(
                function(r) {
                    self.config = r.data;
                })
        ]);
    }

    self.launchSopcast = function() {
        $http.post('/api/sopcast', {url: self.sopcast_url}).then(loadProcesses);
    };

    self.launchMplayer = function() {
        $http.post('/api/mplayer', {mplayer_url: self.mplayer_url}).then(loadProcesses);
    }

    self.killSopcast = function() {
        $http['delete']('/api/sopcast').then(loadProcesses);
    }

    self.killMplayer = function() {
        $http['delete']('/api/mplayer').then(loadProcesses);
    }

    self.getStreamingUrl = function() {
        return (
            'http://' +
            self.config.DEFAULT_STREAMING_HOST +
            ':' + self.config.DEFAULT_STREAMING_PORT +
            '/tv.asf'
        );
    }

    init()
}

PiStreamCtl.$inject = ['$q', '$http', '$interval'];

export default PiStreamCtl;
