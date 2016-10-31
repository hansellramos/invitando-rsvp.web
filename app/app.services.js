'use strict';

angular.module('App.services',[])
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
.factory('UserService', ['firebase', '$firebaseObject', function(firebase, $firebaseObject){
	var database = firebase.database();
	return {
		add: function(user){
			return database.ref('Users/'+user.uid)
					.set({
						fullname: user.fullname
					});
		}
		, get: function(uid){
			return $firebaseObject(database.ref('Users/'+uid));
		}
	};
}])
.service('Common', [function(){
	var user = {};
	return {
		getUser: function(){
			return user;
		}
		, setUser: function(value){
			user = value;
		}
	}
}])
;
