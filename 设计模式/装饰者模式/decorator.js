Function.prototype.before = function(beforefn){
	var _self = this;//保存原函数的引用
	return function(){//返回包含了原函数和新函数的代理函数
		beforefn.apply(this, arguments);//执行新函数，且保证this不被劫持
		return _self.apply(this, arguments);//执行原函数并返回原函数的执行结果
	};
};

Function.prototype.after = function(afterfn){
	var _self = this;
	return function(){
		var ret = _self.apply(this, arguments);
		afterfn.apply(this, arguments);
		return ret;
	};
};
//返回的代理函数只是保证新函数和原函数的执行顺序，并不是真正的代理函数

//执行顺序的研究
var a = function(){
	console.log('a');
};
var ret = a.before(function(){
	console.log('b');
}).after(function(){
	console.log('c');
}).before(function(){
	console.log('d');
});
ret();//输出是d、b、a、c，此处需要深入理解

//动态改变参数，在一个函数执行之前为其添加一些参数，这个超级有用
var func = function(param){
	console.log(param);
};
func = func.before(function(param){
	param.b = 'b';
});
func({a: 'a'});

//进行插件模式的表单验证
//让表单在提交之前执行一个表单验证的函数