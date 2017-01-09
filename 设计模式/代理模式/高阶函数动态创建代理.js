//2016年5月31日 15:17:04

var mult = function(){
    var a = 1;
    for(var i = 0, l = arguments.length; i < l; i++){
        a *= arguments[i];
    }
    return a;
};

var plus = function(){
    var a = 0;
    for(var i = 0, l = arguments.length; i < l; i++){
        a += arguments[i];
    }
    return a;
};

var createProxyFactory = function(fn){
    var cache = {};
    return function(){
        var args = Array.prototype.join.call( arguments, ',' );
        if(args in cache){
            return cache[ args ];
        }  
        return cache[ args ] = fn.apply( this, arguments );
    };
};

var proxyMult = createProxyFactory(mult), proxyPlus = createProxyFactory(plus);

console.log(proxyMult(2,4,3,5,6));
console.log(proxyMult(2,4,3,5,6));
console.log(proxyPlus(2,4,3,5,6));
console.log(proxyPlus(2,4,3,5,6));