import React from "react";
import { shallow } from "enzyme";
import GameInfo from "./GameInfo";
import GameStatus from "./GameStatus";
import MoveList from "./MoveList";

describe("GameInfo", () => {
    let props;
    let mountedGameInfo;

    const gameInfo = () => {
        if (!mountedGameInfo){
            mountedGameInfo = shallow(<GameInfo {...props}/>)
        }

        return mountedGameInfo;
    }

    beforeEach(() => {
        props = {
            winner: null,
            xToPlay: true,
            history: [],
            stepNumber: 0,
            jumpTo: () => {}
        }
        mountedGameInfo = undefined;
    })
    
    it("should render a GameStatus component", () => {
        const gameStatus = gameInfo().find(GameStatus);
        expect(gameStatus).toBeDefined();

        const statusProps = gameStatus.props();
        expect(props.xToPlay).toBeTruthy();
        expect(props.winner).toBeNull();
    })

    it("should render a MoveList component", () => {
        const mockJumpTo = jest.fn();
        props.jumpTo = mockJumpTo;

        const moveList = gameInfo().find(MoveList);
        expect(moveList).toBeDefined();

        const listProps = moveList.props();
        expect(props.history).toEqual([]);
        expect(props.stepNumber).toBe(0);
        expect(props.jumpTo).toBe(mockJumpTo);
    })
})