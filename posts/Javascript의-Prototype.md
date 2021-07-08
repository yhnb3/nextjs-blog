---
title: Javascript의 Prototype
tags: 'Javascript'
date: '2021-07-08'
---

# Javascipt의 Prototype

자바스크립트 프로토타입 기반의 언어라고 할 수 있을 정도로 `프로토타입`이 굉장히 중요한 요소입니다. 그만큼 `프로토타입`을 이해하는 것이 자바스크립트 언어를 배움에 있어서 굉장히 중요한 요소라고 할 수 있습니다. 

자바스크립트의 객체들은 모두 `[[Prototype]]`이라는 은닉 속성을 가지고 있습니다. 이는 그 객체의 `프로토타입`이 되는 다른 객체를 가르킵니다. 상속의 관점으로 보았을때 자신의 부모를 가르킨다고 할 수 있습니다.

쉽게 생각하면 `프로토타입`은 유전자와 같은 것입니다. 부모로부터 물려 받는 속성입니다.

### prototype의 간단한 예

```javascript
function Person(name) {
    this.name = name
}
const kangwoo = new Person('kangwoo')
```

다음과 같이 `jisoo`는 `Person`이라는 함수 객체로 만들어진 객체입니다.  `jisoo`는 `Person`의 모든 속성을 상속 받은 상태입니다.

```javascript
console.log(kangwoo.name) //'kangwoo'

Person.prototype.getName = function(){console.log(this.name)}

kangwoo.getName()  // 'kangwoo'
```

`Person`의 `프로토타입`에 `getName`이라는 함수를 만들어 준 후에 `kangwoo`에서 `getName`을 호출하면 정상적으로 호출되게 됩니다. 



### 프로토타입 체인

```javascript
function Person(name) {
    this.name = name
}
const kangwoo = new Person('kangwoo')

Person.prototype.country = 'korea'
Person.isPerson = true

kangwoo.country  // 'korea'
kangwoo.isPerson  // undefined
```

다음과 같이 `prototype`에 저장하는 속성은 상속받은 객체에서도 접근이 가능하지만 그렇지 않은 속성은 다른 객체에 접근이 가능하지 않습니다.

![image](https://user-images.githubusercontent.com/60080270/124894412-95ad5880-e016-11eb-8a4e-12312e1bcb74.png)

 `kangwoo`객체를 보시면 `country`라는 속성은 `__proto__`에 포함되어 있지만 `isPerson`속성은 `__proto__`의 `constructor`에 포함 되어 있어 `kangwoo`객체가 상속 받지 못한 것을 알 수 있습니다. 여기서 `__proto__`가 위에서 설명햇던`kangwoo`객체의 `프로토타입`이며 `Person`을 가르킵니다.

보다 싶이 객체들은 모두 `__proto__`라는 속성을 가지며 이 속성을 이용한 것이 프로토타입 체인이다.

`kangwoo.country`를 호출하면 일단 `kangwoo`객체 내에서 `country`라는 속성을 찾는다. 찾지 못하면 `__proto__`에서 `country`라는 속성을 찾고 또 없으면 `__proto__`로 가서 `country`를 찾는다. 이는 `__proto__`가 `null`값 일때까지 반복하게 된다. 이를 `프로토타입 체인`이라고 한다. `__proto__`를 `null`로 가지는것은 `native 객체`이며 여기서는 `function`입니다. 

### 정리

정리를 하면 자바스크립트는 `프로토타입`으로 상속을 구현할 수 있으며 어떠한 속성을 호출을 할때 속성이 존재하는 `프로토타입`을 만나거나 `프로토타입`이 존재하지 않는 `native 객체`까지 둘러보게 되며 이를 `프로토타입 체인`이라고 할 수 있습니다.

### 참조 사이트

 https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Object_prototypes

https://developer.mozilla.org/ko/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#javascript_%EC%97%90%EC%84%9C_%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EC%9D%84_%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94_%EB%B0%A9%EB%B2%95



