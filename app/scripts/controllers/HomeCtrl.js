(function() {
  function HomeCtrl($scope, $firebaseArray) {
    var ref = firebase.database().ref().child('tasks');
    $scope.tasks = $firebaseArray(ref);
    $scope.addTask = function() {
      $scope.tasks.$add({
        text: $scope.newTaskText
      });
    };
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$scope', '$firebaseArray', HomeCtrl]);
})();
