import status from "../Status.js"

export default class Score {
  constructor(ctx){
    this.ctx = ctx
    this.ctx.font = "20px serif"
    this.ctx.fillStyle = "#ffffff"
    this.ctx.fontWeight = "bold"
    this.count = 0
  }
  add(){
    this.count ++
  }
  getMsg(){
    this.msg = `击杀敌机${this.count}`
    return this.msg
  }
  reset(){
    this.count = 0
  }

  render(){
    // console.log(this.getMsg(), status.size.w - 50, 0, 50)
    this.ctx.beginPath()
    this.ctx.fillText(this.getMsg(), status.size.w - 100, 20, 100);
  }
}
