'use strict';

angular.module('App.auth',[])
.factory('AuthService', ['$firebaseAuth', function($firebaseAuth){
	var firebaseAuthObject = $firebaseAuth();
	return {
		firebaseAuthObject: firebaseAuthObject
		, login: function(user){
			return firebaseAuthObject
					.$signInWithEmailAndPassword(user.email, user.password);
		}
		, logout: function(){
			firebaseAuthObject.$signOut();
		}
		, register: function(user){
			return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
		}
		, isLoggedIn: function(){
			return firebaseAuthObject.$getAuth();
		}
	};
}])
.factory('UserService', ['firebase', function(firebase){
	var database = firebase.database();
	return {
		add: function(user){
			return database.ref('Users'+user.uid)
					.set({
						fullname: user.fullname
					});
		}
	};
}])
;
