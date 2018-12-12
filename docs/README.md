# 前端动画

[在线阅读](http://lucifer.ren/animation/)

## 介绍

以下介绍摘自 wikipedia

> 动画是指由许多帧静止的画面，以一定的速度（如每秒 16 张）连续播放时，肉眼因视觉残象产生错觉，而误以为画面活动的作品。为了得到活动的画面，每个画面之间都会有细微的改变。而画面的制作方式，最常见的是手绘在纸张或赛璐珞片上，其它的方式还包含了运用黏土、模型、纸偶、沙画等。
> 由于计算机科技的进步，现在也有许多利用计算机动画软件，直接在计算机上制作出来的动画，或者是在动画制作过程中使用计算机进行加工的方式，这些都已经大量运用在商业动画的制作中。
> 通常动画是由大量密集和乏味的劳动产生，就算在计算机动画科技得到长足进步和发展的现在也是如此。

视觉暂留（Persistence of vision），让我们看到了连续的画面，视神经反应速度大约为 1/16 秒，每个人不太一样，有些人高一点，一些人低一点。
上一次视神经传递的图像将会在大脑中存留，直到下一次神经信号到达。
维基百科上说，日常用的日光灯每秒钟大约会熄灭 100 次，但是你并没有感觉。
一般电影的在帧率在 24FPS 以上，一般 30FPS 以上大脑会认为是连贯的，我们玩的游戏一般在 30FPS，高帧率是 60FPS。

## 前端实现动画

在前端，浏览器在视觉暂留(Persistence of vision)时间内，连续不断的逐帧输出图像。每一帧输出一张图像，
让用户看到连续的图片，并且每一张图片是有变化的

提及动画一定会讨论到帧率(FPS, Frame Per Second)，代表每秒输出帧数，也就是浏览器每秒展示出多少张静态的图像。

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
        transform: translate(650px, 0);
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

> 不管是什么动画， 如果要浏览器自动计算中间帧，那么就需要触发动画的属性为数字类型。
> 如果不是数字类型，那么需要将其转化为数字，或者自己提供中间帧，而不是让浏览器去计算中间帧。
> 关于具体原因，等讲了缓动函数，大家或许就能够明白了。

上面是 css 动画，属于声明式。 CSS3 动画是目前最为盛行的前端实现动画的方式之一，尤其是在移动端。
CSS3 动画是通过修改 DOM 的样式来实现动画。

如果使用原生 JavaScript 写动画，不借助于其他动画引擎以及新的 animation dom api 的话，是命令式的。
最早用 JavaScript 实现动画的方式是借助于 `setInterval` 这个 web-api。 后期又有了`requestAnimationFrame`.
requestAnimationFrame 接收一个函数，
这个函数将在下一帧渲染之前执行，也就是说，不需要太多次的计算，
只要在下一帧渲染之前，我们将需要修改的数值修改掉即可。
requestAnimationFrame 的执行频率和你的主线程有关。

不过两者的原理都是一样的，就是`在不同时间输出不同的图像`。

还有一种是 DOM 动画，目前还不是标准规范。Chrome 中支持，Safari 中是不支持的， 详细可以使用[can i use](https://caniuse.com)查看.
这里知道有这么一回事即可。

使用起来大概是这个样子的：

```js
const element = document.querySelector("#id");
element.animate(keyframes, options);
```

详细参数和用法，请参考[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)

## 补间动画

学过 flash 的应该知道这个名字。 我恰巧也在大学期间选修了这门课程。
flash 中有一种补间动画是动作补间动画，它是指在 Flash 的时间帧面板上，
在一个关键帧上放置一个元件，然后在另一个关键帧改变这个元件的大小、颜色、位置、透明度等，Flash 将自动根据二者之间的帧的值创建的动画。

### 关键帧

关键帧是一个动画术语。 体现在前端中的动画有 CSS3 中的`@keyframes`.

帧是形成动画的最小图像单位。关键帧——相当于二维动画中的原画。指角色或者物体运动或变化中的关键动作所处的那一帧。
关键帧与关键帧之间的动画可以由软件来创建，叫做过渡帧或者中间帧。

其实在前端和 flash 中制作动画类似，你只需要声明关键帧，过度帧会被自动生成，从而形成动画。

### 缓动函数

我们看到的动画比如上面展示的位移动画，他的变化并不是均匀的。其运动轨迹类似于：

(假设我每隔一个固定的时间给它拍照，那么下面就是在各个时间它的位置情况，从左到右时间逐步推进)

```js
 .. .  .   .  . ..
```

如果是匀速的，轨迹应该是：

```js
 .   .   .   .   .   .   .
```

可以以数学中的函数来描绘元素变化轨迹（不限于位移动画）。

比如匀速运动的，我们可以使用`y = kx + m`模拟。

![匀速运动轨迹](https://raw.github.com/azl397985856/animation/master/illustrations/20181009142121.png)
使用 js 可以很简单的实现上述的方程式。

```jsx
/*react*/
<style>
  .math-box {
    width: 100px;
    height: 100px;
    border: 2px solid #666;
  }
</style>
<script>
  export default class Application extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    componentDidMount() {
      this.move();
    }

    move() {
      const box = document.querySelector('.math-box');
      const m = 0;
      const max = 10000; // ms
      let y = m;
      const k = 100;
      const startTime = performance.now();
      const interval = setInterval(() => {
        const currentTime = performance.now();
        if (currentTime - startTime > max) {
          box.style.transform = `translateX(${0}px)`;
          clearInterval(interval)
          this.move();
        }
        y = y + 5;
        box.style.transform = `translateX(${y}px)`;
      }, k)
    }

    render() {
      return (
        <div>
          <div className="math-box">
            数学公式模拟轨迹变化
          </div>
        </div>
      )

    }
  }
```

这样写着似乎和数学联系的不太直观。 我们可以尝试封装一下：

```jsx
// 等效于数学函数  y = x
function constant(currentTime) {
  return 1 * currentTime;
}

function animate(duration, cb, easing = constant) {
  const startTime = performance.now();

  const raf = requestAnimationFrame(loop);
  function loop() {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const raf = requestAnimationFrame(loop);
    if (duration && elapsed > duration) {
      return cancelAnimationFrame(raf);
    }
    return cb(elapsed * easing);
  }
}

animate(null, y => (box.style.transform = `translateX(${y}px)`), constant);
```

封装之后用法是这样的：

```jsx
/*react*/
<style>
  .boxed-math-box {
    width: 100px;
    height: 100px;
    border: 2px solid #999;
  }
</style>
<script>
  export default class Application extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    componentDidMount() {
      this.move()
    }

    move() {
      const box = document.querySelector('.boxed-math-box');
      // 当然你可以扩展下animate方法使之支持start,end等更多参数
      // 后面讲动画引擎，我会带大家实现一个更完整的动画引擎。
      const start = () => animate(5000, y => (box.style.transform = `translateX(${y}px)`), x => 0.1* x).then(start)
        start();
    }

    render() {
      return (
        <div>
          <div className="boxed-math-box">
            封装好的数学公式模拟轨迹变化
          </div>
        </div>
      )

    }
  }
```

再比如我们上面的位移动画的变化轨迹可以使用如下曲线来模拟。

![先慢后快再慢运动轨迹](https://raw.github.com/azl397985856/animation/master/illustrations/20181009142401.png)

我们可以使用 cubic-bezier（三贝塞尔曲线）来模拟任何的变化轨迹。 不过徒手书写起来很有难度。

这里有一个网站，可以帮助你轻松生成 cubic-bezier 函数.
[curve-playground](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/curve-playground.html)

### 用户体验

选择不同的动画轨迹会带来不同的用户体验，相信大家在日常生活中也有这样的感受。
一定有令你感受愉快的动画，也有令人厌烦或者感觉突兀的动画。

#### 不对称的动画

我们看到的动画大多数都是不对称的，研究表明
人们对于不同的动画轨迹，有着不同的感受，人们更倾向于不对称动画。

不对称的动画让你在表达个性的同时快速响应用户交互，从而提升用户体验。还能使感觉出现 **对比**，使界面在视觉上更吸引人。

> 使用不对称的动画定时为页面添加个性和对比效果。
> 务必有利于用户交互；当响应点按或点击时采用较短的持续时间，其他情况则可以留出较长的持续时间。

#### 选择合适的缓动函数

涉及用户交互时，用户是最不耐烦的。经验法则是始终快速响应用户交互。
例如，当用户进行点击的时候，您应当迅速给予反馈，持续时间约 100 毫秒。
但是，当用户清除菜单时，你可以让元素离开得慢一点，即大约 300 毫秒。

Google developers 给出的准则是：

- 对于用户交互触发的 UI 动画，例如视图变换或显示元素，采用快速前奏（短持续时间）和慢速结尾（较长持续时间）。
- 对于由代码触发的 UI 动画，例如错误或模态视图，采用较慢前奏（较长持续时间）和快速结尾（短持续时间）。

### 性能

在设置动画时应保持 60fps，因为任何卡顿或停顿都会引起用户注意，并对其体验产生负面影响。

Google developers 给出的准则是：

- 注意您的动画不能导致性能问题；确保了解对指定 CSS 属性设置动画的影响。
- 改变页面（布局）结构或导致绘图的动画属性特别消耗资源。
- 尽可能坚持改变变形和透明度。
- 使用 will-change 来确保浏览器知道您打算对什么设置动画。

### 撸一个动画引擎

我们的目标是设计并实现一个简洁 ，声明式，容易调试的动画引擎。

这方面我参考了 `animation dom` 和 `animejs` 的 api。
还有一个比较不错的动画库，叫 `popmotion`，不过由于其内容比较多，暂时不打算实现，
有兴趣的可以自己去看下它的文档和源码。

使用起来大概是这个样子的：

```js
anime({
  targets: ".sample",
  translateX: [0, 100],
  rotate: "1turn",
  backgroundColor: "#FFF",
  duration: 2000,
  loop: true
});
```

#### 计划支持

- keyframe

- control

- css transform(with prefix supported)

- easing

- debug mode

#### 代码

> 目前是草稿状态，代码在 src 下的 anime.js

```js
function anime() {}
```

### 一些常用动画场景(TODO)

#### 页面切换

#### 模态框切换
