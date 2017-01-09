//2016年6月1日 14:29:44

//内部迭代器
var each = function(arr, callback){
	for(var i = 0, len = arr.length; i < len; i++){
		callback.call(arr[i], i, arr[ i ]);
	}
};

each([1,2,3], function(index ,ele){
	console.log(ele);
});


//外部迭代器
var Iterator = function( obj ){
	var current = 0;

	var next = function(){
		current += 1;
	};
	var isDone = function(){
		return current >= obj.length;
	};

	var getCurrItem = function(){
		return obj[ current ];
	};

	return {
		next: next,
		isDone: isDone,
		getCurrItem: getCurrItem
	};
};

var iter = Iterator([2,4,6]);
while(!iter.isDone()){
	console.log(iter.getCurrItem());
	iter.next();
}