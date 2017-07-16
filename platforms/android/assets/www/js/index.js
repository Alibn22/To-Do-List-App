var app = angular.module("toDoListApp", ['ngMaterial']);
app.controller("toDoListCtrl", function ($scope, $localstorage, $mdDialog, $window) {
  var f = 0;
  $scope.tasks = [
    { nameT: "task1", done: true },
    { nameT: "task2", done: false },
    { nameT: "task3", done: true },
    { nameT: "task4", done: false }
  ];
  $scope.showPrompt = function (ev) {
    var confirm = $mdDialog.prompt()
      .title('write your task')
      .placeholder('your task')
      .ariaLabel('your task')
      .targetEvent(ev)
      .ok('add')
      .cancel('cancel');

    $mdDialog.show(confirm).then(function (result) {
      if (!result) { return; }
      else {
        $scope.tasks.push({ nameT: result, done: false });
      }
    }, function () {
    });
  };
  $scope.tasks = $localstorage.getObject('name');
  $scope.$watch(function () {
    $localstorage.setObject('name',$scope.tasks);
    for (var i = 0; i < $scope.tasks.length; i++) {
      if ($scope.tasks[i].done) {
        f++;
      }
    }
    $scope.do = f;
    f = 0;
  }, true);
});
app.factory('$localstorage', ['$window', function ($window) {
  return {
    set: function (key, value) {
      $window.localStorage[key] = value;
    },
    get: function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function (key) {
      return JSON.parse($window.localStorage[key] || '[]');
    }
  }
}]);
app.controller('navbarCtrl', AppCtrl);

function AppCtrl($scope) {
  $scope.currentNavItem = 'page1';
  $scope.title1 = 'Button';
  $scope.title4 = 'Warn';
  $scope.isDisabled = true;
};
app.controller('sideNavbarCtrl', function ($scope, $timeout, $mdSidenav) {
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  function buildToggler(componentId) {
    return function () {
      $mdSidenav(componentId).toggle();
    };
  }
});