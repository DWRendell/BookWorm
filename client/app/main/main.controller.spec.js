'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('bookWormApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/books')
      .respond([{title: 'testBook1'}, {title: 'testBook2'}]);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('sends a POST request to the server when manualBookCreate() is called',
    function () {
    var book = {
      title: 'test title',
      author: 'test author',
      isbn: 'test isbn'
    };

    scope.formTitle = book.title;
    scope.formAuthor = book.author;
    scope.formIsbn = book.isbn;

    scope.manualBookCreate();
    $httpBackend.expectPOST('/api/books', book).respond(201, '');
    $httpBackend.flush();
    });
});
