import React from "react";
import { mount } from "enzyme";
import Game from "./Game";
import Board from "./Board";
import Square from "./Square";
import GameInfo from './info/GameInfo'
import SettingsPanel from '../settings/SettingsPanel';

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

    describe("handleClick", () => {
        it("should bail out if the game is over", () => {
            game()

            mountedGame.setState({
                history: [{
                    squares: [
                        "X", "X", "X",
                        "O", null, null,
                        null, "O", null
                    ]
                }],
                stepNumber: 0,
                boardSize: 3,
                xToPlay: true
            })

            expect(mountedGame.instance().handleClick(5)).toBeFalsy()
        })

        it("should bail out if the clicked square is already occupied", () => {
            game()

            mountedGame.setState({
                history: [{
                    squares: [
                        "X", null, null,
                        "O", null, null,
                        null, "X", null
                    ]
                }],
                stepNumber: 0,
                boardSize: 3,
                xToPlay: true
            })

            expect(mountedGame.instance().handleClick(3)).toBeFalsy()
        })

        it("should mark the clicked square in a new history entry based on whose turn it is to play", () => {
            game()

            mountedGame.setState({
                history: [{
                    squares: [
                        "X", null, null,
                        "O", null, null,
                        null, "X", null
                    ]
                }],
                stepNumber: 0,
                boardSize: 3,
                xToPlay: false
            })

            expect(mountedGame.instance().handleClick(5)).toBeTruthy()

            expect(mountedGame.state().history.length).toBe(2)
            expect(mountedGame.state().stepNumber).toBe(1)
            expect(mountedGame.state().history[1].squares[5]).toEqual("O")
        })

        it("should toggle whose turn it is to play", () => {
            game()

            mountedGame.setState({
                history: [{
                    squares: [
                        "X", null, null,
                        "O", null, null,
                        null, "X", null
                    ]
                }],
                stepNumber: 0,
                boardSize: 3,
                xToPlay: false
            })

            expect(mountedGame.instance().handleClick(5)).toBeTruthy()
            expect(mountedGame.state().xToPlay).toBeTruthy()
        })
    })
});