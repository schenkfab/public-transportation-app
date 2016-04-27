angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, $http, Train, Cache){
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
		// Create the date and time parameters
		// date	Date of the connection, in the format YYYY-MM-DD	2012-03-25
		// time	Time of the connection, in the format hh:mm			17:30
		var d = new Date($scope.args.depDate);
		var date = d.getUTCFullYear() + '-' + d.getUTCMonth() + '-' + d.getDate();
		var time = '';
		if (d.getMinutes() < 10) {
			time = d.getHours() + ':0' + d.getMinutes();
		} else {
			time = d.getHours() + ':' + d.getMinutes();
		}


		// Get connections from transport.opendata.ch
		$http.get('http://transport.opendata.ch/v1/connections', {
			params: {
				'from': $scope.from.id, 
				'to': $scope.to.id,
				'date': date,
				'time': time
			}
		}).then(function successCallback(response) {
			Train.set(response.data.connections);
		    $scope.connections = response.data.connections;
		    Cache.addHistory(response.data);
		    console.log(Cache.getHistory());

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
	$scope.connection = Train.get($stateParams.searchId);
})

.controller('HistoryCtrl', function($scope, Cache){
  	$scope.connections = Cache.getHistory();
  	console.log($scope.connections);
})

.controller('SettingsCtrl', function($scope) {
});
