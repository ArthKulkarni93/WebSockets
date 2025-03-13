// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { useEffect, useState } from "react";

function App() {
const [msg, setMsg] = useState([]);
const [ws, setWs] = useState(null);
const [inp, setInp] = useState("");
const [username, setUsername] = useState("");

useEffect(() => {
  const socket = new WebSocket("ws://localhost:4001");
  socket.onopen = () => console.log("connected");

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log(data);

    // if(data.type === "welcome") {
    //   setUsername(data.name);
    //   // console.log({username});
    //   // console.log(data.name);
    // } else {
    //   console.log(data.sender);
    //   console.log(data.data)
    //   setMsg(prev => [...prev, `${data.sender}: ${data.data}`]);
    // }
    if (data.type === "welcome") {
      setUsername(data.name);
  } else if (data.type === "message") {
      setMsg(prev => [...prev, `${data.sender}: ${data.data}`]);
  }
    // setMsg(prev => [...prev, e.data]);
  };
  socket.onclose = () => console.log("disconnected");

  setWs(socket);
  return () => socket.close();
}, [])

function send() {
  if(ws && inp) {
    console.log(inp);
    // ws.send(JSON.stringify({type: "text" ,data : inp}));
    ws.send(JSON.stringify({ type: 'message', data: inp })); 
    setInp("");
  }
}
  return (
    <>
      <input type="text"  onChange={(e) => setInp(e.target.value)} />
      <button onClick={send}>send</button>
      
      {
        msg.map((message, idx) => (
          <h2 key={idx}>{message}</h2>
        ))
      }
    </>
  )
}

export default App;
