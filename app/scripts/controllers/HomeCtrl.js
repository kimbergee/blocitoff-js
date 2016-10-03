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

// calculates and displays task age for view
    $scope.taskAge = function(task) {
      var age = moment(task.time).fromNow();
      return age;
    };

// switches and saves completed/not completed on view and also changes task state
    $scope.toggle = function(task) {
      task.completed = !task.completed;
      $scope.tasks.$save(task);
    };

// checks and saves for expired tasks which are then hidden from the active list
    $scope.expiredTask = function(task) {
      var now = new moment();
      var createdAt = new moment(task.time);
      if ((now - createdAt) >= 604800000) {
        return true;
      } else {
        return false;
      }
    };

// displays priorty as low, medium, or high instead of 3, 2, 1
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
      };
    }

    init();
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$scope', '$firebaseArray', HomeCtrl]);
})();
