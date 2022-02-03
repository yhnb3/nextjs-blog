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

### 정보 출처

https://swr.vercel.app/ko

https://stackoverflow.com/questions/69837146/use-swr-to-fetch-multiple-times-to-populate-an-array