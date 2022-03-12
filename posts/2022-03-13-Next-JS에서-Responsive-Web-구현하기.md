---
title: Next JS에서 Responsive Web 구현하기
tags: 'React NextJs'
date: '2022-03-13'
---

기존에 React 만을 이용해 구현하였던 웹 사이트를 좀 더 업그레이드 하기 위해 `nextjs`를 이용하고 있었습니다.

그러던 와중에 기존에 사용하던 `Responsive web`을 위한 분기가 적용되지 않는 것을 알게 되었습니다.

```react
if (window.innerWidth <= 500) {
    return <Mobile />
}
return <DeskTop />
```

`window 객체` 의 `innerWidth`프로퍼티를 이용하였습니다. 하지만 `SSR` 특성상 렌더링 과정에서 `window 객체`를 인식하지 못하기 때문에 다른 방법을 이용하여야 했습니다. 하지만 감사하게도 `vercel`측에서 제공하는 영상에서 해답을 찾을 수 있었습니다.

> isMobile

```react
import * as Parser from "ua-parser-js"

export default function isMobile(req) {
    let userAgent;
    
    if(req) {
        userAgent = Parser(req.headers['user-agent'] || '')
    } else {
        userAgent = new Parser().getResult();
    }
    
    return userAgent?.device?.type === 'mobile'
}
```

> SSR

```react
export async function getServerSideProps(context) {
    return  {
        props: {
            isMobile: isMobile(context.req)
        }
    }
}
```

SSR에서는 `context` 내에 존재하는 `req`변수를 이용해 mobile device 유무를 판단가능하다.

> SSG

```react
const Mobile = dynamic(() => import("./Mobile"))
const Desktop = dynamic(() => import("./Desktop"))            
                       
export async function getStaticGenerationProps() {
    return  {
        props: {
            isMobile: isMobile()
        }
    }
}
```

SSG는 빌드 과정에서 진행하는 것이기 때문에 기존의 Component들을 미리 import 하는 것이 아니라 dynamic import 함으로써 해결가능하다.



### 참고 영상

https://www.youtube.com/watch?v=K7g8X_VRDy8 

 