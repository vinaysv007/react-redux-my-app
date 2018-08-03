import websocket from 'ws';

var wss = new websocket.Server({
    port: process.env.CHAT_PORT,
    perMessageDeflate: false
}); //websocket server

var users = [];

var broadCast = (data, ws) => {
    wss.clients.forEach((client) => {
        if (client.readyState === websocket.OPEN && client !== ws) {
            client.send(JSON.stringify(data));
        }
    });
}

wss.on('connection', (ws) => {
    let index;
    ws.on('open', () => {
        console.log('socket is connected');
    });
    console.log('socket is connected');

    ws.on('message', (message) => {
        var data = JSON.parse(message);
        switch (data.type) {
            case 'ADD_USER':
                index = users.length;
                users.push({ name: data.name, id: index });
                ws.send(JSON.stringify({
                    type: 'UPDATE_USERS_LIST',
                    users
                }));
                broadCast({
                    type: 'UPDATE_USERS_LIST',
                    users
                }, ws);
                break;

            case 'ADD_MESSAGE':
                broadCast({
                    type: 'ADD_MESSAGE',
                    message: data.message,
                    user: data.user
                }, ws);
                break;
            case 'DISCONNECT_SOCKET_CONNECTION':
                ws.close();
                break;
        }
    })

    ws.on('close', () => {
        var pos = users.map((e) => { return e.id; }).indexOf(index);
        if (pos > -1) {
            users.splice(pos, 1);
        }
        broadCast({
            type: 'UPDATE_USERS_LIST',
            users
        }, ws);
        console.log('socket is disconnected');
    })
});