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
      .respond([{title: 'testBook1', _id: 1234}, {title: 'testBook2', _id: 4321}]);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.bookList.length).toBe(2);
  });

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

  it('sends a DELETE request when deleteBook() called', function() {
    $httpBackend.flush();
    var deleteId = scope.bookList[0]._id;
    scope.deleteBook(0);

    $httpBackend.expectDELETE('/api/books/' + deleteId)
      .respond(204);
    $httpBackend.flush();
  })
});
