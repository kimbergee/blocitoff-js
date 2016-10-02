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

// switches and saves completed/not completed on view
    $scope.toggle = function(task) {
      task.completed = !task.completed;
      $scope.tasks.$save(task);
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

    $scope.priorityText = function(task) {
      if (task.priority == 3) {
        return "low";
      } else if (task.priority == 1) {
        return "high";
      } else {
        return "medium";
      }
    };

// Supporting Functions
    var createBlankTask = function() {
      $scope.newTask = {
        text: "",
        time: firebase.database.ServerValue.TIMESTAMP,
        completed: false,
        priority: "2",
        state: "active"
      };
    }

    init();
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$scope', '$firebaseArray', HomeCtrl]);
})();
