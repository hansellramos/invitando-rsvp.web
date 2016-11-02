'use strict';

angular.module('App.signup',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/signup', {
		templateUrl: 'views/signup/signup.html'
		, controller: 'SignUpCtrl'
	});
}])

.controller('SignUpCtrl', ['$scope', '$location', '$timeout', 'Flash', 'Common', 'AuthService', 'UserService', function($scope, $location, $timeout, Flash, Common, AuthService, UserService){
	$scope.user = {fullname:'', email:'', password:'', repeatPassword:''};

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
					//debugger;
				}).catch(function(error){
					//debugger;
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

	$scope.SignUpWIthFacebook = function(){
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

	$scope.SignUpWIthGoogle = function(){
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
}])
;