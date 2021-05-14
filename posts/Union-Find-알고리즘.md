---
title: Union Find 알고리즘
tags: 'Algorithm Python'
date: '2021-02-22'
---

`union - find `알고리즘은 집합을 이용하여 문제를 풀 때 유용하게 이용할 수 있는 알고리즘 입니다.

## 예제 문제

https://www.acmicpc.net/problem/1717

### 집합의 표현

초기에 {0}, {1}, {2}, ... {n} 이 각각 n+1개의 집합을 이루고 있다. 여기에 합집합 연산과, 두 원소가 같은 집합에 포함되어 있는지를 확인하는 연산을 수행하려고 한다.

집합을 표현하는 프로그램을 작성하시오.

### 입력

첫째 줄에 n(1 ≤ n ≤ 1,000,000), m(1 ≤ m ≤ 100,000)이 주어진다. m은 입력으로 주어지는 연산의 개수이다. 다음 m개의 줄에는 각각의 연산이 주어진다. 합집합은 0 a b의 형태로 입력이 주어진다. 이는 a가 포함되어 있는 집합과, b가 포함되어 있는 집합을 합친다는 의미이다. 두 원소가 같은 집합에 포함되어 있는지를 확인하는 연산은 1 a b의 형태로 입력이 주어진다. 이는 a와 b가 같은 집합에 포함되어 있는지를 확인하는 연산이다. a와 b는 n 이하의 자연수 또는 0이며 같을 수도 있다.

### 문제 풀이

```python
def find(root, num):
    if root[num] == num:
        return num
    else:
        y = find(root, root[num])
        root[num] = y
        return root[num]

def union(root, num1, num2):
    if find(root, num1) == find(root, num2):
        return
    else:
        num1 = find(root, num1)
        num2 = find(root, num2)

        root[num1] = num2


def unionExpression():
    N, M = list(map(int, input().split()))
    inputArr = [list(map(int, input().split())) for _ in range(M)]

    root = [x for x in range(0, N + 1)]

    for operator, num1, num2 in inputArr:
        if num1 > num2:
            num1, num2 = num2, num1
        if operator == 1:
            if find(root, num1) == find(root, num2):
                print("YES")
            else:
                print("NO")
        elif operator == 0:
            union(root, num1, num2)

unionExpression()
```

`root` 배열에 자신의 부모를 저장하는 방식으로 집합을 만들어 나가는 방식입니다.

[0, 1, 2, 3, 4, 5, 6] 이라는 배열이 있을때

0 1 2 라는 `input`을 만나면 1, 2를 같은 집합으로 취급해라는 의미 입니다. 그럼

[0, 2, 2, 3, 4, 5, 6] 으로 `root`배열이 바뀌게 됩니다.

0 2 3을 만나면 

[0, 2, 3, 3, 4, 5, 6]으로 `root`배열이 바뀌게 됩니다. 이로써 1 2 3 은 같은 집합에 속하게 되는 것입니다. 

`find`함수는 원하는 숫자의 가장 부모를 찾아가는 함수입니다.

`union`함수는 두 수의 부모를 비교하여 부모가 다를때 같은 부모로 만들어서 같은 집합으로 인지 할 수 있게 합니다. 

## Union - Find 함수의 최적화

### find 함수의 최적화

```python
def find(root, num):
    if root[num] == num:
        return num
    else:
        y = find(root, root[num])
        root[num] = y
        return root[num]
```

`find`함수를 이용해서 부모를 찾을 때 지나가는 모든 노드의 값을 부모의 값으로 지정해 준다. 그럼으로써 다음에 더 빠르게 부모를 찾아 갈 수 있게 될것이다.

### union 함수의 최적화

```python
def union(num1, num2):
    if find(num1) == find(num2):
        return
    else:
        num1 = find(num1)
        num2 = find(num2)

        if rank[num1] > rank[num2]:
            root[num2] = num1
        else:
            root[num1] = num2
            if rank[num1] == rank[num2]:
                rank[num1] += 1
```

`rank`라는 배열을 만들어서 `rank`가 낮은 집합을 높은 집합에 붙히는 식으로 `union`함수를 최적화 할 수 있다.

이를 `union-by-rank`라고 칭한다. 

위와 같이 `rank`를 이용하면 트리의 높이를 최소한으로 할 수 있으며 `find`함수의 재귀 깊이도 또 한 최소화 되기 때문에 실행 시간을 줄이는데에 많은 도움을 줄 수 있다.



참고 사이트

https://www.geeksforgeeks.org/union-find-algorithm-set-2-union-by-rank/

https://zoomkoding.github.io/algorithm/2019/05/19/Union-Find-2.html

https://ko.wikipedia.org/wiki/%EC%84%9C%EB%A1%9C%EC%86%8C_%EC%A7%91%ED%95%A9_%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0

https://gmlwjd9405.github.io/2018/08/31/algorithm-union-find.html