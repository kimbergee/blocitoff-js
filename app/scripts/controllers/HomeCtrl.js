(function() {
  function HomeCtrl($scope, $firebaseArray) {

    var init = function() {
      var ref = firebase.database().ref().child('tasks');
      $scope.tasks = $firebaseArray(ref);
      createBlankTask();
    };

    // View Functions
    $scope.addTask = function() {
      $scope.tasks.$add($scope.newTask);
      createBlankTask();
    };

    $scope.taskAge = function(task) {
      var age = moment(task.time).fromNow();
      return age;
    };

    $scope.expiredTask = function(task) {
      var now = new moment();
      var createdAt = new moment(task.time);
      if ((now - createdAt) >= 604800000) {
        return true;
      } else {
        return false;
      }
    };

    // Supporting Functions
    var createBlankTask = function() {
      $scope.newTask = {
        text: "",
        time: firebase.database.ServerValue.TIMESTAMP,
        completed: false
      };
    }

    init();
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$scope', '$firebaseArray', HomeCtrl]);
})();
