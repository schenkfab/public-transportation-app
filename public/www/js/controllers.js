angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, $http){
	$scope.from = '';
	$scope.to = '';


	$scope.autocompleteStation = function(query) {
		return $http.get('http://transport.opendata.ch/v1/locations', {
			params: {'query': query, 'type': 'station'}
		});
	}

	$scope.search = function () {
		console.log($scope.from);
		console.log($scope.to);
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
