'use strict';
 
angular.module('App.signin', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/signin', {
        templateUrl: 'views/signin/signin.html',
        controller: 'SignInCtrl'
    });
}])
 
.controller('SignInCtrl', ['$scope', '$location', 'Flash', 'AuthService', 'UserService', 'Common', function($scope, $location, Flash, AuthService, UserService, Common) {
	$scope.user = {email:'hansell.ramos@gmail.com', password:''};

	$scope.SignIn = function(event) {
		event.preventDefault();
		// Auth Logic will be here
	    AuthService.login($scope.user)
	    .then(function(user){
	    	if(user.emailVerified){
	    		var s = UserService.get(user.uid)
	    		//.then(function(data){
	    		//	;
	    		//	debugger;
	    		//});
	    		//Common.setUser(data.val())
	    		//s$bindTo($scope, )
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
}]);