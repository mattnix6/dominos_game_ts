
import { useState, useEffect } from 'react';
import RoomJoin from '../components/RoomJoin';
import GameBoard from '../components/GameBoard';

let socket: WebSocket;

export default function Home() {
    const [connected, setConnected] = useState(false);
    const [room, setRoom] = useState('');
    const [moves, setMoves] = useState<string[]>([]);

    useEffect(() => {
        socket = new WebSocket('wss://dominos-game-backend.vercel.app/');
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'update') {
                setMoves((prev) => [...prev, data.move]);
            }
        };
        return () => socket.close();
    }, []);

    const joinRoom = (roomName: string) => {
        setRoom(roomName);
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'join', room: roomName }));
            setConnected(true);
        }
    };

    const sendMove = (move: string) => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'move', room, move }));
        }
    };

    return (
        <div>
            <h1>Dominoes Game</h1>
            {!connected ? (
                <RoomJoin onJoin={joinRoom} />
            ) : (
                <GameBoard sendMove={sendMove} moves={moves} />
            )}
        </div>
    );
}
