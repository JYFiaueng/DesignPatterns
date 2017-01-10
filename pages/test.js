//自己实现的一个发布-订阅处理器
var event = (function(){
	var Events = {};//缓存订阅的事件
	var Cache = {};//缓存发布的消息
	var listen, trigger, remove;

	listen = function (key){//支持多个回调
		if(typeof key !== 'string') return false;
		if(!Events[key]){
			Events[key] = [];
		}
		var _key = key;
		var fns = Events[key];//这个要放在上面，不然key就丢失了
		Array.prototype.shift.call(arguments);//去掉key
		//将所有的订阅回调注册在指定的订阅上
		for(var i = 0, fn; fn = arguments[i++]; ){
			if(typeof fn !== 'function') continue;
			fns.push(fn);
		}
		//添加订阅之后立即将已经缓存过的所有消息进行推送
		if(Cache[_key]){
			fns = Events[_key];
			var msgs = Cache[_key];
			for(i = 0; fn = fns[i++]; ){
				for(j = 0; j < msgs.length; j++){//触发时有消息
					fn.call(this, msgs[j]);
				}
			}
		}
		return true;
	};

	trigger = function (key){//支持多条消息
		if(typeof key !== 'string') return false;
		var _key = key;//记录key，因为下面会丢失掉key
		var i, j, fn;
		Array.prototype.shift.call(arguments);
		// 执行指定订阅上注册的所有回调
		if(Events[_key]){
			var fns = Events[_key];
			for(i = 0; fn = fns[i++]; ){
				if(arguments.length === 0) fn.call(this, '');//触发时未传消息
				for(j = 0; j < arguments.length; j++){//触发时有消息
					fn.call(this, arguments[j]);
				}
			}
		}
		//对消息的数据进行缓存，用于对订阅者进行立即的推送，在listen中
		if(!Cache[_key]){
			Cache[_key] = [];
		}
		for(i = 0; i < arguments.length; i++){
			Cache[_key].push(arguments[i]);
		}
	};

	remove = function (key){//支持移除多个回调
		if(typeof key !== 'string') return false;
		if(!Events[key]) return false;
		var fns = Events[key];
		var i, j, fn, _fn;
		Array.prototype.shift.call(arguments);//去掉参数中的key
		for(i = 0; fn = arguments[i++]; ){
			for(j = 0, _fn; _fn = fns[j++]; ){
				if(fn === _fn) fns.splice(j-1, 1);
			}
		}
	};

	return {
		listen:listen,
		trigger:trigger,
		remove:remove
	};
})();

// 测试监听
event.listen('a', a1, a2);//这两个回调要分别执行
event.trigger('a', 'a触发了', 'a又触发了');//这两个消息要分别都触发
event.trigger('a');//没有传入消息也要触发回调
// 测试发布
event.trigger('b', 'b发了第一个消息', 'b发了第二个消息');//先定制好两个消息
event.listen('b', b);//有此消息的订阅时会立即向订阅者进行推送
// 测试移除
event.remove('a', a1);//移除a1
event.trigger('a', 'a触发了', 'a又触发了');

function a1(m){
	console.log(m+'1');
}
function a2(m){
	console.log(m+'2');
}
function b(m){
	console.log(m);
}
// a触发了1
// a又触发了1
// a触发了2
// a又触发了2
// 1
// 2
// b发了第一个消息
// b发了第二个消息
// a触发了2
// a又触发了2