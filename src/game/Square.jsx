import React from 'react';

function Square(props){
    var classes = "square";
    if (props.isWinningSquare){ classes += " winningSquare"; }

    return (
        <button className={classes} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;