---
title: Next JS로 프로젝트 업그레이드 하기
tags: 'React NextJS'
date: '2022-03-29'
---

### 기존 사이트

https://tmdb-made-by-kangwoo.netlify.app/

기존 사이트를 방문하면 방문하자마자 느끼겠지만 초기 로딩이 굉장히 느리다. 즉, 유저들의 사용경험이 굉장히 안좋을 것이다.

그래서 사이트 특성상 `Next JS`를 이용하면 더 좋은 사용자 경험을 제공할 수 있을거 같아서 시작하였다.

### 목표

1. 모든 컴포넌트는 `typescript`로 만들기.
2. 메인페이지는 ISR를 이용하여 빠르게 로딩 될 수 있도록하기.
3. HOC와 커스텀 훅을 적극적으로 이용하기.

### 구현 상세

1. 메인페이지

   일단 메인페이지는 ISR을 이용하여 빠른 초기 로딩을 빠르게 할 수 있게끔하였습니다.

   > ISR(Incremental Static Re-Generation)이란?
   >
   > SSG는 프로젝트를 빌드하면서 한번만 페이지를 생성하지만 이런 식으로 빌드 했을때 처음 빌드했을때 데이터를 계속해서 이용해야하기 때문에 일정 주기로 데이터를 바뀌는 프로젝트를 하는데 문제가 있다.
   >
   > 하지만 ISR은 일정주기를 두고 그 주기마다 데이터의 변경을 감지하여 새로이 빌드 되는 기법이다.
   >
   > 상세한 내용은 https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration를 참고 하시면 될 것 같습니다.

   영화 사이트 특성상 실시간으로 업데이트 될 필요가 없다고 생각 했기 때문에 ISR을 이용하기에 매우 적합하다는 생각이 들어서 ISR을 이용하여 구현하였습니다.

2. HOC 이용하기.

   HOC는 페이지에 중복되는 기능이 있을 경우 이런 것들을 하나의 HOC를 통해 중복코딩을 최소화 할 수 있습니다.

   ```jsx
   const withContentsPage = <P extends object>(Component: React.ComponentType<P>) => {
     const WithContentsPage = ({section, category, head_line, isMobile, ...props} : withContentsPageProps) => {
       const { data, error, size, setSize} = useInfiniteFetchData({section, category});
   
       return (
         <div className={`mx-auto max-w-screeen ${isMobile ? "px-5 w-full mt-10" : "w-screen pt-10"}`}>
           <p className={`${isMobile ? "text-xl" : "text-4xl"} font-bold`}>
             {head_line}
           </p>
           <InfiniteScroll
             error={error}
             size={size}
             dataLen={data.length}
             setSize={setSize}
           >
             <Component data={data} isMobile={isMobile} {...props as P}/>
           </InfiniteScroll>
         </div>
       )
     }
     return WithContentsPage
   }
   
   export default withContentsPage
   ```

   본 사이트의 페이지 중에 `Infinite scroll`을 이용하는 페이지가 많기 때문에 위와 같이 `HOC`를 통해 중복되는 부분을 해결하려 노력하였습니다.

3. Next JS의 좋은 기능들 이용하기.

   `next js`를 이용하고자 계획했던 초기에는 몰랐지만 `next js`를 공부하며 알게된 좋은 기능들을 추가하였습니다.

   1. `prefetching`

      `next js`의 `Link`를 이용하면 `prefetching`을 이용할 수 있습니다. 그래서 `SSR`을 이용해서 데이터 페칭이 가능한 사이트는 `SSR`로 페이지가  랜더링 되게끔 하였습니다.

   2. `Image optimization`

      `next js`의 `Image`가 가지고 있는 `optimization` 기능을 이용하였으며 placeholder로 `blur`기능을 이용하여 로딩이 조금 덜 지루하게끔 하였습니다.

### 결론

새로 개선된 페이지 : https://tmdb-next.vercel.app

사실 시작은 어떻게 될지 모르겠지만 어쨋든 해보자로 시작하여서 빠르게는 아니지만 결국에 완성하였고, 이번 프로젝트를 업그레이드 하면서 느꼈던 것은 정말 배움이 중요하다는 것을 뼈저리게 느꼈습니다. 쉼 없이 빠르게 진화하는 웹 개발 생태계에서 더 늦게 배우는 사람은 도태 될 수 밖에 없다는 생각이 들정도로 굉장히 좋은 기술들이 많다는 생각이 들었습니다.