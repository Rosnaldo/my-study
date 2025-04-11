const express = require('express')
const v8 = require('node:v8')

const app = express()

const largeStrings = []
const largeNum = []
const largeDates = []

const wasteOfmemory = () => {
    for (let x = 0; x < 30000; x++) {
        largeStrings.push('somedata')
        largeNum.push(x)
        largeDates.push(new Date())
    }  
}

app.get('/', (req, res) => {
    console.profile()
    wasteOfmemory()
    console.profileEnd()
    v8.writeHeapSnapshot()
    res.send('Hello World!')
})

app.get('/error', (req, res) => {
    console.log('JOJ')
    throw Error('OJJOJOJO')
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})