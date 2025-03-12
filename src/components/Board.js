import React, { useState, useEffect } from "react";
import Square from "./Square";
import "../../src/";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const result = calculateWinner(squares);
    if (result) {
      setWinner(result);
      setTimeout(resetGame, 3000); // Reset after 3 seconds
    }
  }, [squares]);

  const handleClick = (index) => {
    if (squares[index] || winner) return;
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <>
      <div className={`game-container ${winner ? "blur" : ""}`}>
        <h2 className="status">
          {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}
        </h2>
        <div className="board">
          {squares.map((value, index) => (
            <Square key={index} value={value} onClick={() => handleClick(index)} />
          ))}
        </div>
      </div>

      {winner && (
        <div className="winner-popup">
          <h2>{winner} Wins! 🎉</h2>
        </div>
      )}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
