'use strict';

angular.module('App.register',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/register', {
		templateUrl: 'views/register/register.html'
		, controller: 'RegisterCtrl'
	});
}])

.controller('RegisterCtrl', ['$scope', '$location', 'Flash', 'AuthService', function($scope, $location, Flash, AuthService){
	$scope.user = {email:'', password:''};

	$scope.SignUp = function(event){
		if(!$scope.registerForm.$invalid){
			AuthService.register($scope.user)
			.then(function(user){
				Flash.create('success','A verification email was sent, please verify your email and sign in');
				user.sendEmailVerification();
		    })
		    .catch(function(error){
		    	if (error.code == 'auth/weak-password') {
		    		Flash.create('danger', 'The password is too weak.');
		        } else if (error.code == 'auth/email-already-in-use') {
		        	Flash.create('danger', 'The email already exists.');
		        } else {
	    			Flash.create('danger', 'Error: '+error.message);
	    		}
		    });
		}
	}
}])
;