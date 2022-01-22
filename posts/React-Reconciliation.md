---
title: 'React Reconciliation'
tags: 'React'
date: '2022-01-22'
---

최근에 면접을 보면서 reconciliation에 관한 질문이 나왔지만 한번도 다뤄보지 못한 주제라 제대로 대답을 하지 못했었다. 그래서 오늘 reconciliation에 대해 한번 알아 보도록 하겠습니다.

> Reconciliation(재조정)
>
> react가 virtual DOM을 이용하여 더 빠르게 변경사항에 따라 DOM트리를 구축할 수 있게 됩니다. virtual DOM트리에서 변경 사항을 비교하는 것을 `Reconciliation`이라 말합니다.

## 비교 알고리즘

두 개의 트리를 비교할 때 React는 두 엘리먼트의 root 엘리먼트부터 비교합니다. 

### 엘리먼트 타입이 다른 경우

두 루트 엘리먼트의 타입이 다르면, React는 이전의 트리를 버리고 오나전히 새로운 트리를 구축합니다.

트리를 버릴 때 이전 DOM 노드들은 모두 파괴됩니다. 

컴포넌트 인스턴스는 `componentWillUnmount()`가 실행됩니다.

새로운 DOM노드들이 DOM에 삽입됩니다. 그에 따라 인스턴스는 `componentWillMount()` 가 실행됩니다.

`componentDidMount()`가 추가로 실행됩니다. 이전 트리와 연관된 모든 state들은 사라집니다.

### DOM 엘리먼트 타입이 같은경우

두 엘리먼트 속성을 확인하여, 동일한 내역은 유지하고 변경된 속성들만 갱신합니다.

```html
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

이 둘 엘리먼트를 비교하면 `className`만 비교하여 수정합니다.

DOM노드의 처리가 끝나면 React는 이어서 해당 노드의 자식들을 재귀적으로 처리합니다.

### 자식에 대한 재귀적 처리

DOM노드의 자식들을 재귀적으로 처리할 때, React는 기본적으로 동시에 두 리스트를 순회하고 차이점이 있으면 변경을 생성합니다.

```html
<ul>
    <li>first</li>
    <li>second</li>
</ul>

<ul>
    <li>first</li>
	<li>second</li>
	<li>third</li>
</ul>
```

위 리스트에서 아래리스트 처럼 엘리먼트를 추가하는 것을 쉽고 잘 작동 할 것입니다. 하지만 단순하게 리스트 끝에 추가하는 식으로 설계하면 리스트 앞이나 리스트 중간에 추가하게 될 경우 비효율적으로 동작할 것입니다.

#### keys

이러한 문제를 해결하기 위해 React는 `key`속성을 지원합니다. 자식들이 `key`를 가지고 있다면 React는 `key`를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인합니다. 예를들어, 위 비효율적인 예시에 `key`를 추가하여 트리의 변환 작업이 효율적으로 수행되도록 수정 할 수 있습니다.

```html
<ul>
    <li key="2">second</li>
    <li key="3">third</li>
</ul>

<ul>
    <li key="1">first</li>
	<li key="2">second</li>
	<li key="3">third</li>
</ul>
```

React는 이제 "1" 이라는 `key`를 가진 엘리먼트가 새로 추가 되었고 "2"와 "3"을 가진 엘리먼트는 그저 이동만 하면 되는 것을 알 수 있습니다.

그리고 `key`는 중복되어서는 안되지만 전역적으로 중복되지 않는 것이 아니라 오로지 형제사이들 끼리만 유일하면 됩니다.

인덱스를 `key`로 사용할 수 있지만 재배열 된다면 `key`도 바뀌게 되고 컴포넌트의 `state`와 관련된 문제가 발생할 수 있습니다.



