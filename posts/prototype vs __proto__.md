---
title: 'prototype vs __proto__'
tags: 'JavaScript'
date: '2021-07-28'
---

# prototype vs  \_\_proto__

`prototype`에 대한 이전 포스트 

https://nextjs-blog-yhnb3.vercel.app/posts/Javascript%EC%9D%98-Prototype

이전에는 프로토 타입에 대해 기본적으로 알아보았습니다. 하지만 공부를 하다보니 조금 궁금한 점이 생겼습니다. 어떤 객체는 `prototype`이라는 객체를 가지고 있고 어떤 객체는 가지고 있지 않습니다. 어떤 차이 때문에 이러한 것을 보이는지에 대해 살짝 알아보겠습니다.

### Prototype

본론부터 얘기하면 자바스크립트 내에서 객체 생성자는 `prototype`이라는 객체를 가지게 됩니다. 

```javascript
function Person(age) {
    this.age = age
}

//ES6 ~
class Person {
    contructor(age) {
        this.age = age
    }
}
```

함수형태의 생성자나 `Class`형태의 생성자 모두 `prototype`이라는 객체를 가지게 됩니다. 

```javascript
let p = new Person(29)
```

다음과 같이 생성자를 이용해서 p라는 객체를 만들면 `p.__proto__`에 생성자의 `prototype`이 할당됩니다.

우리가 흔히 얘기하는 **프로토타입 체인**도 객체의 `__proto__`속 `__proto__` 속 `__proto__`와 같은 식으로 재귀 형식으로 우리가 원하는 프로퍼티의 값이 나올때까지 혹은 `__proto__`가 존재하지 않을때까지 찾는 것을 의미한다.

#### 즉, 우리는 프로토타입 체인은 `__proto__`를 통해서 이루어지며, `prototype`객체는 생성자에만 존재한다.

사실 `prototype`이라는 객체에 대한 완벽한 이해가 되지 않아서 공부를 하고 이와 같은 포스트를 작성하게 되었지만 막상 공부를 하고 `__proto__`와 `prototype`에 대해 적으려고하니 너무 당연한 얘기를 서술하는것 같아서 조금 어색하긴합니다. 하지만 이런 포스트를 머리 속으로 스스로 정리하며 작성을 하다보면 조금씩 더 기억에 남는 것 같습니다.

