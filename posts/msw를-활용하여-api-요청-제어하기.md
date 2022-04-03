---
title: msw를 활용하여 api 요청 제어하기.
tags: 'React msw'
date: '2022-04-03'
---



최근에 프론트엔드 과제 테스트를 하면서 일관적으로 요구사항으로 포함되었던 것이 입력에 따라 api 요청을 하지만 한꺼번에 너무 많은 요청이 오지 않도록 제어하도록 하게끔 설계하는 것 이었습니다.

예를 들면 `input`입력에 따라 api 요청을 보내지만 0.2초당 한번으로 제한해달라과 같은 요청이 있었습니다.

그런데 아무래도 가사점에 포함되는 요청이고 기본 구현만으로 시간이 부족했던 터라 구현할 기회가 많이 없었는데 갑자기 한번쯤 해보면 나중에 기회가 있을때 사용할 수 있을것 같아서 구현해보았습니다.

우선 msw를 이용해서 mock server를 구현하였습니다.

>  msw에 대해 간단히 설명하면
>
> 프로젝트 진행 단계에서 backend에서 api설계가 아직 되지 않았을 경우 frontend 에서 mock server를 통해 api 서버처럼 운영할 수 있게끔 도와주는 라이브러리 입니다.
>
> 저는  https://tech.kakao.com/2021/09/29/mocking-fe/ 이곳을 참고하였습니다.

```react
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function Input() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const handlingValue = (e) => {
    setInputValue(e.target.value);
  };

  const fetchDataCallBack = useCallback(async () => {
    if (isLoading) {
      const data = await axios.get(`/api/me?value=${inputValue}`);
      console.log(data.data.message);
      setTimeout(() => {
        console.log("제한 시간 시작");
        setIsLoading(false);
      }, 0);
      setTimeout(() => {
        console.log("제한 시간 끝");
        setIsLoading(true);
      }, 1000);
    }
  }, [inputValue]);

  useEffect(() => {
    fetchDataCallBack();
  }, [fetchDataCallBack]);

  return (
    <>
      <input value={inputValue} onChange={handlingValue}></input>
    </>
  );
```

일단 전체적인 코드 입니다.

1. controlled component로 input 컴포넌트를 설계하였습니다.
2. useCallback을 이용하여 inputValue가 바뀔때 마다 함수를 새로 만들게끔하였습니다.
3. 그리고 로딩시간 동안은 데이터를 패치하지 못하도록 하였고
4. useEffect 안에 fetchDataCallback을 넣어 함수가 바뀔때마다 리렌더링 하도록 하였습니다.



### 의문점

fetchDataCallBack의 dependency로 isLoaidng을 넣지 않아 warning이 생기는데 사실 isLoading을 넣어버리면 나의 의도는 입력값이 바뀔때마다 데이터 호출인데 1초마다 데이터를 호출 해야하게 된다. 

이 문제점을 고치려고 오랜시간 동안 고민을 했지만 명확한 답이 나오지 않았습니다. 조금 더 경험하고 고민해 봐야할 것 같습니다.

### 실제코드

https://github.com/yhnb3/api-call-controll-example