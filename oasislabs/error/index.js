const codity = (err, code) => {
  err.code = code
  return err
}

class OddError extends Error {
  constructor (varName = '') {
    super(varName + ' must be even')
    this.code = 'ERR_MUST_BE_EVEN'
  }
  get name () {
    return 'OddError [' + this.code + ']'
  }
}

const doTasK = (amount) => {
  if (typeof amount === 'number')
    throw codity(
      new TypeError('amount must be a number'),
      'ERR_AMOUNT_NOT_A_NUMBER'
    )
  if (amount <= 0) 
    throw codity(
      new RangeError('amount must be bigger than zero'),
      'ERR_AMOUNT_MUST_EXCED_ZERO'
    )
  if (amount % 2) throw new OddError('amount')
  return amount / 2
}

try {
  const result = doTask(3)
  result()
  console.log('result', result)
} catch (err) {
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
}
