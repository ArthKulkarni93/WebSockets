//Creates websocket server with express in node js. Rooms feature implemented

const express = require('express');
const cors = require('cors');
const http = require('http');
const websocket = require('ws');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new websocket.Server({server});

let cnt = 0;
let users = new Map();
let rooms = new Map();

getname = () => {
    return "arth" + Math.random() * 1000;
}
getroom = () => {
    return "room" + Math.floor(Math.random() * 1000);
}

wss.on('connection', (ws) => {
    console.log(`new client connected, total clients: ${++cnt}`);
    let name = getname();
    users.set(ws, name);
    ws.send(JSON.stringify({type: "welcome", name}));


    ws.on('message', (message) => {
        let data = JSON.parse(message);

        if(data.type === 'joinroom') {
            rooms.set(ws, data.room);
            console.log(`${users.get(ws)} joined ${data.room}`);
        }
        
        else if(data.type === 'message') {
            let sender = users.get(ws);
            let room = rooms.get(ws);

            wss.clients.forEach((client) => {
                if(client.readyState === websocket.OPEN && ws !== client && room === rooms.get(client)) {
                    client.send(JSON.stringify({
                        type: "message",
                        sender: sender,
                        data: data.data,
                        room: room
                    }))
                }
            })
        }
    })

    ws.on('close', () => {
        console.log(`client disconnected, total clients: ${--cnt}`);
        rooms.delete(ws);
        users.delete(ws);
    })
})

server.listen(4001, () => console.log(`running on 4001`));