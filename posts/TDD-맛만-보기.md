---
title: TDD 맛만 보기
tags: 'JavaScript Jest TDD'
date: '2021-04-23'
---

## TTD의 시작

TTD의 창시자 켄트백은 TTD의 진정한 가치는 **어려운일을 작은 단계로 쪼갤 수 잇는 능력**이라고 했습니다. 개발 요구 사항을 아주 작은 단계로 쪼개어서 하나씩 해나갈때 **먼저 작성된 테스트**가 올바른 길잡이가 되어준다고 말했습니다.

TTD의 장점을 올바른 테스트 코드라고 생각한다면 오산입니다. TTD의 장점은 **어려운일을 작은 단계로 쪼갤수 있는 능력** 이며 테스크 코드는 그런 일을 하기 위한 방식일 뿐입니다. 

## TDD의 과정

- TEST FAIL
- TEST SUCCESS
- REFACTOR

TDD는 테스트 코드를 작성 한 후 통과할 수 있는 테스트 코드로 만든다. 그리고 그 테스트 코드가 통과 한다면 리팩토링을 하는 과정을 반복하면 된다. 중요한것은 **항상 테스트 코드를 먼저 작성한 후 로직을 짜는 것이다.**  (사실 아직 이 말의 의미를 정확하게는 이해하지 못했다. 점점 TDD를 알아가면서 이해할 수 있을 것이라 믿고 있다.)

## 사용 툴

TDD를 위해서 어떤 툴을 이용할 것이냐하면 `JEST`를 이용할 것이다. `JEST`는 FE개발에 이용되는 많은 언어를 테스트 할 수 있는 툴이다.

일단 `JEST`를 가볍게 이용해 보도록 하겠습니다.

## 실습

일단 빈 폴더에 `adder.js`라는 파일을 만듭니다.

우리는 `adder.js`를 테스트 하기 위한 환경을 구성하겠습니다.

```bash
npm init
npm i --save-dev jest
```

 

package.json

```
...
"scripts": {
    "test": "jest"
  },
...
```

`npm test`를 이용하기 위해 `package.json`에 test를 위해 이용할 툴을 jest로 설정해 줍니다.



`adder.js`

```javascript
module.export = null;
```

`adder.test.js`

```javascript
const { expect } = require("@jest/globals")
const adder = require("./adder")

test("should add two numbers", () => {
    expect(adder(1, 2)).toBe(3) // 여기서 toBe는 matchers라고 하는데 이번에는 toBe많은 이용해서 jest 사용법을 맛보겠습니다.
    							// toBe()는 값을 확인하는 matchers입니다.
    							// 즉, adder(1,2)가 3을 리턴하는지 확인하는 테스트 코드라고 할 수 있습니다.
})
```

터미널에 `npm test`를 입력합니다.

![image](https://user-images.githubusercontent.com/60080270/115867741-6b67e800-a476-11eb-870e-085c3fd4afd8.png)

adder.js의 함수를 완성하지 않았지 때문에 당연히  테스트 코드는 실패 합니다.



`adder.js`

```javascript
const adder = (a, b) => {
    return a + b
}

module.exports = adder
```

`adder.js`를 다음과 같이 고치고 테스트를 실행해보면

![image](https://user-images.githubusercontent.com/60080270/115868012-c1d52680-a476-11eb-8f84-05d0ff3bd36e.png)

테스트가 성공적으로 마무리 되었습니다.

그럼 조금 더 향상된 `adder.js`를 만들어 봅시다.

`adder.test.js`

```javascript
test("should add three numbers",  () => {
    expect(adder(1, 2, 3)).toBe(6)
}
// adder.text.js에 다음과 같은 테스트를 추가한후 테스트 해봅시다.
```

![image](https://user-images.githubusercontent.com/60080270/115868263-25f7ea80-a477-11eb-8a15-d5f9b4c8aa05.png)

역시나 실패입니다. 이 테스트 코드를 통과하기 위해 `adder.js`함수에 몇개의 수가 들어오던지 그 수의 총합을 리턴할 수 있게 향상 시켜봅시다.

`adder.js`

```javascript
const adder = (...nums) => {
    return nums.reduce((total, num) => total, num, 0) 
}

module.exports = adder
```

![image-20210423210500782](C:\Users\yhnb3\AppData\Roaming\Typora\typora-user-images\image-20210423210500782.png)

테스트 결과는 역시나 성공적입니다.



오늘은 jest를 이용해 간단하게 테스트 코드를 작성하고 테스트하는 법에 대해서 알아 보았습니다. 이 글을 시작하면서 얘기 했듯이 테스트는 단지 TDD를 위한 방식일뿐 TDD의 진정한 가치와는 거리가 있습니다. 하지만 테스트 하는 방법을 알았으니 이제 어떻게 테스트 코드를 작성하는지에 대해서만 알면 TDD에 한걸을 다가갈 수 있을 것입니다.

다음에 올릴 글은 FE개발에서 어떻게 테스트 코드를 작성하고 테스트 하는지 알아보도록 하겠습니다.

### 참고 사이트

https://jestjs.io/

### git 주소

https://github.com/yhnb3/fe-with-tdd

