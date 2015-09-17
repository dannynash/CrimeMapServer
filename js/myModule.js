
angular.module('dannyApp', ['ngCookies'])
.service('danny', ['$cookies', function($cookies){
    
    this.echo = function(text){
        return text;
    }
    
    this.setCookie = function(text){
        $cookies.put('myFavorite', text);
    }    
    this.getCookie = function(){
        return $cookies.get('myFavorite');
    }
    
}]);