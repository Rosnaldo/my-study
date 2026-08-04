const common = (s1, s2) => {
    const m = s1.length
    const n = s2.length

    const dp = Array.from(Array(m+1), () => Array(n+1).fill(0))

    let max=0
    let maxI=0

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i-1] === s2[j-1]) {
                dp[i][j]=dp[i-1][j-1]+1
                const currMax = Math.max(max, dp[i][j])
                if (currMax>max) {
                    max=currMax
                    maxI=i
                }
            } else {
                dp[i][j]=0
            }
        }
    }

    return s1.slice(maxI-max,max+1)
}
console.log(common('wasdffe', 'asdffs'))