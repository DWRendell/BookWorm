'use strict';

angular.module('bookWormApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.formTitle = '';
    $scope.formAuthor = '';
    $scope.formIsbn = '';

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.manualBookCreate = function() {
      if ($scope.formTitle === '') {
        return;
      }
      var book = {
        title: $scope.formTitle,
        author: $scope.formAuthor,
        isbn: $scope.formIsbn
      };
      $http.post('/api/books', book);

      $scope.formTitle = '';
      $scope.formAuthor = '';
      $scope.formIsbn = '';
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
