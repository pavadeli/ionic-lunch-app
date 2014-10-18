angular.module('starter.controllers', ['lunch.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, lunchService, $rootScope) {
  // Form data for the login modal
  $scope.loginData = {
    username: lunchService.rememberedUsername
  };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    backdropClickToClose: false
  }).then(function(modal) {
    $scope.modal = modal;
    modal.show();
    // lunchService.login({username: 'pietje'});
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Inloggen als: ', $scope.loginData.username);

    lunchService.login($scope.loginData)
      .then($scope.closeLogin);
  };
})

.controller('RegistrationCtrl', function ($scope, $ionicPopup, lunchService) {
  $scope.openGuestsPopup = function openGuestsPopup() {
    $ionicPopup.prompt({
      title: 'Gasten',
      template: 'Geef het aantal gasten',
      inputType: 'number',
      inputPlaceholder: 'Gasten'
    }).then(function (result) {
      if (angular.isDefined(result)) {
        lunchService.registerGuests(result);
      }
    });
  };
})

.controller('HistoryCtrl', function ($scope, lunchService) {
  $scope.history = lunchService.history;

  function refresh() {
    return lunchService.fetchHistory()
      .then(function () { $scope.$broadcast('scroll.refreshComplete'); });
  }
  $scope.refresh = refresh;
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  $scope.id = $stateParams.playlistId
});
