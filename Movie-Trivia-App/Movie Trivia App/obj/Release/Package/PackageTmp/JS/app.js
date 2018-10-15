// App module
var app = angular.module('movieTriviaApp', ['ui.router'])
// App configuration
.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
            cache: false, url: '/welcome',
            templateUrl: 'Templates/welcome.html',
            controller: 'welcomeCtrl'
        })
        .state('game', {
            cache: false, url: '/game',
            templateUrl: 'Templates/game.html',
            controller: 'gameCtrl'
        });
      $urlRouterProvider.otherwise('/welcome');
  }
])
// App controller
.controller('movieTriviaCtrl', ['$scope', '$rootScope', '$http',
    function ($scope, $rootScope, $http) {
        // Get game data
        $rootScope.getGameData = function () {
            $http.get('/api/movies/')
            .then(function (response) {
                $rootScope.gameData = response.data;
                if (!($rootScope.gameData == null)) {
                    $('#playBtn').removeAttr('disabled');
                    $('#playBtn').toggleClass('btn-light btn-success');
                    $('#infoAlt').hide();
                    console.log($rootScope.gameData);
                }
                else {
                    toggleModel('w')
                    $rootScope.mHead = "Notice!";
                    $rootScope.mBody = "No data, check your netork connection."
                    $('#mModal').modal('show');
                }
            })
            .catch(function () { });
        };
    }])
// Welcome template controller
.controller('welcomeCtrl', ['$scope', '$rootScope', '$location',
    function ($scope, $rootScope, $location) {
        // Play button
        $scope.play = function () {
            $location.url("/game");
        };
    }])
// Game template controller
.controller('gameCtrl', ['$scope', '$rootScope', '$location', '$timeout',
    function ($scope, $rootScope, $location, $timeout) {
        // Start game
        $scope.startGame = function () {
            $scope.answer = "";
            $scope.question = 1;
            $scope.points = 0;
            $scope.movieTitle = $rootScope.gameData[0].Title;
            $scope.movieImage = $rootScope.gameData[0].Image;
            $scope.movieYear = $rootScope.gameData[0].TitlYear;
        };

        // Next game
        $scope.nextGame = function () {
            if ($scope.answer !== "") {
                if ($scope.answer == $rootScope.gameData[$scope.question - 1].Year) {
                    toggleModel('s');
                    $rootScope.mHead = "Correct!";
                    $rootScope.mBody = "Plus 5 points."
                    $('#mModal').modal('show');

                    $timeout(function () {
                        $('#mModal').modal('hide');
                        $scope.answer = "";
                        $scope.points = $scope.points + 5;
                        if (!(($scope.question + 1) > 8)) {
                            $scope.question = $scope.question + 1;
                            $scope.movieTitle = $rootScope.gameData[$scope.question - 1].Title;
                            $scope.movieImage = $rootScope.gameData[$scope.question - 1].Image;
                            $scope.movieYear = $rootScope.gameData[$scope.question - 1].TitlYear;
                        }
                        else {
                            toggleModel('p');
                            $rootScope.mHead = "Finished!";
                            $rootScope.mBody = "You earned " + $scope.points + " points.";
                            $('#mModal').modal('show');

                            $timeout(function () {
                                $('#mModal').modal('hide');
                                $location.url("/welcome");
                            }, 3000);
                        }
                    }, 3000);
                }
                else {
                    toggleModel('d');
                    $rootScope.mHead = "Incorrect!";
                    $rootScope.mBody = "Minus 3 points."
                    $('#mModal').modal('show');

                    $timeout(function () {
                        $('#mModal').modal('hide');
                        $scope.answer = "";
                        $scope.points = $scope.points - 3;
                        if (!(($scope.question + 1) > 8)) {
                            $scope.question = $scope.question + 1;
                            $scope.movieTitle = $rootScope.gameData[$scope.question - 1].Title;
                            $scope.movieImage = $rootScope.gameData[$scope.question - 1].Image;
                            $scope.movieYear = $rootScope.gameData[$scope.question - 1].TitlYear;
                        }
                        else {
                            toggleModel('p');
                            $rootScope.mHead = "Finished!";
                            $rootScope.mBody = "You earned " + $scope.points + " points.";
                            $('#mModal').modal('show');

                            $timeout(function () {
                                $('#mModal').modal('hide');
                                $location.url("/welcome");
                            }, 3000);
                        }
                    }, 3000);
                }
            }
            else{
                toggleModel('w');
                $rootScope.mHead = "Notice!";
                $rootScope.mBody = "Please enter your answer!"
                $('#mModal').modal('show');

                $timeout(function () {
                    $('#mModal').modal('hide');
                    $('#aInput').focus();
                }, 3000);
            }
        };
    }]);

// Toggle alert model
function toggleModel(toggle) {
    if (toggle == 'w') {
        $('#mHeader').removeClass('bg-primary');
        $('#mHeader').removeClass('bg-danger');
        $('#mHeader').removeClass('bg-success');
        $('#mHeader').addClass('bg-warning');
    }
    else if(toggle == 's'){
        $('#mHeader').removeClass('bg-primary');
        $('#mHeader').removeClass('bg-warning');
        $('#mHeader').removeClass('bg-danger');
        $('#mHeader').addClass('bg-success');
    }
    else if(toggle == 'd'){
        $('#mHeader').removeClass('bg-primary');
        $('#mHeader').removeClass('bg-warning');
        $('#mHeader').removeClass('bg-success');
        $('#mHeader').addClass('bg-danger');
    }
    else if(toggle == 'p'){
        $('#mHeader').removeClass('bg-warning');
        $('#mHeader').removeClass('bg-success');
        $('#mHeader').removeClass('bg-danger');
        $('#mHeader').addClass('bg-primary');
    }
}