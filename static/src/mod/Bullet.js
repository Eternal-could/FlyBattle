//这里是子弹 咻咻咻~~
import status from "../Status.js";

export default class Bullet{
    constructor(ctx) {
        this.ctx = ctx
        this.dead = false
        this.rect = {
            x:0,
            y:0,
            w:18,
            h:27
        }
        this.vy = -3
        this.init()
    }
    setPosition(rect){
        this.rect.x = rect.x + (rect.w - this.rect.w)/2
        this.rect.y = rect.y - this.rect.h/2
    }
    init(){
        this.img = new Image()
        this.img.src = "static/images/bullet.png"
    }
    render(){
        this.ctx.drawImage(this.img,...this.rect)
    }
    update(){
        this.vy -= 0.1
        this.rect.y += this.vy
        //死亡判断
        if(this.rect.y < - this.rect.h){
            this.kill()
        }
    }
    kill(){
        //杀死子弹
        this.dead = true
    }
}