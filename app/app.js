'use strict';
 
angular.module('App', [
 'ngRoute'
,'ngFlash'
,'firebase'
,    'App.auth' 
,    'App.signin'
,    'App.signup' 
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/signin'
    });
}])
.constant('FirebaseURL', firebase.databaseURL)
.directive('compareTo', function(){
	return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
})
;