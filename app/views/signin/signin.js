'use strict';
 
angular.module('App.signin', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/signin', {
        templateUrl: 'views/signin/signin.html',
        controller: 'SignInCtrl'
    });
}])
 
.controller('SignInCtrl', ['$scope', '$location', '$timeout', 'Flash', 'Common', 'AuthService', 'UserService', function($scope, $location, $timeout, Flash, Common, AuthService, UserService) {
	$scope.user = {email:'', password:''};

	$scope.SignIn = function(event) {
		event.preventDefault();
		// Auth Logic will be here
	    AuthService.login($scope.user)
	    .then(function(user){
	    	if(user.emailVerified){
	    		$location.path("/home");
	    		//Flash.create('success','Authentication successful');	
	    	}else{
	    		Flash.create('warning','Your email has not been validated, please check, validate and try again.');	
	    	}
	    })
	    .catch(function(error){
	    	Flash.create('danger', 'Error: '+error.message);
	    })
	}

	$scope.SignInWIthFacebook = function(){
		AuthService.loginWIthFacebook(function(user){
			if(!user || !user.uid) return false;
			UserService.add({
				uid: user.uid,
				fullname: user.displayName,
				email: user.email
			}).then(function(user){
				Flash.create('success','Authentication successful, redirecting...');	
				$location.path("/home");
			}).catch(function(error){
				Flash.create('danger', 'Error: '+error.message);
			});
		})
		.catch(function(error){
			Flash.create('danger', 'Error: '+error.message);
		})
	}

	$scope.SignInWIthGoogle = function(){
		AuthService.loginWIthGoogle(function(user){
			if(!user || !user.uid) return false;
			UserService.add({
				uid: user.uid,
				fullname: user.email.substr(0, user.email.search("@")),
				email: user.email
			}).then(function(user){
				Flash.create('success','Authentication successful, redirecting...');	
				$location.path("/home");
			}).catch(function(error){
				Flash.create('danger', 'Error: '+error.message);
			});
		})
		.catch(function(error){
			Flash.create('danger', 'Error: '+error.message);
		})
	}

	$scope.init = function(){
		Common.redirectIfLoggedIn();
	}

	$timeout(function(){
		$scope.init();
	},500);
}]);