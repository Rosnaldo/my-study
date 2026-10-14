
const uniquePaths = (n, m) => {
    const dp = new Array(n).fill(
        new Array(m).fill(1)
    )
    let max = 0

    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            dp[i][j] = dp[i][j-1] + dp[i-1][j]
            max = Math.max(max, dp[i][j])
        }
    }

    return max
}

console.log(uniquePaths(3, 7))

// [1][1][1][1]
// [1][2][3][4]