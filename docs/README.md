# animation

animation in frontend

## intro

介绍

```js
const a = 1;
```

### 位移动画

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

### 其他属性动画

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
