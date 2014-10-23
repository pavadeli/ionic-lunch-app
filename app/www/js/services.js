angular.module('lunch.services', ['ionic'])
	.factory('lunchService', function ($q, $timeout, $ionicLoading, $window, $log) {

		var service = {
			rememberedUsername: $window.localStorage.rememberedUsername || 'Louis',
			token: null,
			displayName: null,
			gasten: null,
			registered: false
		};

		function delayed(descr, func, timeout) {
			var defer = $q.defer();

			var msg = 'Bezig met ' + descr + '...';
			$ionicLoading.show({template: msg});
			$log.log(msg);

			$timeout(function () {

				$ionicLoading.hide();
				defer.resolve(func());

			}, timeout || 500);

			return defer.promise;
		}

		service.login = function login(loginData) {
			return delayed('inloggen', function () {
				$log.log('Succesvol ingelogd als: ' + loginData.username);
				service.displayName = $window.localStorage.rememberedUsername = loginData.username;
				service.token = {
					secret: Math.floor(Math.random() * 1000000),
					username: loginData.username
				};
				return true;
			})
		};

		service.toggleLunchen = function toggleLunchen() {
			return delayed('registreren', function () {
				service.registered = !service.registered;
				service.gasten = service.registered && service.gasten || null;

				$log.log('Doorgegeven aan cloud-service: ' + service.displayName + ' gaat ' + (service.registered ? 'wel' : 'niet') + ' lunchen.');
				return true;
			});
		};

		service.registerGuests = function registerGuests(nr) {
			return delayed('registreren gasten', function () {
				service.gasten = nr || 'geen';

				$log.log('Doorgegeven aan cloud-service: ' + service.displayName + ' neemt ' + service.gasten + ' gasten mee.');
				return true;
			})
		};

		var historyAll = [
			{ time: 'woensdag 22 oktober', guests: 0},
			{ time: 'dinsdag 21 oktober', guests: 0},
			{ time: 'maandag 20 oktober', guests: 0},
			{ time: 'vrijdag 17 oktober', guests: 2},
			{ time: 'donderdag 16 oktober', guests: 0},
			{ time: 'woensdag 15 oktober', guests: 5}
		];

		service.history = [
			{ time: 'dinsdag 14 oktober', guests: 0}
		];

		service.fetchHistory = function fetchHistory() {
			return $timeout(angular.noop, 500000)
				.then(function () {
					if (historyAl.length) service.history.unshift(historyAll.pop());
					return service.history;
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