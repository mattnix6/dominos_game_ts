
import { WebSocketServer, WebSocket } from 'ws';

const server = new WebSocketServer({ port: 8080 });

type Rooms = Record<string, WebSocket[]>;
const rooms: Rooms = {};

server.on('connection', (socket: WebSocket) => {
    socket.on('message', (message: string) => {
        const data = JSON.parse(message);
        if (data.type === 'join') {
            if (!rooms[data.room]) {
                rooms[data.room] = [];
            }
            rooms[data.room].push(socket);
            socket.send(JSON.stringify({ type: 'joined', room: data.room }));
        } else if (data.type === 'move') {
            const roomSockets = rooms[data.room] || [];
            roomSockets.forEach((client) => {
                if (client !== socket && client.readyState === client.OPEN) {
                    client.send(JSON.stringify({ type: 'update', move: data.move }));
                }
            });
        }
    });

    socket.on('close', () => {
        for (const room in rooms) {
            rooms[room] = rooms[room].filter((client) => client !== socket);
        }
    });
});

console.log('WebSocket server running on ws://localhost:8080');
