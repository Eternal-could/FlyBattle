/*
    拓展一些原型的方法
    可以去遍历的对象属性值,我们用在...中
    ...解构对象

    @returns {IterableIterator<*>}
*/
Object.prototype[Symbol.iterator] = function* (){
    for (let i in this){
        yield this[i]
    }
}

Function.prototype.onceBind = (function (){
    //这里的闭包只有1个,我们的bindMap只有属性名,属性值两个东西
    //针对于不同的函数,绑定不同的内容
    const bindMap = new Map()
    return function (obj){
        //需要对obj和函数进行关联 关联两个对象
        if(!bindMap.get(obj)){
            bindMap.set(obj,new Map())
        }
        //查询obj里面的map函数对应关系,每个函数  对应着 => 那个函数相同的bind返回的函数
        if(!bindMap.get(obj).get(this)){
            bindMap.get(obj).set(this,this.bind(obj))
        }
        return bindMap.get(obj).get(this)
    }
})();

/*
* 以上 onceBind:
*       用来相同函数bind相同对象的时候,返回的函数与绑定之后的函数是完全一致的
*
* 例如:
*   var obj = {};
*   var foo = function(){
*
*   }
*   var foo1 = foo.onceBind(obj)
*   var foo2 = foo.onceBind(obj)
*   foo1 == foo2
*   // true
*
*   函数 => 对象 => 唯一的绑定结果
*
* */
/* 一:
*  1.fn1.onceBind(obj1) => bindFn11  生成,存储,返回  第一次执行
*  2.再次执行 fn1.onceBind(obj1) 如果obj1已经在bindMap中,那么我就返回之前生成已存储的值
*  二:
*  3.fn2.onceBind(obj1) => 最开始并没找到,那我们就生成fn2 生成,存储,返回
*  三:
*  4:fn2.onceBind(obj2) => 最开始还是没有 我们创建 bindFn22
*  四:
*  5:fn1.onceBind(obj2) => bindFn12
* */
//一
// let bindMap = {
//     obj1:{
//         fn1:"bindFn11"
//     }
// }
// //二
// let bindMap = {
//     obj1:{
//         fn1:"bindFn11",
//         fn2:"bindFn21"
//     }
// }
// //三
// let bindMap = {
//     obj1:{
//         fn1:"bindFn11",
//         fn2:"bindFn21"
//     },
//     obj2:{
//         fn2:"bindFn22"
//     }
// }
// //四
// let bindMap = {
//     obj1:{
//         fn1:"bindFn11",
//         fn2:"bindFn21"
//     },
//     obj2:{
//         fn2:"bindFn22",
//         fn1:"bindFn12"
//     }
// }

/*
* Map是es6的方法:类似于对象,但比对象还要强大,键值对都可以是对象
* */