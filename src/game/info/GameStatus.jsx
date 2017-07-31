import React from 'react';

class GameStatus extends React.PureComponent {
    constructor(props){
        super(props);
    }
    
    render(){
        var status;
        if (this.props.winner){
            status = "Winner: " + this.props.winner;
        } else {
            status = 'Next player: ' + (this.props.xToPlay ? 'X' : 'O');
        }

        return (
            <div>
                {status}
            </div>
        );
    }}

export default GameStatus