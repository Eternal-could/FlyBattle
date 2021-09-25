import status from "../Status.js";
import playerConfig from "./playerConfig.js";
import boomImgList from "./Boom.js";
export default class Player {
    constructor(ctx) {
        this.ctx = ctx
        //飞机是不可以拖拽的
        this.draged = false

        //角色的大小位置
        this.rect = {
            x:status.size.w / 2 - 49,
            y:status.size.h - 65,
            w:98,
            h:65
        }
        //是否处于爆炸
        this.booming = false
        this.boomingCount = 0
        this.vip = 1
        this.init()
        this.level = 1
    }
    init(){
        this.playerImg = new Image()
        this.img = this.playerImg
        this.img.src = "static/images/hero.png"
    }

    reset(){
        this.dead = false
        this.booming = false
        this.boomingCount = 0
        this.img = this.playerImg
        this.rect = {
            x:status.size.w / 2 - 49,
            y:status.size.h - 65,
            w:98,
            h:65
        }
    }

    render(){
        this.ctx.drawImage(this.img,...this.rect)
    }

    update(){
        //不允许飞机飞到屏幕外
        if(this.rect.x < 0){
            this.rect.x = 0
        }
        if(this.rect.x > status.size.w - this.rect.w){
            this.rect.x = status.size.w - this.rect.w
        }
        if(this.rect.y < 0){
            this.rect.y = 0
        }
        if(this.rect.y > status.size.h - this.rect.h){
            this.rect.y = status.size.h - this.rect.h
        }
        //如果处于boom的时候
        if(this.booming && this.boomingCount < boomImgList.length){
            this.img = boomImgList[this.boomingCount++]
        }
        if(this.boomingCount === boomImgList.length){
            this.dead = true
        }
    }
    //初始化当前飞机的事件
    initEvent(dom){
        //先说几个交互任务
        //点是否在this.rect中 => 元素对象之间的交互(
        // 1.点和矩形是否重合 => 矩形和点是否有重合区域
        // 2.子弹和飞机交互 => 矩形和矩形是否有重合区域
        // 3.敌机和我方飞机的交互 => 矩形和矩形是否有重合区域
        // )
        // 函数bind方法每次都返回的是一个全信的函数,自己封装一个基于函数和绑定主题的唯一的函数bind结果
        // console.log("注册drag事件")
        playerConfig.forEach(item=>{
            item.handleList.forEach(fn =>{
                dom.addEventListener(item.type,fn.onceBind(this))
            })
        })
    }
    //移除之前注册事件
    //我们的bind每一次都返回新的函数,所以没有办法移除
    removeEvent(dom){
        playerConfig.forEach(item=>{
            item.handleList.forEach(fn =>{
                dom.removeEventListener(item.type,fn.onceBind(this))
            })
        })
    }
    kill(){
        this.booming = true
    }
}