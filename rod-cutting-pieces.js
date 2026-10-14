
const rodCuttingPieces = (prices, len) => {
    if (len === 0) return 0;

    let maxPrice = 0;

    for (let i = 1; i <= len; i++) {
        const price = prices[i - 1] + rodCuttingPieces(prices, len - i);

        maxPrice = Math.max(maxPrice, price);
    }

    return maxPr
}

console.log(
    rodCuttingPieces([1, 5, 8, 9, 10, 17, 17, 20], 8)
)

// length 0
dp[0] = 0

// length 1
dp[1] = prices[0] + dp[0]

// length 2
dp[2] = prices[1] + dp[0]
dp[2] = prices[0] + dp[1]

// length 3
dp[3] = prices[0] + dp[2]
dp[3] = prices[1] + dp[1]
dp[3] = prices[2] + dp[0]


//length 8

dp[8] = prices[2] + dp[6]
