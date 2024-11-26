
interface GameBoardProps {
    sendMove: (move: string) => void;
    moves: string[];
}

const GameBoard: React.FC<GameBoardProps> = ({ sendMove, moves }) => {
    return (
        <div>
            <h3>Game Board</h3>
            <button onClick={() => sendMove('Player made a move!')}>Send Move</button>
            <ul>
                {moves.map((move, idx) => (
                    <li key={idx}>{move}</li>
                ))}
            </ul>
        </div>
    );
};

export default GameBoard;
