'use strict';

angular.module('bookWormApp')
  .controller('MainCtrl', function ($scope, $http, socket, Modal) {
    $scope.bookList = [];
    $scope.formTitle = '';
    $scope.formAuthor = '';
    $scope.formIsbn = '';

    $http.get('/api/books').success(function(bookList) {
      $scope.bookList = bookList;
      socket.syncUpdates('book', $scope.bookList);
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

    $scope.deleteBook = function(index) {
      var deleteId = $scope.bookList[index]._id;
      $http.delete('/api/books/' + deleteId);
    };

    $scope.deleteBookConfirm = Modal.confirm.delete(function(book){
      foobar();
      $http.delete('/api/books/' + book._id);
    });

    $scope.manualModal = Modal.submit.manual(function(title, author, isbn) {
      debugger;
      $scope.formTitle = title;
      $scope.formAuthor = author;
      $scope.formIsbn = isbn;
      $scope.manualBookCreate();
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('book');
    });
  });

function foobar() {
  var $deleteModal = $('.modal-danger');
  console.log($deleteModal);
}
