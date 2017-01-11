// //厨师
// var cook = {
// 	A:function(){
// 		console.log('A');
// 	},
// 	B:function(){
// 		console.log('B');
// 	},
// 	C:function (){
// 		console.log('C');
// 	}
// };
// //服务员
// var waiter = {
// 	receive:function(p){
// 		p.execute = function(){
// 			cook[this.eat]();
// 		};
// 	}
// };
// //命令的发出者要持有命令，还要有个发出命令的方法
// //顾客
// function people(food){
// 	this.eat = food;
// 	this.execute;
// }
// var p = new people('C');
// waiter.receive(p);
// p.execute();

function a(s){
	if(s === arguments.callee.name){
		console.log(arguments.callee.name);
		return true;
	}else{
		return false;
	}
}
function b(s){
	if(s === arguments.callee.name){
		console.log(arguments.callee.name);
		return true;
	}else{
		return false;
	}
}
function c(s){
	if(s === arguments.callee.name){
		console.log(arguments.callee.name);
		return true;
	}else{
		return false;
	}
}
// 想要做到能够灵活的添加删除节点
function Chain(){
	this.chain = [];
	this.p = 0;
}
Chain.prototype.insertNode = function (node, pos){
	this.chain.splice(pos-1, 0, node);
};
Chain.prototype.removeNode = function (pos){
	this.chain.splice(pos-1, 1);
};
Chain.prototype.clearNode = function (){
	this.chain = null;
};
Chain.prototype.start = function (s){
	for(var i = 0; i < this.chain.length; i++){
		if(this.chain[i] && this.chain[i](s)){
			return;
		}
	}
};
Chain.prototype.next = function (s){
	if(p < this.chain.length) return false;
	if(this.chain){
		this.chain[p](s);
	}else{

	}
};