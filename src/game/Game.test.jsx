import React from "react";
import { mount } from "enzyme";
import Game from "./Game";
import Board from "./Board";
import Square from "./Square";
import GameInfo from './info/GameInfo'
import SettingsPanel from '../settings/settings';

describe("Game", () => {
    let props;
    let mountedGame;

    const game = () => {
        if (!mountedGame){
            mountedGame = mount(<Game {...props}/>)
        }

        return mountedGame;
    }

    beforeEach(() => {
        props = {

        }
        mountedGame = undefined;
    })
    
    it("should render the Board with default values", () => {
        const board = game().find(Board)

        const props = board.props();
        expect(props.squares.length).toBe(9);
        expect(props.winningSquares).toEqual([]);
        expect(props.onClick).toBeInstanceOf(Function);
        expect(props.boardSize).toBe(3);
    })

    it("should render the GameInfo component", () => {
        const info = game().find(GameInfo);

        const props = info.props();
        expect(props.winner).toBeNull();
        expect(props.xToPlay).toBeTruthy();
        expect(props.history).toBeInstanceOf(Array);
        expect(props.stepNumber).toBe(0);
        expect(props.jumpTo).toBeInstanceOf(Function);
    })

    it("should render the Settings Panel with default values", () => {
        const panel = game().find(SettingsPanel)

        const props = panel.props();
        expect(props.boardSize).toBe(3);
        expect(props.onBoardSizeChange).toBeInstanceOf(Function);
    })

    // TODO: move these to the GameInfo tests
    describe("game-info", () => {
        it("should display the next player to move", () => {
            const gameInfoPanel = game().find("div.game-info")
            const gameStatus = gameInfoPanel.find("div.game-status")

            expect(gameStatus.text()).toEqual("Next player: X")

            const square = game().find(Square).first();
            square.simulate("click")

            expect(gameStatus.text()).toEqual("Next player: O")
        })

        it("should display the winner if the game is over", () => {
            const gameInfoPanel = game().find("div.game-info")
            const gameStatus = gameInfoPanel.find("div.game-status")

            mountedGame.setState({ history: [{
                squares: ["X", "X", "X", "O", null, "O", null, null, null]
            }]})

            expect(gameStatus.text()).toEqual("Winner: X")
        })
    })
});