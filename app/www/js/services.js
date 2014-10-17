angular.module('lunch.services', ['ionic'])
	.factory('lunchService', function ($q, $timeout, $ionicLoading) {

		var service = {
			token: null,
			displayName: null,
			gasten: null,
			registered: false
		};

		function start(descr) {
	    $ionicLoading.show({template: 'Bezig met ' + descr + '...'});
		}

		function stop() {
			$ionicLoading.hide();
		}

		service.login = function login(loginData) {
			var defer = $q.defer();

			start('inloggen');

			$timeout(function () {
				defer.resolve(service.token = {
					secret: Math.floor(Math.random() * 1000000),
					username: loginData.username
				});
				service.displayName = loginData.username;
				stop();
			}, 500);

			return defer.promise;
		};

		service.toggleLunchen = function toggleLunchen() {
			var defer = $q.defer();

			start('registeren');

			$timeout(function () {
				defer.resolve(true);

				service.registered = !service.registered;
				service.gasten = service.registered && service.gasten || null;
    		stop();
			}, 500);

			return defer.promise;
		};

		service.registerGuests = function registerGuests(nr) {
			var defer = $q.defer();

			start('registeren gasten');

			$timeout(function () {
				defer.resolve(true);

				service.gasten = nr || 'geen';

    		stop();
			}, 500);

			return defer.promise;			
		};

		var historyAll = [
			{ time: 'woensdag 22 oktober', guests: 0},
			{ time: 'dinsdag 21 oktober', guests: 0},
			{ time: 'maandag 20 oktober', guests: 0},
			{ time: 'vrijdag 17 oktober', guests: 2},
			{ time: 'donderdag 16 oktober', guests: 0},
			{ time: 'woensdag 15 oktober', guests: 5},
			{ time: 'dinsdag 14 oktober', guests: 0},
		];

		var history = [];

		service.fetchHistory = function fetchHistory() {
			return $timeout(angular.noop, 1000)
				.then(function () {
					if (historyAll.length) history.unshift(historyAll.pop());
					return history;
				});
		};

		return service;
	})
	.run(function ($rootScope, lunchService) {
		$rootScope.lunchService = lunchService;
	})

	//angular.module('LoadingApp', ['ionic'])
.controller('LoadingCtrl', function($scope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
});