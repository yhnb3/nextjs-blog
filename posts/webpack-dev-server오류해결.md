---
title: "error: Cannot find module 'webpack-cli/bin/config-yargs' 해결"
tags: 'JavaScript webpack'
date: '2021-04-13'
---

 # 해결방안

webpack과 webpack-cli를 함께 사용하면서 webpack-dev-server를 이용할때 생기는 에러입니다.

```cmd
npx webpack serve
```

다음과 같은 명령어로 webpac-dev-server를 실행 시키면 정상적으로 서버가 실행 됩니다.

### 참고사이트

- https://webpack.js.org/configuration/dev-server/