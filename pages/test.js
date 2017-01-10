//厨师
var cook = {
	A:function(){
		console.log('A');
	},
	B:function(){
		console.log('B');
	},
	C:function (){
		console.log('C');
	}
};
//服务员
var waiter = {
	receive:function(p){
		p.execute = function(){
			cook[this.eat]();
		};
	}
};
//命令的发出者要持有命令，还要有个发出命令的方法
//顾客
function people(food){
	this.eat = food;
	this.execute;
}
var p = new people('C');
waiter.receive(p);
p.execute();