---
title: (Leet Code) 1590. Make Sum Divisible by P
tags: 'Algorithm DP'
date : '2021-11-25'
---

## 문제

자연수로 이루어진 배열 `nums`와 자연수 `p`가 주어진다.

연결된 하위 배열을 제거했을 때 나머지 자연수의 합을 `p`로 나누었을 때의 나머지가 0 일때 가장 짧은 하위 배열의 길이를 구하여라.

단, 하위 배열은 기존의 배열보다 작아야하며 불가능할 경우 -1을 리턴하면 된다.

### 문제 풀이

```python
def minSubarray(nums, p):
    dp_dict = {}
    s = sum(nums)
    if s % p == 0: return 0
    t = 0
    dp_dict[0] = 0  ## 누적된 합의 나머지가 p인 경우 필요하다.
    answer = len(nums)
    cnt = 1

    for num in nums:
        t = (t + num) % p
        if (t-s) % p in dp_dict:
            answer = min(answer, cnt - dp_dict[(t-s)%p])
            if answer == 1: return 1
            dp_dict[t] = cnt
            cnt +=1
	
    return answer if answer < len(nums) else - 1
```

### 설명

1. 배열의 총합을 구한다.

   - 배열의 총합이 `p`로 나누어질 경우 0을 리턴한다. 

2. 배열을 순회하면서 누적하며 조건을 확인한다.

   - 값자체가 중요한것이 아니므로 나머지를 비교값으로 사용한다.
   - 0부터 현재 index까지 배열을 제거할 하위 배열으로 생각한다.
     - 이전에 누적된 하위 배열을 제거 하지 않을 수 있는 경우를 판단해서 제거할 하위 배열의 길이를 줄인다.
   - `(t-s) % p`라는 값을 찾는 이유
     - 현재 누적된 배열은 `t`라는 나머지를 가지기 때문에
     - `p - (s - t) % p` 을 나머지로 가지는 이전 누적 배열을 찾는다.
     - 현재 배열 - 이전 배열이 우리가 원하는 제거할 수 있는 하위 배열이되며
     - `p - (s - t) % p == (t-s) % p` 이다.

   - dp_dict[`나머지`]에는 배열의 길이를 저장하기 때문에 **현재 배열 - dp_dict[`나머지`]**는 지울 수 있는 하위 배열의 길이가 된다.

3. 가장 작은 길이를 구하며 `answer`이 배열의 길이와 같을 경우 경우의 수가 존재하지 않을 때이기 때문에 -1을 리턴한다.

