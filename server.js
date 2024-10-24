const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const port = 8080;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Create an HTTP server
const server = http.createServer(app);

// Attach WebSocket server to the HTTP server
const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
  console.log('A new client connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    // Create a hardcoded message object
    const responseMessage = {Payload: 'Auto-Reply', NodeID: 1};

    // Send the message back to the client as a JSON string
    ws.send(message.toString());

    // Send the hardcoded message after a 2-second delay
    setTimeout(() => {
      ws.send(JSON.stringify(responseMessage));
    }, 2000);  // Delay in milliseconds (2000 ms = 2 seconds)
  });

  ws.on('close', function() {
    console.log('Client disconnected');
  });
});

// Start the HTTP & WebSocket server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
