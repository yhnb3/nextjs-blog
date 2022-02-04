---
title: 'swr 사용해보기'
tags: 'React Project'
date: '2022-02-03'
---

기존 하고 있는 프로젝트에 `swr`을 적용해 보려고 한다.

#### 공식 사이트

https://swr.vercel.app/ko

일단 swr의 좋은점은 굉장히 빠르고 에러처리를 따로 해주지 않아도 되는 점 인것 같다.

### 과정

1. 일단 무지성으로 `redux`를 사용한 페이지들을 찾고
2. `useSWR`을 이용해서 `custom hook`  만들고
3. `redux`없이 바로 `container component`내 에서 `custom hook`을 이용해 데이터 패칭 받는다.

#### useFetchingData 

```typescript
// 데이터 패칭을 위한 커스텀 훅

import axios from 'axios'
import useSWR from 'swr'

interface Props {
  urls: Array<string>,
}


const useFetchData: any = ({...props} : Props) => {
  const fetcher = (urls : Array<string>) => {
    const f = (url : string) => axios.get(url).then((res) => res.data)
    return Promise.all(urls.map(f))
  }; // 이 부분은 여러번 data 패치하는 부분을 promise.all로 간소화 하기 위함이다.
  const { data, error } = useSWR(
    [props.urls], // 꼭!!! 배열 안에 url배열을 넣어야 한다. 바로 url배열을 넣는 경우 useSWR에서는 첫번째 인자만을 인식한다.  
    fetcher,
  );

  if (!error && !data) return {loading: true}
  if (error) return {hasErrors: true}
  return {data}
}

export default useFetchData
```

##  :loudspeaker:수정

어제는 여러 요청을 한꺼번에 `response.all`을 이용해서 처리하는 방법을 논하였으나 공식 사이트를 조금 더 읽어 보니 `swr`을 만든이의 입장으로 보았을때 조금은 잘못된 사용 방법 인것 같아서 고치려고 합니다.

일단 만든이는 기존에 가장 높은 부모 컴포넌트에서 즉 가장 `top level component`에서 `useEffect`를 이용해 데이터를 패치한 후 데이터를 뿌리던 예전 방법을 벗어나 이제 각 각의 컴포넌트에서 데이터를 패치할 때 유용하게 사용할 수 있도록 `swr`을 설계 하였다고 합니다.

위의 방법이 아닌

```typescript
import axios from 'axios'
import useSWR from 'swr'

interface Props {
  url:	string,
}


const useFetchData: any = ({...props} : Props) => {
  const fetcher = (urls : Array<string>) => axios.get(url).then((res) => res.data)
  const { data, error } = useSWR(
    props.urls, 
    fetcher,
  );

  if (!error && !data) return {loading: true}
  if (error) return {hasErrors: true}
  return {data}
}

export default useFetchData
```

이와 같은 방법으로 컴포넌트 단위로 나누어서 데이터 패치를 하는 것이 좀 더 만든이의 의도가 들어간 방법이라 생각합니다.

동일한 `SWR`키를 사용하여 그 요청이 자동으로 중복 제거, 캐시, 공부 되므로 단 한번의 요청만 API로 전송된 다는 것입니다. 그리고 다양한 사용자 포커스나 네트워크 재연결시에 데이터를 갱신 할 수 있다고 하니 이런 것들을 응용해 보는 것도 재밌을 것 같다는 생각이 들었습니다.

### 정보 출처

https://swr.vercel.app/ko

https://stackoverflow.com/questions/69837146/use-swr-to-fetch-multiple-times-to-populate-an-array