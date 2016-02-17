function PiStreamCtl($http) {
    var self = this;
    $http.get('/api/process')
        .then(function(response){
            self.processes = response.data.processes}
        );
}

PiStreamCtl.$inject = ['$http'];

export default PiStreamCtl