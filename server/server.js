const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const chatSokets = require('./chatSokets');

const express = require('express');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

chatSokets.run(io);

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
