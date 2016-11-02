'use strict';

angular.module('App.home',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/home', {
		templateUrl: 'views/home/home.html'
		, controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', ['$scope', '$timeout', '$location', 'Flash', 'Common', 'AuthService', 'UserService', function($scope, $timeout, $location, Flash, Common, AuthService, UserService){
	$scope.user = {fullname:'', email:''};
	$scope.SignOut = function(){
		AuthService.logout();
		$location.path("/signin");
	};
	$scope.init = function(){
		var _user = AuthService.isLoggedIn();
		if(!_user){
			$location.path("/signin");
		}else{
			var s = UserService.get(_user.uid);
			s.$bindTo($scope, "user");
			//$scope.user = Common.getUser();
		}
	}
	$scope.other = function(){
		$scope.user = {f:new Date()};
	}
	$timeout(function(){
		$scope.init();
	},500);

	}])
;