import Status from "../Status.js"
import rectCollide from "../tools.js"
export default class DialogModal {
  constructor(ctx){
    this.ctx = ctx
    this.rect = {
      x: Status.size.w / 4,
      y: Status.size.h / 4,
      w: Status.size.w / 2,
      h: Status.size.h / 2,
    }
    this.init()
  }

  init(){
    this.img = new Image()
    this.img.src = "static/images/restart.png"
  }

  render(){
    this.rect = {
      x: Status.size.w / 4,
      y: Status.size.h / 4,
      w: Status.size.w / 2,
      h: Status.size.w / 2,
    }
    this.ctx.drawImage(this.img, ...this.rect)
  }
  click (e) {
    let touchRect = {
      x: e.touches[0].clientX - 5,
      y: e.touches[0].clientY - 5,
      w: 10,
      h: 10
    }
    if(rectCollide(touchRect, this.rect)){
      this.removeEvent()
      this.fn()
    }
  }
  handle(fn){
    this.fn = fn
  }


  bindEvent(){
    Status.canvas.addEventListener("touchstart", this.click.onceBind(this))
  }
  removeEvent(){
    Status.canvas.removeEventListener("touchstart", this.click.onceBind(this))
  }
}
