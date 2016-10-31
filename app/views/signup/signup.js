'use strict';

angular.module('App.signup',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/signup', {
		templateUrl: 'views/signup/signup.html'
		, controller: 'SignUpCtrl'
	});
}])

.controller('SignUpCtrl', ['$scope', '$location', 'Flash', 'AuthService', 'UserService', function($scope, $location, Flash, AuthService, UserService){
	$scope.user = {fullname:'Hansel', email:'hansell.ramos@gmail.com', password:'komodo', repeatPassword:'komodo'};

	$scope.SignUp = function(event){
		if(!$scope.signupForm.$invalid){
			AuthService.register({
				email: $scope.user.email,
				password: $scope.user.password
			})
			.then(function(user){
				UserService.add({
					uid: user.uid,
					fullname: $scope.user.fullname
				}).then(function(user){
					debugger;
				}).catch(function(error){
					debugger;
				});
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