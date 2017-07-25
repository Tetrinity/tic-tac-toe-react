import React from 'react';
import Square from './Square'

class Board extends React.Component {

    renderSquare(i){
        return <Square
            key={i}
            value={this.props.squares[i]}
            isWinningSquare={this.props.winningSquares.indexOf(i) !== -1}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render(){
        var size = this.props.boardSize;
        const rows = [];

        for (var i = 0; i < size; i++){
            var row = [];
            for (var j = 0; j < size; j++){
                row.push(this.renderSquare(i*size + j));
            }
            rows.push(row);
        }

        const rowMap = rows.map((row, index) =>
            <div key={index} className="board-row">
                {row}
            </div>
        );
        
        return (
            <div>
                {rowMap}
            </div>
        );
    }
}

export default Board;