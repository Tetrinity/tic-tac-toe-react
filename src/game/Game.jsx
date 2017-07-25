import React from 'react';
import Board from './Board'
import SettingsPanel from '../settings/settings.js';

class Game extends React.Component {

    constructor(props){
        super(props);
        var defaultBoardSize = 3;

        this.state = {
            history: [{
                squares: Array(defaultBoardSize * defaultBoardSize).fill(null)
            }],
            stepNumber: 0,
            xToPlay: true,
            moveListAsc: true,
            boardSize: defaultBoardSize
        }

        // necessary to make "this" work in the callback
        this.toggleMoveListOrder = this.toggleMoveListOrder.bind(this);
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const currentPosition = history[history.length - 1];
        const squares = currentPosition.squares.slice();
        const winner = this.calculateWinner(squares, this.state.boardSize);
        if (winner || squares[i]){ return; } // if game is over or this square has already been used

        squares[i] = this.state.xToPlay ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xToPlay: !this.state.xToPlay
        });
    }

    toggleMoveListOrder(){
        this.setState({
            moveListAsc: !this.state.moveListAsc
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xToPlay: (step % 2) === 0
        })
    }

    handleBoardSizeChange(newSize){
        // reset game
        this.setState({
            history: [{
                squares: Array(newSize * newSize).fill(null)
            }],
            stepNumber: 0,
            xToPlay: true,
            boardSize: newSize
        });
    }

    calculateWinner(squares, boardSize){
        const winningSquares = this.getWinningSquares(squares, boardSize);

        if (winningSquares){ return squares[winningSquares[0]]; }
        else { return null; }
    }

    getWinningSquares(squares, boardSize){
        const lines = this.getWinningLines(boardSize);

        for (let i = 0; i < lines.length; i++){
            var line = lines[i];
            var firstSquare = squares[line[0]];

            if (!firstSquare){ continue; }

            var isWinningLine = true;
            for (var j = 0; j < boardSize; j++){
                var thisSquare = squares[line[j]];
                if (thisSquare !== firstSquare){ isWinningLine = false; }
            }

            if (isWinningLine){ return line; }
        }

        return [];
    }

    getWinningLines(boardSize){
        const lines = [];

        // horizontal lines
        const baseHorizLine = [];
        for (let i = 0; i < boardSize; i++){ baseHorizLine.push(i); }

        for (let i = 0; i < boardSize; i++){
            const horizLine = baseHorizLine.map((square) => { return square + (i*boardSize); });
            lines.push(horizLine);
        }

        // vertical lines
        const baseVertLine = [];
        for (let i = 0; i < boardSize; i++){ baseVertLine.push(i * boardSize); }

        for (let i = 0; i < boardSize; i++){
            const vertLine = baseVertLine.map((square) => { return square + i; });
            lines.push(vertLine);
        }

        // diagonals
        const diagLine = [];
        const antiDiagLine = [];
        for (let i = 0; i < boardSize; i++){
            diagLine.push(i*boardSize + i); // NxN: 0, N+1, 2N+2, 3N+3
            antiDiagLine.push((i+1)*boardSize - (i+1)); // NxN: N-1, 2N-2, 3N-3, 4N-4
        }
        lines.push(diagLine);
        lines.push(antiDiagLine);

        return lines;
    }
    
    render(){
        const history = this.state.history;
        const currentPosition = history[this.state.stepNumber];
        const winner = this.calculateWinner(currentPosition.squares, this.state.boardSize);

        const moves = history.map((step, move) => {
            const description = move ? "Move #" + move : "Game\u00a0start";
            const isSelected = (move === this.state.stepNumber);

            return (
                <li key={move} className={isSelected ? 'selectedStep' : null}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{description}</a>
                </li>
            );
        });

        if (!this.state.moveListAsc){
            moves.reverse()
        }

        var status;
        if (winner){
            status = "Winner: " + winner;
        } else {
            status = 'Next player: ' + (this.state.xToPlay ? 'X' : 'O');
        } 

        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={currentPosition.squares}
                            winningSquares={this.getWinningSquares(currentPosition.squares, this.state.boardSize)}
                            onClick={(i) => this.handleClick(i)}
                            boardSize={this.state.boardSize}
                        />
                    </div>
                    {/* TODO: pull game-info out into new component */}
                    <div className="game-info">
                        <div className="game-status">{status}</div>
                        <ol>{moves}</ol>
                        <button onClick={this.toggleMoveListOrder}>Toggle Move Order</button>
                    </div>
                </div>
                
                <div className="game-settings">
                    <SettingsPanel
                        boardSize={this.state.boardSize}
                        onBoardSizeChange={(newSize) => this.handleBoardSizeChange(newSize)}
                    />
                </div>
            </div>
        );
    }
}

export default Game;