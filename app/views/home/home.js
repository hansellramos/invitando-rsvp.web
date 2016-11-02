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
		Common.setUser({});
		Common.redirectIfNotLoggedIn();
	}
	;
	$scope.init = function(){
		if(!Common.redirectIfNotLoggedIn()){
			var _user = AuthService.isLoggedIn();
			var s = UserService.get(_user.uid);
			s.$bindTo($scope, "user");
			Common.setUser($scope.user);
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