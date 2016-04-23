angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, $http){
	$scope.from = '';
	$scope.to = '';

	$scope.args = {
		depDate: (new Date())
	};

	$scope.autocompleteStation = function(query) {
		return $http.get('http://transport.opendata.ch/v1/locations', {
			params: {'query': query, 'type': 'station'}
		});
	}

	$scope.search = function () {

		console.log($scope.args);

		// Get connections from transport.opendata.ch
		$http.get('http://transport.opendata.ch/v1/connections', {
			params: {'from': $scope.from.id, 'to': $scope.to.id}
		}).then(function successCallback(response) {
		    console.log(response.data.connections);



		    $scope.connections = response.data.connections;

		}, function errorCallback(response) {
			console.log(response);
		});


	}

	$scope.setFromMethod = function (callback) {
	    $scope.from = callback.selectedItems; 
	}

	$scope.setToMethod = function (callback) {
	    $scope.to = callback.selectedItems; 
	}

})

.controller('SearchDetailCtrl', function($scope, $stateParams, Train) {
  $scope.search = Train.get($stateParams.searchId);
})

.controller('HistoryCtrl', function($scope){
  
})

.controller('SettingsCtrl', function($scope) {
});
