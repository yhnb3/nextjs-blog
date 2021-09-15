---
title: Redux toolkit 알아보기
tags: 'React Javascript'
date : '2021-09-15'
---

# Redux toolkit

이번에는 본래 `redux`를 업그레이드(?) 했다고 할 수 있는 `redux toolkit`에 대해서 알아보겠습니다.

### Toolkit의 특징

1. 일단 매우 간단하다. `store`를 만들고 `reducer`를 만들고 `불변성 로직`을 유지하기가 더 간단해졌습니다.
2. 그리고 매우 파워풀 해졌습니다. 많은 부분이 자동화 되었고, `immutable update logic`을 `mutable`하게 핸들링 할 수 있습니다.
3. 이제 우리는 더 적은 코드로 `redux`를 이용할 수 있으며 우리의 `app`에 어떻게 적용할지에 더 많은 시간을 할애할 수 있습니다.

> 홈페이지에서 나열된 특징을 해석했으며 약간의 의역이 들어가 있습니다.

제가 생각했을때 가장 큰 변환점은 아무래도 `immutable update logic`을 `mutable`하게 핸들링 할 수 있다는 점 인거 같습니다. 처음 `redux`를 입문하면서 `immutable`한 상태를 유지하는 것에 대한 이해가 부족해서 많은 시행착오를 겪은 기억이 있는데 굉장히 진입장벽이 낮아진 느낌입니다.

```javascript
import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "counter",
  initialState: {
    value1: 0,
    value2: 0,
  },
  /// 본래 reducer와 다르게 state 자체를 변화시키는 방법이지만 toolkit에서는 자동적으로 immutable한 상태를 유지시켜 줍니다.
  reducers: {
    increment: (state, action) => {
      state[`value${action.payload}`] += 1;
    },
    decrement: (state, action) => {
      state[`value${action.payload}`] -= 1;
    },
    incrementByAmount: (state, action) => {
      state[`value${action.payload.id}`] += action.payload.value;
    },
  },
})

export const { increment, decrement, incrementByAmount } = slice.actions;

// redux-thunk를 이용한 비동기 처리입니다.
export const incrementAsyncAmount = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount({ id: 2, value: amount }));
  }, 1000);
};

// createSlice에서 자동으로 state를 생성하는것 같습니다(?)
export const selectCount = (state) => state.counter;

export default slice.reducer;
```

이와 같이 따로 action에 대한 정의도 필요하지 않고 굉장히 쉽게 이용할 수 있게 된 것을 알 수 있습니다.

### 코드 출처

https://github.com/yhnb3/exercise-redux-toolkit