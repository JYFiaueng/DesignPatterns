//2016年5月29日 11:35:16
//通用的惰性单例实现

var getSingle = function( fn ) {
	var result;
	return function () {
		return result || ( result = fn.apply(this, arguments) );
	};
};

var test = function(str){
	console.log(str);
	return '还是这个';
};

var singleTest = getSingle(test);

console.log(singleTest('第一次调用'));
console.log(singleTest('第二次调用'));
console.log(singleTest('第三次调用'));

//第二三次调用并不会输出，因为test函数只会执行一次