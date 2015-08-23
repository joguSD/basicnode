var app = angular.module("testApp", []);

app.controller("wordController", ['$scope', '$http', function($scope, $http) {
  var self = this;
  self.words = [];

  self.getWords = function() {
    $http.get('api/words')
    .then( function(response) {
      self.words = response.data;
    }, function(error) {
      console.log(error);
    });
  };

  self.addWord = function() {
    $http.post('api/words', {text:self.word})
    .then( function(response) {
      console.log("new word?");
      self.words.push(response.data);
    }, function(error) {
      console.log(error);
    });
  };
  self.getWords();
}]);
