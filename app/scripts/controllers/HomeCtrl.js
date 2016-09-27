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
      return taskAge(task);
    };

    $scope.expiredTask = function(task) {
      return expiredTask(task);
    };

    // Supporting Functions
    var createBlankTask = function() {
      $scope.newTask = {
        text: "",
        time: firebase.database.ServerValue.TIMESTAMP,
        completed: false
      };
    }

    var taskAge = function(task) {
      var age = moment(task.time).startOf('hour').fromNow();
      return age;
    };

/*  Ben's original code:
    var getDaysOld = function(task) {
      var now = new moment();
      var date = new moment(task.time);
      var diff = now.diff(date);
      var duration = moment.duration(diff);
      return duration.days();
      return diff;
    };
*/

    var expiredTask = function(task) {
      var now = new moment();
      var createdAt = new moment(task.time);
      if ((now - createdAt) >= 604800000) {
        return true;
      } else {
        return false;
      }
    };

    init();
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$scope', '$firebaseArray', HomeCtrl]);
})();
