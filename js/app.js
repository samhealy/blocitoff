BlocItOff = angular.module("BlocItOff", ["firebase", "ui.router"]);

BlocItOff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode(true);
 
   $stateProvider.state('active', {
     url: '/',
     controller: 'active.controller',
     templateUrl: '../views/active.html'
   });
}]);

BlocItOff.controller("active.controller", ["$scope", "$firebaseObject", "$firebaseArray", function($scope, $firebaseObject, $firebaseArray) {
  
  var ref = new Firebase("https://fiery-inferno-4208.firebaseio.com/data");

  $scope.tasks = $firebaseArray(ref);

  $scope.addTask = function() {
  	$scope.tasks.$add({
  		text: $scope.newTaskText,
  		completed: false,
      expired: false,
      time: Date.now()
  	});
  };

  $scope.complete = function(task) {
    task.completed = true
  };

  $scope.expired = function(task) {
    var stop = Date.now();
    if (stop > task.time || stop > 7) {
      task.expired = true
    };
  };

}]);