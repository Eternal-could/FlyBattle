/*
* @param rectA :第一个矩形
* @param rectB :第二个矩形
* 计算这两个矩形 是否有重合的地方
* @return Number 表示是否重合
* */

function rectCollide(rectA,rectB){
    //计算矩形的公有面积,如果面积大于0,那么就相交,否则就不相交

    //理论应该是左上位置的值
    //两个矩形左上角x坐标中的最大值
    const xMin = Math.max(rectA.x,rectB.x)
    //两个矩形左上角y坐标中的最大值
    const yMin = Math.max(rectA.y,rectB.y)

    //理论应该是右下位置的值
    //两个矩形右下角x坐标中的最小值
    const xMax = Math.min(rectA.x + rectA.w,rectB.x + rectB.w)
    //两个矩形右下角y坐标中的最小值
    const yMax = Math.min(rectA.y + rectA.h,rectB.y + rectB.h)
    //计算宽高
    const width = xMax - xMin
    const height = yMax - yMin
    //如果有面积,就可以返回大于0的数,否则返回0
    if(width > 0 && height > 0){
        return width * height
    }else{
        return 0
    }
}
export default rectCollide