// function f (n = 99) {
//   if (n === 0) throw Error()
//   f(n - 1)
// }
// f()

const func2 = () => {
  
  console.log("func2")
}

const funcInside2Error = () => {
  debugger
  console.log("funcInside2Error")
  throw Error('Errorou !!!!')

}

const funcInsideError = () => {
  console.log("funcInsideError")
  
  funcInside2Error()
}

const funcError = () => {
  
  console.log("funcError")
  funcInsideError()
}

const func = () => {
  
  console.log("JOJO")
  console.log("JOJO1")
  console.log("JOJO2")
  func2()
  console.log("JOJO3")
  console.log("JOJO4")
}

func()
func()
func()
funcError()
func()