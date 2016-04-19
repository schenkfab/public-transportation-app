angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, Train){
	console.log('Demo');
	Train.myTrain();
})

.controller('SearchDetailCtrl', function($scope, $stateParams, Train) {
  $scope.search = Train.get($stateParams.searchId);
})

.controller('HistoryCtrl', function($scope){
  
})

.controller('SettingsCtrl', function($scope) {
});
