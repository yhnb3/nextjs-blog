---
title: Maximum Sum Obtained of Any Permutation
tags: 'Algorithm'
date: '2021-08-31'
---

## 1589. Maximum Sum Obtained of Any Permutation

문제 출처 https://leetcode.com/problems/maximum-sum-obtained-of-any-permutation/

### 문제 설명

숫자를 나열한 `nums`배열과 [start, end] 로 이루어진 `requests`배열이 주어집니다. `nums`배열로 만들 수 있는 조합 중 `requests`배열의 원소의 start - end 의 배열 부분합의 합을 최대로 하는 값을 구하는 문제입니다. 

### Solution

```python
## 풀이의 목표
## 최빈값을 가지는 index를 찾아서 가장 큰 값을 배정해주는 식으로 문제를 풀것입니다.
class Solution:
    def maxSumRangeQuery(self, nums: List[int], requests: List[List[int]]) -> int:
        modulo_num = 10**9+7
        check_num_cnt = [0 for i in range(len(nums)+1)]
        
        ## start, end를 이용해서 O(n)의 시간으로 각 index의 빈도를 구하는 방식입니다
        for start, end in requests:
            check_num_cnt[start] += 1 ## 후에 시작하는 값부터 더할 것이기 때문에 시작부터 끝 인덱스 바로 전까지 1씩 더해집니다. 
            check_num_cnt[end+1] -= 1 ## 끝 인덱스 바로 뒷 인덱스에 -1을 함으로써 더 이상 빈도를 추가하지 않게 됩니다.
   
        cum = 0
        for i in range(len(check_num_cnt)):
            cum += check_num_cnt[i]
            check_num_cnt[i] = cum
        
        check_num_cnt.sort(reverse=True)
        nums.sort(reverse=True)
        
        answer = 0
        for i in range(len(nums)):
            answer += nums[i] * check_num_cnt[i]
        
        return answer % modulo_num
```

이 문제에서 가장 중요했던 점은 start, end을 이용해서 각 인덱스의 빈도를 구할때 얼마나 빠르게 구현할 수 있는지 였다. 처음에는 2중 배열을 이용하다 보디 O(N^2)의 시간이 걸리는 바람에 통과하지 못했는데, 위와 같은 방식을 이용하면 O(N)의 시간을 통해 구할 수 있었습니다.