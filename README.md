# 前端动画
[在线阅读](http://lucifer.ren/animation/)

## 介绍
> 以下介绍摘自wikipedia
动画是指由许多帧静止的画面，以一定的速度（如每秒16张）连续播放时，肉眼因视觉残象产生错觉，而误以为画面活动的作品。为了得到活动的画面，每个画面之间都会有细微的改变。而画面的制作方式，最常见的是手绘在纸张或赛璐珞片上，其它的方式还包含了运用黏土、模型、纸偶、沙画等。
由于计算机科技的进步，现在也有许多利用计算机动画软件，直接在计算机上制作出来的动画，或者是在动画制作过程中使用计算机进行加工的方式，这些都已经大量运用在商业动画的制作中。
通常动画是由大量密集和乏味的劳动产生，就算在计算机动画科技得到长足进步和发展的现在也是如此。

下面介绍两种常见的动画效果：

### 1. 位移动画（包括旋转等）
绝大多数动画都是位移动画或者包含位移动画。

```jsx
/*react*/
 <style>
   .box {
     /* Choose the animation */
      animation-name: movingBox;

      /* The animation’s duration */
      animation-duration: 1300ms;

      /* The number of times we want
      the animation to run */
      animation-iteration-count: infinite;

      /* Causes the animation to reverse
      on every odd iteration */
      animation-direction: alternate;
  }
  @keyframes movingBox {
      0% {
        transform: translate(0, 0);
      }


      100% {
        transform: translate(300px, 0);
      }
  }
  </style>
<script>
  export default class Application extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    render() {
      return (
        <div>
          <div className="box">
            位移动画
          </div>
        </div>
      )
    }
  }
```

### 2. 其他属性动画（闪动等）
除了位移动画，还有别的动画效果。

```jsx
/*react*/
<style>
  .bling {
      /* Choose the animation */
      animation-name: blingBling;

      /* The animation’s duration */
      animation-duration: 1300ms;

      /* The number of times we want
      the animation to run */
      animation-iteration-count: infinite;

      /* Causes the animation to reverse
      on every odd iteration */
      animation-direction: alternate;
    }

    @keyframes blingBling {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
</style>
<script>
  export default class Application extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    render() {
      return (
        <div>
          <div className="bling">
            其他属性动画
          </div>
        </div>
      )
    }
  }
```
