'use strict';

angular.module('App.home',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/home', {
		templateUrl: 'views/home/home.html'
		, controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', ['$scope', '$location', 'Flash', 'AuthService', 'UserService', function($scope, $location, Flash, AuthService, UserService){
	}])
;