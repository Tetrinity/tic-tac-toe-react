import React from 'react';

class GameInfo extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            moveListAsc: true
        }

        // necessary to make "this" work in the callback
        this.toggleMoveListOrder = this.toggleMoveListOrder.bind(this);
    }

    toggleMoveListOrder(){
        this.setState({
            moveListAsc: !this.state.moveListAsc
        });
    }

    jumpTo(stepNumber){
        this.props.jumpTo(stepNumber);
    }

    render(){
        const moves = this.props.history.map((step, move) => {
            const description = move ? "Move #" + move : "Game\u00a0start";
            const isSelected = (move === this.props.stepNumber);

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
        if (this.props.winner){
            status = "Winner: " + this.props.winner;
        } else {
            status = 'Next player: ' + (this.props.xToPlay ? 'X' : 'O');
        }

        return (
            <div className="game-info">
                <div className="game-status">{status}</div>
                 <ol>{moves}</ol> 
                <button onClick={this.toggleMoveListOrder}>Toggle Move Order</button>
            </div>
        );
    }
}

export default GameInfo;