//2016年5月29日 11:22:41
//命名空间的建立
var MyApp = (function(){
	var MyApp = {};

	MyApp.namespace = function(name){
		var parts = name.split('.');
		var current = MyApp;
		for(var i in parts){
			if(!current[parts[i]]){
				current[parts[i]] = {};
			}
			current = current[parts[i]];
		}
	};

	return MyApp;
})();

MyApp.namespace('event');
MyApp.namespace('dom.style');
MyApp.namespace('j.y.f');
MyApp.namespace('j.h.y');

console.log(MyApp);