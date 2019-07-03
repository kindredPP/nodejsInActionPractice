var currency = require('./currency')
console.log('50 Canadian dollars equals this amount of US dollars:')
console.log(currency.canadianToUS(50))

console.log('30 US dollars equals this amount of Canadian dollars:')
console.log(currency.USToCanadian(30))

/*
如果你创建了一个既有exports又有module.exports 的模块，那它会返回module.exports，而exports会被忽略

最终在程序里导出的是module.exports。exports只是对module.exports的一个全 局引用，最初被定义为一个可以添加属性的空对象。
所以exports.myFunc只是 module.exports.myFunc的简写。

所以，如果把exports设定为别的，就打破了module.exports和exports之间的 引用关系。
可是因为真正导出的是module.exports，那样exports就不能用了，因为 它不再指向module.exports了。
如果你想维持那个链接，可以像下面这样让 module.exports再次引用exports:
module.exports = exports = Currency;
*/

/**
 * 延伸阅读 ES6 export import 与 require对比 性能好
 * https://www.cnblogs.com/guanghe/p/6560698.html
 */