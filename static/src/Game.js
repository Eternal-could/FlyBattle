import "./lib/proto.js"
import status from "./Status.js";
import DialogModal from "./mod/DialogModal.js";
/*
* 游戏主函数的入口,用来初始化项目(canvas生成,事件的生成,项目尺寸数据的生成)
* */
class Game{
    constructor(container) {
        this.container = container
        //游戏的暂停状态,没有暂停的
        this.paused = false
        this.gameOver = false
        //绑定this
        this.render = this.render.bind(this)
        this.pause = this.pause.bind(this)
        this.continue = this.continue.bind(this)
        //操控dom,初始化函数,当游戏实例化时,执行constructor,并走到init()中
        this.initCanvas()
        /*
            重启游戏,包含第一次启动
        */
        this.restartGame()
    }
    /*
    * 初始化canvas标签,并设置尺寸,仅执行一次
    * */
    initCanvas(){
        this.canvas = document.createElement('canvas')
        this.canvas.style.display = 'block'
        this.canvas.width = this.container.getBoundingClientRect().width
        this.canvas.height = this.container.getBoundingClientRect().height
        this.ctx = this.canvas.getContext('2d')
        this.container.appendChild(this.canvas)
        this.restartDialog = new DialogModal(this.ctx)
        //状态初始化
        status.init(this.canvas)

        this.container.onblur = this.pause
        this.container.onfocus = this.continue

        this.size = {
            w:status.size.w,
            h:status.size.h
        }

    }

    restartGame(){

        cancelAnimationFrame(this.frame)
        //我不希望重启游戏的时候之前事件还是继续生效的
        this.removeEvent()
        //注册游戏基础事件
        this.initEvent()
        status.reset()
        this.continue()
        this.render()
    }
    //马不停蹄的去渲染,游戏的刷新页面控制器
    render(){
        this.frame =  requestAnimationFrame(this.render)
        // console.log("render")
        // requestAnimationFrame(()=>{this.render()}) //也可以采用箭头函数来实现

        if(this.paused) return
            //把笔迹擦干净
            // this.ctx.clearRect(0,0,this.size.w,this.size.h)

            this.ctx.clearRect(0,0,...this.size)
            /*首先 更新数据*/
            status.update()
            // 背景是 渲染在最底层的所以最先写
            status.render()
            // console.log(status.gameOver)
            if(status.gameOver){
                this.removeEvent()
                clearInterval(this.fireTimer)
                cancelAnimationFrame(this.frame)
                this.renderRestartRect()
                return
                // 跳转到渲染别的内容
            }
    }
    // 渲染重新开始有的界面
    renderRestartRect(){
        this.restartDialog.render()
        this.restartDialog.bindEvent()
        this.restartDialog.handle(() => {
            this.restartGame()
        })
    }
    removeEvent(){
        //将这个player之前添加的事件移除
        status.player.removeEvent(this.canvas)
    }
    /*初始化事件系统*/
    initEvent(){
        window.onresize = e => {
            status.setSize(window.innerWidth, window.innerHeight)
        }
        // 作弊按钮
        window.addEventListener("keydown", e => {
            if(e.key.toLowerCase() === "k"){
                status.enemyList.forEach( enemy => {
                    enemy.dead = true
                })
            }
        })
        status.player.initEvent(this.canvas)
    }

    //TODO 游戏暂停(事件系统会关闭)『全局』
    pause(){
        clearInterval(this.fireTimer)
        this.paused = true

    }
    //TODO 游戏继续
    continue(){
        clearInterval(this.fireTimer)
        this.fireTimer = setInterval(status.fire.bind(status),1000/8)
        this.paused = false
    }
}
export default Game