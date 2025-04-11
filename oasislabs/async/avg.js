// const avgSync = () => {
//   for (let i = 0 i < n i++)
//     sum += i
//   let avg = sum / n
//   console.log('avg: ' + avg)
// }

const asyncAvg = (n, avgCB) => {
  // Save ongoing sum in JS closure.
  var sum = 0
  function help(i, cb) {
    sum += i
    if (i == n) {
      cb(sum)
      return
    }

    // "Asynchronous recursion".
    // Schedule next operation asynchronously.
    setImmediate(help.bind(null, i+1, cb))
  }

  // Start the helper, with CB to call avgCB.
  help(1, function(sum){
      var avg = sum/n
      avgCB(avg)
  })
}

asyncAvg(2000000, function(avg){
  console.log('avg of 1-n: ' + avg)
})
