const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('A new client connected');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    
        // Create a hardcoded message object
        const responseMessage = {
            Payload: 'Auto-Reply',
            NodeID: 1
        };
    
        // Send the message back to the client as a JSON string
        ws.send(message.toString());
        setTimeout(() => {
            ws.send(JSON.stringify(responseMessage));
        }, 1000); // Delay in milliseconds (2000 ms = 2 seconds)
        
    });

    ws.on('close', function() {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');