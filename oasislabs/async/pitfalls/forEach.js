const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'
]

async function getTodos() {
  await urls.forEach(async (url, idx) => { 
    const todo = await fetch(url)
    console.log(`Received Todo ${idx+1}:`, await todo.json())
  })
  
  console.log('Finished!')
}
;( async () => {

  await getTodos()
})()
