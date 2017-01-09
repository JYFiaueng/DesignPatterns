var salesOffices = {};

salesOffices.clientList = [];
//添加监听
salesOffices.listen = function(key, fn){
	if( !this.clientList[ key ]){
		this.clientList[ key ] = [];
	}
	this.clientList[ key ].push( fn );
};

salesOffices.trigger = function(){
	//取出事件和对应的监听函数列表
	var key = Array.prototype.shift.call( arguments ),fns = this.clientList[ key ];
	if( !fns || fns.length === 0){
		return false;
	}
	for( var i = 0, fn; fn = fns[ i++ ]; ){
		fn.apply( this, arguments );
	}
};

salesOffices.listen( 'squareMeter88', function(price){
	console.log('价格= ' + price);
});

salesOffices.listen( 'squareMeter110', function(price){
	console.log('价格= ' + price);
});

salesOffices.trigger( 'squareMeter88', 2000000 );
salesOffices.trigger( 'squareMeter110', 3000000 );