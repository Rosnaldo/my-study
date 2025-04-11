const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'
]

async function getTodos() {
  for (const [idx, url] of urls.entries()) {
    const todo = await fetch(url)
    console.log(`Received Todo ${idx+1}:`, await todo.json())
  }

  console.log('Finished!')
}

;( async () => {

  await getTodos()
})()