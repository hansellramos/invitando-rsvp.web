'use strict';
 
angular.module('App.signin', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/signin', {
        templateUrl: 'views/signin/signin.html',
        controller: 'SignInCtrl'
    });
}])
 
.controller('SignInCtrl', ['$scope', 'Flash', 'AuthService', function($scope, Flash, AuthService) {
	$scope.user = {email:'hansell.ramos@gmail.com', password:''};

	$scope.SignIn = function(event) {
		event.preventDefault();
		// Auth Logic will be here
	    AuthService.login($scope.user)
	    .then(function(user){
	    	if(user.emailVerified){
	    		Flash.create('success','Authentication successful');	
	    	}else{
	    		Flash.create('warning','Your email has not been validated, please check, validate and try again.');	
	    	}
	    })
	    .catch(function(error){
	    	Flash.create('danger', 'Error: '+error.message);
	    })
	}
}]);