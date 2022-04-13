---
title: vanilla js로 api 요청 핸들링하기.
tags: 'VanillaJS'
date: '2022-04-13'
---

근래에 인터뷰와 프론트엔드 과제에서 공통적으로 `api 요청`을 어떻게 효율적으로 할 것인가 에 대한 구현을 요청받았습니다. 그때 제대로 대답하지 못했지만 지금이라도 다음을 위해 한번 구현 해보도록 하겠습니다.

### 구현 상황 설정

나는 검색창에 검색어를 입력을 할때 검색어에 따른 관련 검색어를 api 요청으로 받고 싶습니다. 하지만 우리 서버는 너무 많은 요청은 받아 들이기 힘들기 때문에 적절하게 `api 요청` 횟수를 조절하고 싶습니다. 어떻게 해야 할까요?

### 구현 방법 설계

1. 우선 우리는 검색어를 입력하고 있음을 인지 할 수 있어야 합니다.

   > 이벤트 리스너에 "keydown"과 "keyup"을 이용할 수 있을 것 같습니다.

2. 어떤 식으로 횟수 조절을 할 것인가?

   > 사용자가 더 이상 타이핑을 하지 않는다고 생각이 들면 api 요청을 하면 될 것 같습니다.
   >
   > 하지만 검색어를 모두 타이핑 하기전에 한번도 api 요청을 하지 않는다면 그것 또한 우리의 취지에 맞지 않습니다.

### 구현

```javascript
document.getElementById("app").innerHTML = `
<h1>api 요청 제한하기</h1>
<input type="text" class="input"/>
`;

const state = {
  isTyping: false
};
const $input = document.querySelector(".input");

const cache = new Map();

// keydown 이벤트와 keyup 이벤트는 연쇄적인 이벤트 입니다.
// 키가 입력되면 keydown과 keyup이 100 ~ 50ms의 간격으로 이벤트가 발생합니다.

$input.addEventListener("keydown", () => {               // keydown이 입력되면 타이핑을 하고 있다는 의미기 때문에 isTyping을 true로 설정.
  state.isTyping = true;                   
});
 
$input.addEventListener("keyup", (e) => {                // keyup이 입력 되면 isTyping을 false로 설정합니다.
  state.isTyping = false;
  setTimeout(() => {                                     // setTimeout 함수를 가지고 300ms 안에 새로운 입력이 없을 경우 api 요청을 합니다.
    if (e.code === "Space") {                            // space의 경우 검색어가 변경되지 않기때문에 api 요청을 하지 않습니다.
      return;
    }
    if (e.target.value !== "" && !state.isTyping) {      // 똑같은 api 요청을 여러번 하는 것을 방지하기 위해 cache map을 만들었습니다. 
      if (!cache.has(e.target.value)) {
        cache.set(e.target.value, e.target.value);
        console.log(e.target.value);                     // api 요청 대신 로그를 찍는것으로 대신하겠습니다.
      }
    }
  }, 300);
});


```

### 잘되나 해보기

![image](https://user-images.githubusercontent.com/60080270/163169275-cb6b4005-b7a5-495c-8ccb-c81501bc8957.png) 

> 적절한 요청 제한이 없다면?
>
> ![image](https://user-images.githubusercontent.com/60080270/163169589-538d0513-9aa0-49cf-ba2a-a6a73cfbabd0.png)
>
> 아직 다 쓰지도 않았는데 굉장히 많은 요청을 하게 되는 것을 볼 수 있습니다.

### 너무 빠르게 입력하는 경우

![image](https://user-images.githubusercontent.com/60080270/163170994-cdcef48e-4bc0-4bc7-8dac-bce5ec3b54f8.png)

ㅐ를 누르고 있으면 다음과 같이 단 한번만 로그가 찍힙니다.

그래서 아무래도 저보다 빠르게 키보르를 입력하시는 분이라면 저보다 더 적은 로그가 찍히지 않을까 생각합니다.

### [실습해보기](https://codesandbox.io/s/naughty-boyd-br18xc?file=/src/index.js)