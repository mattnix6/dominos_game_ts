"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var server = new ws_1.WebSocketServer({ port: 8080 });
var rooms = {};
server.on('connection', function (socket) {
    socket.on('message', function (message) {
        var data = JSON.parse(message);
        if (data.type === 'join') {
            if (!rooms[data.room]) {
                rooms[data.room] = [];
            }
            rooms[data.room].push(socket);
            socket.send(JSON.stringify({ type: 'joined', room: data.room }));
        }
        else if (data.type === 'move') {
            var roomSockets = rooms[data.room] || [];
            roomSockets.forEach(function (client) {
                if (client !== socket && client.readyState === client.OPEN) {
                    client.send(JSON.stringify({ type: 'update', move: data.move }));
                }
            });
        }
    });
    socket.on('close', function () {
        for (var room in rooms) {
            rooms[room] = rooms[room].filter(function (client) { return client !== socket; });
        }
    });
});
console.log('WebSocket server running on ws://localhost:8080');
