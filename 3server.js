//Creates WebSocket Server with Express in node js

// const express = require('express');
// const http = require('http');
// const websocket = require('ws');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const wss = new websocket.Server({server});

// let cnt = 0;
// const clients = new map();

// wss.on("connection", (ws) => {
//     clients.set(ws, ++cnt);
//     console.log(`new client connected, total clients: ${cnt}`);
//     let username = clients.get(ws);
//     console.log(`welcome: ${username}`);

//     ws.on("message", (message) => {
//         wss.clients.forEach((client) => {
//             if(client.readyState === websocket.OPEN) {
//                 client.send(`${clients.get(ws)}: ${message}`);
//             }
//         })
//     })

//     ws.on("close", () => {
//         console.log(`${clients.get(ws)} disconnected`);
//         clients.delete(ws);
//         console.log(`total clients: ${--cnt}`);
//     })
// })

// server.listen(4001, (console.log(`server running on 4001`)));

const express = require('express');
const cors = require('cors');
const websocket = require('ws');
const http = require('http');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new websocket.Server({server});

getname = () => {
    return "use" + Math.random() * 1000;
}

let cnt = 0;
let users = new Map();
wss.on("connection", (ws) => {
    console.log(`new client connected, total clients: ${++cnt}`);
    let name = getname();
    // console.log(name);
    users.set(ws, name);
    console.log("user joined: ", users.get(ws));
    ws.send(JSON.stringify({type : "welcome", name}));
    // ws.send(JSON.stringify({type: "welcome", name}));
    ws.on("message", (message) => {
        wss.clients.forEach((client) => {
            let sender = users.get(ws);
            let data = JSON.parse(message)
            // console.log(sender);
            // let data = message
            // console.log(`msg: ` , message);
            // console.log(data);
            // console.log(data, " DATA");
            if(client.readyState === websocket.OPEN && client !== ws) {
                client.send(JSON.stringify({
                    type: "message", 
                    sender: sender, 
                    data: data.data}));
            }
        })
    })

    ws.on("close", () => {
        console.log(`client disconnected, total clients: ${--cnt}`);
        users.delete(ws);   
    })
})

server.listen(4001, console.log("server running on 4001"));