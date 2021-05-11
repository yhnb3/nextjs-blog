---
title: Map과 Set
tags: 'JavaScript'
date: '2021-04-06'
---
map과 set은 ES6에서 새로 도입한 데이터 구조이며 맵은 `key`와 `value`를 연결한다는 점에서 객체와 유사하고 셋은 중복을 허용하지 않는 다는 점에서 배열과 비슷합니다.

### Map

ES6이전에는 키와 값을 연결하려고 하면 객체를 이용해야 했습니다. 하지만 이렇게 한다면 많은 단점이 존재했습니다. 하지만 `Map`객체는 이러한 단점들을 모두 해결했고 키와 값을 연결하려는 목적이라면 객체보다 나은 선택입니다.

```javascript
const u1 = { name: 'Cynthia'}
const u2 = { name: 'Jackson'}
const u2 = { name: 'Olive'}
const u2 = { name: 'James'}

const userRoles = new Map()

userRoles.set(u1, 'User')
userRoles.set(u2, 'User')
userRoles.set(u3, 'Admin')

// 이런식으로도 가능합니다.
userRoles
	.set(u1, 'User')
	.set(u1, 'User')
	.set(u1, 'Admin')

// 이와같은 형태도 가능합니다.
const userRoles = new Map([
    [u1, 'User'],
    [u2, 'User'],
    [u3, 'Admin'],
])

// u2의 역할을 가져오는 get 함수도 있습니다.
userRoles.get(u2) // 'User'

// u2가 역할이 있는지를 판단하는 has함수도 있습니다.
userRoles.has(u2) // true
userRoles.has(u4) // false

// userRoles의 크기를 반환하는 size 프로퍼티도 있습니다.
userRoles.size // 3

// 맵의 요소를 지우기 위해서는 delete를 이용하면됩니다.
userRoles.delete(u2)

for(let r of userRoles.values()) // 이와같이 values 프로퍼티를 이용하여 이터러블 객체를 만들 수 있습니다.

[...userRoles.values()] // 이와 같이 사용하면 ['User', 'User', 'Admin']와 같은 배열을 생성할수도 있습니다.
```

### Set

셋은 중복을 허용치 않는 데이터 집합입니다. 이전 예제를 함께 다시 사용하면 관리자는 'User'와 'Admin'이라는 역할을 한꺼번에 가질 수 있지만 똑같은 역할을 여러번 가진다는 것은 상식적이지 않습니다. 셋은 이런 데이터 구조를 다루어야 할때 이상적입니다.

```javascript
const roles = new Set()

// 역할을 추가할때는 add프로퍼티를 이용하면 됩니다.
roles.add("User")
roles.add("Admin")
roles.add("User")

// Map과 마찬가지로 size프로퍼티가 존재합니다.
roles.size // 2 똑같은 역할은 추가되지 않았기 때문에 size는 2 입니다.

// Map와 마찬가지로 delete 프로퍼티가 존재합니다.
roles.delete('Admin') // ["User"]
```

