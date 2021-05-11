---
title: '이터레이터 (Iterator)'
tags: 'JavaScript'
date: '2021-05-03'
---

ES6에서는 매우 중요한 새로운 개념 이터레이터 와 제너레이터를 도입했습니다. 제너레이터는 이터레이터에 의존하는 개념이니 이터레이터 먼저 설명하고 넘어 가도록 하겠습니다.

## 이터레이터

이터레이터는 '지금 어디 있는지' 파악할 수 있도록 돕는다는 면에서 일종의 책갈피와 비슷한 개념입니다. 배열이 대표적인 이터러블 객체입니다. 

책이 배열이고 각 배열의 값이 한페이지에 있는 책의 내용이라 했을때를 예로들어 보겠습니다.

```javascript
const rabit_and_turtle = [
    "옛날 옛날에 바다 깊은 곳에는 용궁이 있고 그곳에는 용왕이 살았습니다.",
    "용왕님의 병세는 날이 갈수록 안좋아 지셨고 토끼의 간을 먹어야만이 회복할 수 있었습니다.",
    "거북이는 용왕님의 병을 고치기 위해 육지로 나와 토끼를 찾았습니다.",
    "거북이는 토끼를 만나자 간을 달라고 했지만, 토끼는 달리기를 이긴다면 준다고 약속했습니다.",
]
// 다음과 같은 책이 있습니다.
// values 라는 메소드를 이용해서 it이라는 이터레이터를 생성할 수 있습니다.
const it = rabit_and_turtle.values()

it.next() // {value : "옛날 옛날에 바다 깊은 곳에는 용궁이 있고 그곳에는 용왕이 살았습니다.", done: false}
it.next() // {value : "용왕님의 병세는 날이 갈수록 안좋아 지셨고 토끼의 간을 먹어야만이 회복할 수 있었습니다.", done: false}
it.next() // {value : "거북이는 용왕님의 병을 고치기 위해 육지로 나와 토끼를 찾았습니다.",, done: false}
it.next() // {value : "거북이는 토끼를 만나자 간을 달라고 했지만, 토끼는 달리기를 이긴다면 준다고 약속했습니다.", done: false}
it.next() // {value : undefined , done: true} 모든 페이지를 읽으면 done이 true로 바뀝니다.
it.next() // {value : undefined , done: true} 
```

여기서 중요한점이 몇가지 있습니다.

- next에서 책의 마지막 페이지를 반환했다 해서 끝난 것은 아니라는 것입니다. 책과는 다르게 모든 페이지를 읽었다고 해서 그 다음 페이지를 읽을 수 없는 것은 아닙니다. 물론 그 다음 페이지도 다른 결과 값을 가지는 것은 아닙니다. 일단 이터레이터는 끝까지 진행을 하면 뒤로 돌아가서 다른 데이터를 제공할 수 없습니다.

### 이터레이션 프로토콜

이터레이터가 그 자체로 크게 쓸모있다기 보다는, 더 쓸모 있는 동작이 가능해지도록 한다는데 의미가 있습니다. 이터레이션 프로토콜을 모든 객체를 이터러블 객체로 바꿀수 있습니다. 메시지에 타임스탬프를 붙이는 로그 클래스가 필요하다고 생각해 봅시다. 내적으로 타임 스탬프가 붙은 메시지는 배열에 저장합니다. 

로그를 기록한 항목을 순회하기 위해 이터레션 프로토콜을 사용할 수 있습니다. 이터레이션 프로토콜은 클래스에 심볼 메서드 `Symbol.iterator`가 있고 이 메서드가  `value`와 `done` 을 포함한 객체를 반환하는 메소드인 `next()`를 포함하고 있다면 그 클래스의 인스턴스는 이터러블 객체라는 뜻 입니다.

```javascript
class Log {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push({message, timestamp : Data.now()})
    }
    [Symbol.iterator]() {
        return this.meaages.values();
    }
}

const log = new Log()
log.add("안녕하세요")
log.add("log는 이터러블할까요?")
log.add("확인해 보시죠")

for(let entry of log) {
    console.log(`${entry.message} @ ${entry.timestamp}`)
}
```

<img src="https://user-images.githubusercontent.com/60080270/116868600-05374e00-ac4a-11eb-93c3-ee1a87aa1d00.png" alt="image" style="zoom:200%;" />

잘 작동하는것을 볼수 있다.

이제까지는 이터레이터가 한정된 객체에서만 사용해 보았습니다. 하지만 피보나치 수열과 같은 무한한 객체에서도 이터레이터를 사용할 수 있습니다.

```javascript
class FibonacciSequence {
    [Symbol.iterator]() {
        let a = 0, b = 1
        return {
            next() {
                let currentVal = {value: b, done: false}
                b += a
                a = currentVal.value
                return currentVal
            }
        }
    }
}

// 1, 1, 2, 3, 5, 8, 13, 21, 34 ......... 무한히 나올 것이다.
```

### 참고 도서

Learning JavaScript (한빛 미디어)