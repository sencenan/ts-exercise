const
    http = require('http'),
    staticHandler = require('serve-handler'),
    WebSocketServer = require('websocket').server;

const
    HTTP_PORT = 8181,
    WS_PORT = 9191;

const conns = {};

// WS

const server = http.createServer();
server.listen(WS_PORT, () => {
    console.log(`Listening WS on ${server.address().port}`);
});

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', request => {
    const
        connection = request.accept(null, request.origin),
        connId = Date.now() + '_' + Math.floor(Math.random() * 100);

    connection.on('message', message => {
        switch (message.utf8Data) {
            case 'ready':
                conns[connId] = connection;
                break;
        }
    });

    connection.on('close', () => {
        delete conns[connId];
        console.log('Client has disconnected.');
    });
});

// HTTP

const httpServer = http.createServer((request, response) => {
    if (request.method === 'POST') {
        const data = [];

        request.addListener('data', chunk => {
            data.push(chunk);
        });

        request.addListener('end', () => {
            const msg = Buffer.concat(data).toString();

            Object.values(conns).map(c => {
                c.sendUTF(msg);
            })

            response.statusCode = 200;
            response.write('ok');
            response.end();
        })
    } else {
        return staticHandler(
            request,
            response,
            {
                public: __dirname
            }
        );
    }
})

httpServer.listen(HTTP_PORT, () => {
    console.log(`Listening STATIC on ${httpServer.address().port}`);
});
