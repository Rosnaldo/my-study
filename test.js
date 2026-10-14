const removeEdges = (arr) => {
    return arr.slice(1, arr.length - 1)
}

console.log(
    removeEdges([10, 20, 30, 40, 50])
)

const removeIndex = (arr, index) => {
    arr.splice(index, 1)
    return arr
}

console.log(
    removeIndex([10, 20, 30, 40, 50], 1)
)

const rotate = (arr) => {
    const last = arr.splice(arr.length - 1, 1)
    arr.splice(0, 0, last[0])
    return arr
}
console.log(
    rotate([10, 20, 30, 40, 50])
)

const insertAt = (arr, index, value) => {
    arr.splice(index, 0, value)
    return arr
}

console.log(
    insertAt([10, 20, 30, 40, 50], 2, 70)
)

const removeRange = (arr, start, end) => {
    const leftPiece = arr.slice(0, start)
    const rightPiece = arr.slice(end + 1, arr.length)
    return [...leftPiece, ...rightPiece]
}

console.log(
    removeRange([1, 2, 3, 4, 5, 6], 2, 4)
)

const chunk = (arr, k) => {
    const pieces = Math.ceil(arr.length / k)
    const result = []
    for (let i = 1; i <= pieces; i++) {
        const piece = arr.slice(3 * (i - 1), 3 * (i))
        result.push(piece)
    }
    return result
}

console.log(
    chunk([1, 2, 3, 4, 5, 6, 7], 3)
)

const move = (arr, x, y) => {
    const elem = arr.splice(x, 1)
    arr.splice(y, 0, elem[0])
    return arr
}

console.log(
    move([1, 2, 3, 4, 5], 1, 3)
)


const rotateX = (arr, k) => {
    const piece = arr.splice(arr.length - k, k)
    arr.splice(0, 0, ...piece)
    return arr
}

console.log(
    rotateX([1, 2, 3, 4, 5], 3)
)