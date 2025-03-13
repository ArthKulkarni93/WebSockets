import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState("");
  const [msg, setMsg] = useState([]);
  const [inp, setInp] = useState("");
  const [ws, setWs] = useState(null);
  const [joinedroom, setJoinedroom] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4001");

    socket.onopen = () => {
      console.log(`connected`);
    }
    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if(data.type === 'welcome') {
        setUsername(data.name);
      } else if(data.type === 'message') {
        setMsg(prev => [...prev, `${data.sender}(room: ${data.room}):${data.data}`]);
      }
    }

    socket.onclose = () => {
      console.log(`disconnected`);
    }

    setWs(socket);
    return () => socket.close();
    // socket.onclose = () => console.log("disconnected");

        // setws(socket);
        // return () => socket.close();
  }, [])

  let joinroom = () => {
    if(rooms && ws) {
      ws.send(JSON.stringify({
        type : "joinroom",
        room: rooms
      }))
    }
    setJoinedroom(rooms);
  }
  
  let send = () => {
    if(ws && joinedroom && inp) {
      ws.send(JSON.stringify({
        type: "message",
        data: inp
      }))
    }
    setInp("");
  }

  return (
    <>
      <p>{username}</p>
      
      <input type="text"  placeholder='enter room name' 
      onChange={(e) => setRooms(e.target.value)} />
      <button onClick={joinroom}>enter</button>

      {joinedroom && <p>joinedroom: {joinedroom}</p>}

      <input type="text"  placeholder='enter msg'
      onChange={(e) => setInp(e.target.value)} />
      <button onClick={send}>send</button>

      {
        msg.map((message, idx) => (
          <h2 key={idx}>{message}</h2>
        ))
      }
    </>
  )
}

export default App
