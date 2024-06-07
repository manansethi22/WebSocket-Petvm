const express = require("express");
const { WebSocketServer } = require("ws");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let connectedClient = null; // Store the connected client

wss.on("connection", (ws) => {
  console.log("Client connected 2");
  

  connectedClient = ws; // Store the connected client

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    console.log("About to call sendHandleClosePressEvent");
    setTimeout(() => {
      sendHandleClosePressEvent(); // Call the function to send the event
    }, 3000);
  });


  ws.on("close", () => {
    console.log("Client disconnected");
    connectedClient = null; // Reset the connected client
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Function to send the 'handleClosePress' event to the connected client
function sendHandleClosePressEvent() {
    if (connectedClient) {
      console.log("Connected client found, sending 'handleClosePress'");
      connectedClient.send("handleClosePress", (error) => {
        if (error) {
          console.error("Error sending 'handleClosePress':", error);
        } else {
          console.log("'handleClosePress' event sent to the client");
        }
      });
    } else {
      console.log("No connected client to send the event to.");
    }
  }
