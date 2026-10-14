
const climbStairs = (n, mem = {}) => {
    if (n === 0) return 0
    if (n === 1) return 1
    if (n === 2) return 2
    if (n in mem) return mem[n]

    const total = climbStairs(n - 1, mem) + climbStairs(n - 2, mem)
    mem[n] = total
    return total
}

console.log(climbStairs(5))

dp = []
// n = 0
dp[0] = 0

// n = 1
dp[1] = 1

// n = 2
dp[2] = 2

// n = 3
dp[3] = dp[2] + dp[1]
