// const websocket = require('ws');

// const wss = new websocket.Server({port: 8080});
// console.log(`ws server running on 8080`);

// wss.on("connection", (ws) => {
//     console.log(`new client connected`);

//     ws.send(`hello you are connected to ws server`);
    
//     ws.on('message', (message) => {
//         console.log(`received: ${message}`);

//         wss.clients.forEach((client) => {
//             if(client.readyState === websocket.OPEN) {
//                 client.send(`echo ${message}`);
//             }
//         })
//     })

//     wss.on('close', () => {
//         console.log('client disconnected');
//     })
// })
