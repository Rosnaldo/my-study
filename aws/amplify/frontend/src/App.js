import { useEffect } from "react"
import axios from "axios"

function App() {
  useEffect(() => {
    (async () => {
      axios.get('http://3.91.232.127:3000/')
      .then(({ data }) => {
        console.log(data)
      })
    })()
  }, [])

  return (
    <div className="App">
      Hello World 2
    </div>
  );
}

export default App;
