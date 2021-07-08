---
title: 비동기 처리에 대한 고찰 (Promise) (2) 
tags: 'JavaScript'
date: '2021-06-30'
---

# 비동기 처리에 대한 고찰 (2) - Promise

저번에는 비동기처리하는 방법 중 콜백을 이용한 방법을 알아보았습니다. 하지만 콜백을 이용하보면 콜백 속의 콜백 속의 콜백 속의 콜백과 같이 깊이가 매우 깊어지면서 가독성도 좋지 않은 콜백헬이라는 것을 겪게 됩니다. 이와 같은 콜백헬을 해결 할 수 있는 것이 바로 `Promise`입니다.

```javascript
function getData(callBackFunc) {
    fetch(url)
    .then(callBackFunc)
    .catch(() => {
        console.error("데이터를 불러오지 못했습니다.")
    })
}
```

위 형식이 가장 `Promise`를 이용하는 가장 기본적인 형태 입니다. `fetch`는 기본적으로 `Promise`객체를 리턴하며 우리는 그것을 `.then()`이라는 메소드를 통해서 받아서 사용할 수 있습니다.  

>Promise 객체란?
>
>간단하게 설명하면 성공과 실패만을 호출하는 객체입니다. 성공을 한다면 성공과 data를 리턴하고 실패를 한다면 실패와  error를 리턴합니다.
>
>성공을 했다면 `.then()`을 이용하여 데이터를 활용하면 되고 실패 했다면 `.catch()`를 이용하여 error 처리를 하면 됩니다. 

### Promise Chain을 이용하여 콜백헬 해결하기

```javascript
function callBallHell(data) {
    setTimeout((data) => {
        console.log(data)
        data = data + 10
        setTimeout((data) => {
            console.log(data)
            data = data + 20
            setTimeout((data) => {
                console.log(data)
            }, 0)
        }, 0)
    }, 2000)
}
```

```javascript
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
})
.then((data)=>{
    console.log(data)    // 1
    return data + 10
})
.then((data)=>{
    console.log(data)    // 11
    return data + 20
})
.then((data)=>{
    console.log(data)    // 31
})
```

콜백의 콜백의 콜백과 같은 위의 코드를 `Promise`를 이용하면 좀 더 가독성 있는 코드로 표현이 가능하다는 점이 중요하다.

그리고 실무에서는 `api`호출을 중복으로 할 일이 굉장히 많은데 이때 `Promise`체인은 굉장히 유용하게 쓰일 수 있다.

### 참고사이트

https://joshua1988.github.io/web-development/javascript/promise-for-beginners/

