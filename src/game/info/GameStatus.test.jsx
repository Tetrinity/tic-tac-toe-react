import React from "react";
import { shallow } from "enzyme";
import GameStatus from "./GameStatus"

describe("GameStatus", () => {
    let props;
    let mountedGameStatus;

    const gameStatus = () => {
        if (!mountedGameStatus){
            mountedGameStatus = shallow(<GameStatus {...props}/>)
        }

        return mountedGameStatus;
    }

    const wipeMount = () => {
        mountedGameStatus = undefined;
    }

    beforeEach(() => {
        props = {}
        wipeMount();
    })

    it("should display the next player to move", () => {
        props.xToPlay = true;
        expect(gameStatus().find("div").text()).toEqual("Next player: X")

        wipeMount();
        props.xToPlay = false;
        expect(gameStatus().find("div").text()).toEqual("Next player: O")
    })

    it("should display the winner if the game is over", () => {
        props.winner = "X"
        expect(gameStatus().find("div").text()).toEqual("Winner: X")

        wipeMount();
        props.winner = "O"
        expect(gameStatus().find("div").text()).toEqual("Winner: O")
    })
})