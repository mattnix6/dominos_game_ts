
import { useState } from 'react';

interface RoomJoinProps {
    onJoin: (room: string) => void;
}

const RoomJoin: React.FC<RoomJoinProps> = ({ onJoin }) => {
    const [room, setRoom] = useState('');

    return (
        <div>
            <input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter room name"
            />
            <button onClick={() => onJoin(room)}>Join Room</button>
        </div>
    );
};

export default RoomJoin;
