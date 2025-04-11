const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'
]

async function getTodos() {
  const promises = urls.map(async (url, idx) => 
    console.log(`Received Todo ${idx+1}:`, (await (await fetch(url)).json()))
  )

  await Promise.all(promises)

  console.log('Finished!')
}

getTodos()
