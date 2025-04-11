import { setTimeout } from 'timers/promises'

const func = async (name, milliseconds = 1000) => {
  await setTimeout(milliseconds)
  console.log(name)
  return name
}

;( async () => {
  const opA = func('A', 1100)
  const opB = func('B', 1000)
  const opC = func('C', 1200)

  await opA.then(() => { console.log('opA') })
  await opB.then(() => { console.log('opB') })
  await opC.then(() => { console.log('opC') })
})()
