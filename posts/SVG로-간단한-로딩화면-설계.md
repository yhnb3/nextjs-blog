---
title: 'SVG로 간단한 로딩화면 설계'
tags: 'SVG'
date: '2021-07-19'
---

# SVG로 로딩 화면 만들기

오늘은 svg를 입문한 기념으로 간단한 로딩화면에 사용될 수 있는 빙글빙글도는 원을 만들어 보았습니다. 여태까지 `css`만 이용해서 만들어 보았는데 `svg`로 만드니 조금 새로운 감은 없지 않아 있는것 같습니다.

```html
<svg width="200" height="200">
    <circle cx="100" cy="100" r="80" fill="transparent" stroke-dasharray="200" stroke="#3C959B" stroke-width="10">
        <animateTransform attributeName="transform" type="rotate"
                          from="0 100 100"
                          to="360 100 100"
                          dur="0.7s"
                          repeatCount="indefinite"/>
    </circle>
</svg>
```

일단 `100, 100`을 중심으로 하는 원을 `stroke-dasharray`를 이용하여 적당한 길이만큼 표현되게끔 만든다.

`animateTransform`을 이용해서 무한으로 돌 수 있게끔 지정을 하면 적당한 로딩화면이 생성된다.

### codepen으로 결과물 보기

https://codepen.io/yhnb3/pen/gOWRKdV?editors=1000

### 참고사이트

https://developer.mozilla.org/en-US/docs/Web/SVG

