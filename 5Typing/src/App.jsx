//backend -> 5Typing.js
//implements feature of someone is typing
import { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState("");
  const [typing, setTyping] = useState("");
  const [msg, setMsg] = useState([]);
  const [ws, setWs] = useState(null);
  const [inp, setInp] = useState("");
  const [room, setRoom] = useState("");
  const [joinedroom, setJoinedroom] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4001");
    
    socket.onopen = () => console.log("Connected");

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      
      if (data.type === "welcome") {
        setUsername(data.username);
      } 
      else if (data.type === "joinroom") {
        setJoinedroom(data.room);
      } 
      else if (data.type === "message") {
        setMsg((prev) => [...prev, `${data.sender} in ${data.room} sent: ${data.msg}`]);
      } 
      else if (data.type === "typing") {
        setTyping(`${data.sender} is typing...`);
      } 
      else if (data.type === "stoptyping") {
        setTyping("");
      }
    };

    socket.onclose = () => console.log("Disconnected");

    setWs(socket);
    return () => socket.close();
  }, []);

  function send() {
    if (ws && inp && joinedroom) {
      ws.send(JSON.stringify({
        type: "msg",
        msg: inp,
        room: joinedroom
      }));
      setInp("");
    }
  }

  function joinroom() {
    if (ws && room) {
      ws.send(JSON.stringify({
        type: "joinroom",
        room
      }));
    }
  }

  function handleTyping() {
    if (ws && joinedroom) {
      ws.send(JSON.stringify({
        type: "typing",
        sender: username,
        room: joinedroom
      }));

      setTimeout(() => {
        ws.send(JSON.stringify({
          type: "stoptyping",
          sender: username,
          room: joinedroom
        }));
      }, 2000);
    }
  }

  return (
    <>
      <h2>{username}</h2>
      <input type="text" placeholder='Enter room' onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinroom}>Join Room</button>

      {joinedroom && <h2>{username} joined {joinedroom}</h2>}

      <input type="text" placeholder='Enter message' 
        onChange={(e) => {
          setInp(e.target.value);
          handleTyping();
        }} 
      />
      <button onClick={send}>Send</button>

      {typing && <h2>{typing}</h2>}

      {msg.map((message, idx) => (
        <h2 key={idx}>{message}</h2>
      ))}
    </>
  );
}

export default App;
