
const coinChange = (coins, amount, mem = {}) => {
    if (amount === 0) return 0
    if (amount in mem) return mem[amount]

    let minCoins = Infinity

    for (let i = 0; i < coins.length; i++) {
        const coin = coins[i]
        if (coin <= amount) {
            const remain = amount - coin
            const result = coinChange(coins, remain, mem) + 1
            minCoins = Math.min(minCoins, result)
        }
    }

    mem[amount] = minCoins
    return minCoins
}

coins = [1, 3, 4]
amount = 6

console.log(coinChange(coins, amount))

dp = []

// amount 0
dp[0] = 0

// amount 1
dp[1] = 1 + dp[0]

// amount 2
// 1 + 1
dp[2] = 1

// amount 3
// 1 + 1 + 1
// 3
dp[3] = 2

// amount 4
// 1 + 1 + 1 + 1
// 1 + 3
// 3 + 1
dp[4] = 2
 