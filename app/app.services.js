'use strict';

angular.module('App.services',[])
.factory('AuthService', ['firebase','$firebaseAuth', function(firebase, $firebaseAuth){
	var firebaseAuthObject = $firebaseAuth(firebase.auth());
	return {
		firebaseAuthObject: firebaseAuthObject
		, login: function(user){
			return firebaseAuthObject
					.$signInWithEmailAndPassword(user.email, user.password);
		}
		, loginWIthFacebook: function(cb){
			firebaseAuthObject.$onAuthStateChanged(cb);
			return firebaseAuthObject
					.$signInWithPopup("facebook");
		}
		, loginWIthGoogle: function(cb){
			firebaseAuthObject.$onAuthStateChanged(cb);
			return firebaseAuthObject
					.$signInWithPopup("google");
		}
		, logout: function(){
			firebaseAuthObject.$signOut();
		}
		, register: function(user){
			return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
		}
		, isLoggedIn: function(){
			return firebaseAuthObject.$getAuth();
		}, test: function(){
			return firebaseAuthObject;
		}
	};
}])
.factory('UserService', ['firebase', '$firebaseObject', function(firebase, $firebaseObject){
	var database = firebase.database();
	return {
		add: function(user){
			var _user = $firebaseObject(database.ref('Users/'+user.uid));
			if(user.fullname) {_user.fullname = user.fullname;}
			_user.email = user.email;
			return _user.$save();
		}
		, get: function(uid){
			return $firebaseObject(database.ref('Users/'+uid));
		}
	};
}])
.service('Common', ['$location', 'AuthService', function($location, AuthService){
	var user = {};
	return {
		getUser: function(){
			return user;
		}
		, setUser: function(value){
			user = value;
		}, redirectIfLoggedIn: function(){
			if(AuthService.isLoggedIn()){
				$location.path("/home");
				return true;
			}
			return false;
		}, redirectIfNotLoggedIn: function(){
			if(!AuthService.isLoggedIn()){
				$location.path("/signin");
				return true;
			}
			return false;
		}
	}
}])
;
