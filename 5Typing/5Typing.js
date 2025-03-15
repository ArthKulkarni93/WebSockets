const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let getname = () => "user" + Math.floor(Math.random() * 1000);
let cnt = 0;
let users = new Map(); // ws -> username
let rooms = new Map(); // roomName -> Set(ws)

wss.on('connection', (ws) => {
    console.log(`New client connected, ${++cnt}`);
    let username = getname();
    
    users.set(ws, username);
    ws.send(JSON.stringify({ type: 'welcome', username }));

    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        
        if (msg.type === "joinroom") {
            let room = msg.room;
            if (!rooms.has(room)) {
                rooms.set(room, new Set());
            }
            rooms.get(room).add(ws);

            ws.send(JSON.stringify({ type: "joinroom", room }));
        } 

        else if (msg.type === "msg") {
            let room = msg.room;
            let message = msg.msg.toString('utf-8');

            if (rooms.has(room)) {
                rooms.get(room).forEach((client) => {
                    if (client.readyState === WebSocket.OPEN && client !== ws) {
                        client.send(JSON.stringify({
                            type: "message",
                            sender: users.get(ws),
                            msg: message,
                            room
                        }));
                    }
                });
            }
        } 

        else if (msg.type === "typing") {
            let room = msg.room;
            if (rooms.has(room)) {
                rooms.get(room).forEach((client) => {
                    if (client.readyState === WebSocket.OPEN && ws !== client) {
                        client.send(JSON.stringify({
                            sender: users.get(ws),
                            type: "typing"
                        }));
                    }
                });
            }
        } 
        
        else if (msg.type === "stoptyping") {
            let room = msg.room;
            if (rooms.has(room)) {
                rooms.get(room).forEach((client) => {
                    if (client.readyState === WebSocket.OPEN && ws !== client) {
                        client.send(JSON.stringify({
                            sender: users.get(ws),
                            type: "stoptyping"
                        }));
                    }
                });
            }
        }
    });

    ws.on('close', () => {
        console.log(`Client disconnected, ${--cnt}`);
        users.delete(ws);
        
        rooms.forEach((clients, room) => {
            clients.delete(ws);
            if (clients.size === 0) {
                rooms.delete(room);
            }
        });
    });
});

server.listen(4001, () => console.log(`Server running on 4001`));
