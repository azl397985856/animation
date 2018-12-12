// easing
function defaultEasing(t) {
  return t;
}

function regression({ easing, base, ceil, elapsed }) {
  // TODO:
  const max = 1000;
  const min = 0;
  const rate = (ceil - base) / (max - min);
  const v = easing(elapsed) * rate + base;

  return v > Math.max(ceil, base)
    ? Math.max(ceil, base)
    : v < Math.min(ceil, base)
    ? Math.min(ceil, base)
    : v;
}

function needPrefix(browserslist) {
  // 去查询兼容数据
  // 如果有必要加前缀就返回true， 否则false
  return true;
}

// core
function anime(opts) {
  // 我们目前只支持translateX, 其他属性的支持都是一样的道理。
  // 需要注意的是需要将其转化为数值类型再处理
  // 比如 1turn -> 360     #fff  -> 4095
  const {
    targets,
    duration,
    delay,
    loop: isloop,
    easing = defaultEasing,
    translateX
  } = opts;

  let resolve = null;

  function makePromise() {
    return window.Promise && new Promise(_resolve => (resolve = _resolve));
  }

  let targetEles;
  if (typeof targets === "string") {
    targetEles = document.querySelectorAll(targets);
  } else {
    targetEles = targets;
  }

  let startTime = performance.now();

  const raf = requestAnimationFrame(loop);

  function loop() {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const raf = requestAnimationFrame(loop);

    // 以translateX为例， 其他css属性同理：

    if (translateX) {
      Array.prototype.forEach.call(targetEles, ele => {
        const per = elapsed / duration;
        const base =
          translateX[
            Math.max(
              Math.min(
                Math.round(per * translateX.length),
                translateX.length - 1
              ) - 1,
              0
            )
          ];
        const ceil =
          translateX[
            Math.min(Math.round(per * translateX.length), translateX.length - 1)
          ];
        if (
          needPrefix({
            chrome: "> 30"
          })
        ) {
          // 这里仅仅以添加webkit前缀为例
          ele.style.transform = `-webkit-translateX(${regression({
            easing,
            base,
            ceil,
            elapsed: elapsed < 1000 ? elapsed : elapsed - 1000
          })}px)`;
        }

        ele.style.transform = `translateX(${regression({
          easing,
          base,
          ceil,
          elapsed: elapsed < 1000 ? elapsed : elapsed - 1000
        })}px)`;
      });
    }

    if (duration && elapsed > duration) {
      // 可以事先记录transform， 然后reset
      // 这里简单起见，重置为0
      Array.prototype.forEach.call(targetEles, ele => {
        ele.style.transform = "-webkit-translateX(0)";
        ele.style.transform = "translateX(0)";
      });
      if (!isloop) {
        cancelAnimationFrame(raf);
      } else {
        startTime = performance.now();
      }
    }
  }
  if (delay) {
    setTimeout(loop, delay);
  } else {
    loop();
  }

  resolve && resolve({});

  return {
    finished() {
      return makePromise();
    },
    inspect() {
      Array.prototype.forEach.call(targetEles, ele => {
        window.inspect && window.inspect(ele);
        // 可以做一些其他的debug功能，大家可以发挥想象
      });
      return targetEles;
    },
    pause() {
      cancelAnimationFrame(raf);
    },
    restart() {
      loop();
    }
  };
}

// helpers
anime.presets = [
  {
    id: "DX-0001",
    play(opts) {
      return anime({
        ...opts,
        ...{
          duration: 1000
        }
      });
    }
  },
  {
    id: "DX-0002",
    play(opts) {
      return anime({
        ...opts,
        ...{
          duration: 2000
        }
      });
    }
  }
];

anime.running = [];

anime({
  targets: ".sample",
  translateX: [0, 200, 0],
  duration: 2000,

  loop: true
});
