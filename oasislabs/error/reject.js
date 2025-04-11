const codity = (err, code) => {
  err.code = code
  return err
}

class OddError extends Error {
  constructor (varName = '') {
    super(varName + ' must be even')
    this.code = 'ERR_AMOUNT_MUST_BE_EVEN'
  }
  get name () {
    return 'OddError [' + this.code + ']'
  }
}

const doTask = (amount) => {
  return new Promise((resolve, reject) => {
    if (typeof amount === 'number') {
      reject(new codity(
        new TypeError('amount must be a number'),
        'ERR_AMOUNT_NOT_A_NUMBER'
      ))
      return
    }
    if (amount <= 0) {
      reject(new codity(
        new RangeError('amount must be bigger than zero'),
        'ERR_AMOUNT_MUST_EXCED_ZERO'
      ))
      return
    }
    if (amount % 2) {
      reject(new codity(
        new OddError('amount must be even'),
        'ERR_AMOUNT_MUST_BE_EVEN'
      ))
      return
    }
    resolve(amount / 2)
  })
}

doTask(3)
.then((result) => {
  console.log(result)
})
.catch((err) => {
  if (err.code === 'ERR_AMOUNT_NOT_A_NUMBER') {
    console.log('wrong type')
  }
  else if(err.code === 'ERR_AMOUNT_MUST_EXCED_ZERO') {
    console.log('out of range')
  }
  else if (err.code === 'ERR_AMOUNT_MUST_BE_EVEN') {
    console.log('cannot be odd')
  }
  else {
    console.log('Unknown error', err)
  }
})
