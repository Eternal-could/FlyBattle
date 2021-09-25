### 飞机大战

框架:

```
	    *       index.html                              入口界面
        *       static                                  项目的素材等内容
        *          |_ src                               代码资源文件夹
        *          |   |_ mod                           模块文件夹
        *          |   |   |_ Background.js             背景模块
        *          |   |   |_ Player.js                 我方飞机
        *          |   |   |_ Boom.js                   爆炸图片
        *          |   |   |_ Bullet.js                 子弹
        *          |   |   |_ DialogModal.js            弹出层(死亡后重新开启游戏)
        *          |   |   |_ Enemy.js                  敌机
        *          |   |   |_ playerConfig.js           飞机配置事件
        *          |   |   |_ Score.js                  得分
        *          |   |_ lib                           封装的库
        *          |   |   |_ proto.js                  对象添加迭代器属性,实现对象解构赋值
        *          |   |_ Game.js                       游戏主函数的入口
        *          |   |_ Status.js                     数据管理中心
        *          |   |_ tool.js                       计算矩形的公有面积是否碰撞
        *          |_ images                            图片文件夹
```

### 运行方式

​	运行**index.html**文件,然后按**F12打开控制台**,切换至**移动端**,刷新页面后,即可.

