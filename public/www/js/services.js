angular.module('starter.services', [])
	.service('Train', function() {
		var connections = '';
		this.set = function (c) {
			connections = c;
		};

		this.getConnections = function () {
			return connections;
		};

		this.get = function(i) {
			return connections[i];
		};
	})

	.service('Cache', function($localStorage) {
		$localStorage = $localStorage.$default({
			history: []
		});

		this.addHistory = function(value) {
			$localStorage.history.push(value);
		};

		this.getHistory = function() {
			return $localStorage.history;
		};
	});