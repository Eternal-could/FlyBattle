let length = 19
let boomImgList = []
for(let i = 0; i < length; i++){
    let img = new Image()
    img.src = `static/images/explosion${i+1}.png`
    boomImgList.push(img)
}
export default boomImgList