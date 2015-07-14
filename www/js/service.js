angular.module('enejApp')
.service('Session',function(){

	this.create = function(user,password,logged){
		this.user = user;
		this.password = password;
		this.logged = logged;
	};

});