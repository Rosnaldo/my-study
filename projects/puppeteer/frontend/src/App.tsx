import { useEffect, useState } from 'react'
import axios from 'axios'
import streamSaver from 'streamsaver'
import { Socket, io } from 'socket.io-client'
import './style.css'

const connectSocket = (): Socket => {
  const newSocket = io('http://localhost:3000', {
    autoConnect: false
  })
  newSocket.connect()

  return newSocket
}

function App() {
  const [isReadyToDownload, setIsReadyToDownload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  const handleGeneratePdf = () => {
    const newSocket = connectSocket()
    newSocket.on('is-ready', () => {
      setIsReadyToDownload(true)
      setIsLoading(false)
    })
    setSocket(newSocket)
    setIsLoading(true)
    axios.get('http://localhost:3000/generate-pdf').then(() => {
      newSocket.emit('is-ready')
    })
  }

  const handleDownloadPdf = async () => {
    const response = await fetch('http://localhost:3000/download-pdf')
    response?.body?.pipeTo(streamSaver.createWriteStream('example.pdf'))
  }

  return (
    <div className="App">
      <button onClick={handleGeneratePdf}>generate pdf</button>
      {isLoading ? <div className="loader"></div> : <div></div>}
      <p>{isReadyToDownload ? 'pronto para download' : 'não está pronto'}</p>
      <button onClick={handleDownloadPdf}>download pdf</button>
    </div>
  )
}

export default App
