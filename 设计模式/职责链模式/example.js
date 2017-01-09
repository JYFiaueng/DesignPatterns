//2016年6月10日 15:59:29

var order500 = function(orderType, pay, stock){
	if(orderType === 1 && pay === true){
		console.log('500定金，100优惠券');
	}else{
		return 'nextSuccessor';
	}
};

var order200 = function(orderType, pay, stock){
	if(orderType === 2 && pay === true){
		console.log('200定金，50优惠券');
	}else{
		return 'nextSuccessor';
	}
};

var orderNormal = function(orderType, pay, stock){
	if(stock > 0){
		console.log('无优惠券');
	}else{
		console.log('手机库存不足');
	}
};

var Chain = function(fn){
	this.fn = fn;
	this.successor = null;
};

Chain.prototype.setNextSuccessor = function(successor){
	return this.successor = successor;
};

Chain.prototype.passRequest = function(){
	var ret = this.fn.apply(this, arguments);
	if(ret === 'nextSuccessor'){
		return this.successor && this.successor.passRequest.apply(this.successor, arguments);
	}
	return ret;
};

Chain.prototype.next = function(){
	return this.successor && this.successor.passRequest.apply(this.successor, arguments);
};
//同步返回结果
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder500.passRequest(3, true, 500);
chainOrder500.passRequest(1, false, 0);
//异步返回结果
var fn1 = new Chain(function(){
	console.log(1);
	return 'nextSuccessor';
});

var fn2 = new Chain(function(){
	console.log(2);
	var self = this;
	setTimeout(function(){
		self.next();
	}, 3000);
});

var fn3 = new Chain(function(){
	console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();