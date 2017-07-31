import React from 'react';
import './settings.css';

class SettingsPanel extends React.Component {

    handleBoardSizeChange(event){
        var newSize = parseInt(event.target.value);
        if (!newSize){ newSize = 3; }

        this.props.onBoardSizeChange(newSize);
    }

    render (){
        return (
            <div className="settingsPanel">
                Board size:
                <input
                    className="boardSizeInput"
                    defaultValue={this.props.boardSize}
                    onChange={(event) => this.handleBoardSizeChange(event)}
                />
            </div>
        );
    }
}

export default SettingsPanel;