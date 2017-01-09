//2016年6月9日 09:11:40

//通用的发布订阅对象，其实就是一个自定义的事件处理对象
var Event = (function(){

	var clientList = {},
		listen,
		trigger,
		remove;

	listen = function( key, fn ){
		if( !clientList[ key ]){
			clientList[ key ] = [];
		}
		clientList[ key ].push( fn );
	};

	trigger = function(){
		var key = Array.prototype.shift.call( arguments ),
			fns = clientList[ key ];
		if( !fns || fns.length === 0 ){
			return false;
		}
		for(var i = 0, fn; fn = fns[ i++ ]; ){
			fn.apply( this, arguments );
		}
	};

	remove = function( key, fn ){
		var fns = clientList[ key ];
		if( !fns ){
			return false;
		}
		if( !fn ){
			fns && ( fns.length = 0 );
		}else{
			for( var l = fns.length - 1; l >= 0; l-- ){
				var _fn = fns[l];
				if(_fn === fn){
					fns.splice(l, 1);
				}
			}
		}
	};

	return {
		listen: listen,
		trigger: trigger,
		remove: remove
	};

})();

Event.listen( 'a', function(price){
	console.log('a事件= '+price);
});

Event.trigger('a', 12345);