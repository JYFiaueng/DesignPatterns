//2016年5月28日 22:28:26
//
var currying = function(fn){
	var args = [];//记录所有调用时传入的参数
	return function(){
		if(arguments.length === 0){
			return fn.apply(this, args);
		}else{
			[].push.apply(args, arguments);
			return arguments.callee;//将函数自身的引用返回
		}
	};
};

var cost = (function(){
	var money = 0;
	return function(){
		for(var i = 0, l = arguments.length; i < l; i++){
			money += arguments[i];
		}
		return money;
	};
})();

var cost = currying(cost);

// cost(100);
// cost(200);
// cost(300);
// cost(400);

cost(1, 1)(2, 2)(3)(4);

console.log(cost());