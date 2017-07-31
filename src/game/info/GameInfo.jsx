import React from 'react';
import GameStatus from "./GameStatus";
import MoveList from "./MoveList";

class GameInfo extends React.PureComponent {

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="game-info">
                <GameStatus
                    winner={this.props.winner}
                    xToPlay={this.props.xToPlay}
                />
                <MoveList
                    history={this.props.history}
                    stepNumber={this.props.stepNumber}
                    jumpTo={(stepNumber) => this.props.jumpTo(stepNumber)}
                />
            </div>
        );
    }
}

export default GameInfo;