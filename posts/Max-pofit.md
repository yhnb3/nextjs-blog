---
title: (leet code) max profit
tags: 'Algorithm Python'
date: '2021-03-10'
---
`DP`

Best Time to Buy and Sell Stock with Transaction Fee

**Medium**

You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day, and an integer `fee` representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

**Note:** You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

 

**Example 1:**

```
Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
```

간단히 설명하면 주식의 주가가 `prices`라는 배열로 표현되고 주식을 사고파는 행위를 통해 얻을 수 있는 최대의 이익을 도출해내는 문제입니다.

당연히, 주식은 사야만 팔 수 있습니다.

### Solution

```python
def maxProfit(prices, fee):
    profit = 0                ## 각 idx에서 얻을 수 있는 최대의 이익을 저장
    buyStock = -prices[0]     ## 주식을 사고 난 후의 버짓을 저장 최초의 지갑은 첫 주식을 산 이후의 버짓으로 저장
    for price in prices:
        profit = max(profit, buyStock + price - fee)   ## 특정한 주가에서 버짓과 주가를 더하고 수수료를 빼면 얻을 수 있는 이득이며 최대값을 
        											   ## 저장하여 가지고 간다.
        buyStock = max(buyStock, profit - price)       ## 현재 profit에서 현재 주가를 빼면 자기는 버짓이 나오며 버짓은 항상 최대값을 가질 수                                                        ## 있게 한다.
   	return profit
```

이 문제에서 잘 이해해야하는 부분은 버짓과 이익의 상호작용을 잘 이해해야한다.

1. 주식을 사면 버짓이 정해진다.
2. 버짓을 가지고 어떠한 시기에 팔면 이익이 정해진다.
3. 이익을 가지고 어떤 주식을 또 산다.

이런 알고리즘을 반복하며 이익의 최댓값을 찾게 됩니다. 조금 더 상세하게 알고리즘을 설명하자면

1. 주가마다 버짓의 최대값을 찾는다. 

2. 버짓의 최대값을 정하면 그 버짓을 통해 이익의 최대값을 찾는다.

3. **이익을 봤지만 주식을 사지 않는다면 버짓은 주식을 팔지 않은 상태로 유지된다.**

   어떤 시점에서 주식을 판걸로 이익을 산정하였지만 그 후에 팔지 않음으로써 더 큰 이득을 볼 수도 있습니다. 하지만 가지고 있는 이익보다 더 값싼 주식이 생긴다면 언제든지 사는 것이 이득일 것입니다. 왜냐하면 이미 주식 거래를 통해 이득을 봤고, 더 큰 잠재적인 이득을 기대할 수 있기 때문입니다.