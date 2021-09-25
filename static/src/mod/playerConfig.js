import rectCollide from "../tools.js";

export default [
    {
        type: 'touchstart',
        handleList:[
            function(e){
                // console.log("touch")
                const mouseRect = {
                    x : e.changedTouches[0].clientX - 5,
                    y : e.changedTouches[0].clientY - 5,
                    w : 10,
                    h : 10
                }

                if(rectCollide(mouseRect,this.rect)){
                    this.draged = true
                }
            }
        ]
    },{
        type: 'touchmove',
        handleList:[
            function(e){
                if(!this.draged){
                    return
                }
                this.rect.x = e.changedTouches[0].clientX - this.rect.w /2
                this.rect.y = e.changedTouches[0].clientY - this.rect.h /2
            }
        ]
    },
    {
        type: 'touchend',
        handleList:[
            function(e){
                this.draged = false
            }
        ]
    }
]