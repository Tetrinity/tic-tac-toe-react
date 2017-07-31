import React from "react";
import { shallow } from "enzyme";
import MoveList from "./MoveList";

describe("MoveList", () => {
    let props;
    let mountedMoveList;

    const moveList = () => {
        if (!mountedMoveList){
            mountedMoveList = shallow(<MoveList {...props}/>)
        }

        return mountedMoveList;
    }

    beforeEach(() => {
        props = {
            history: ["pos 1", "pos 2", "pos 3"],
            stepNumber: 0
        }

        mountedMoveList = undefined;
    })

    it("should list the moves in chronological order", () => {
        const moves = moveList().find("ol.move-list").children();

        const movesText = moves.map(move => move.text())

        expect(movesText[0]).toEqual("Game start")
        expect(movesText[1]).toEqual("Move #1")
        expect(movesText[2]).toEqual("Move #2")
    })

    it("should reverse the move list when clicking the Toggle Move Order button", () => {
        moveList().find("button").simulate("click")

        const moves = moveList().find("ol.move-list").children();

        const movesText = moves.map(move => move.text())

        expect(movesText[0]).toEqual("Move #2")
        expect(movesText[1]).toEqual("Move #1")
        expect(movesText[2]).toEqual("Game start")
    })

    it("should mark the currently selected move", () => {
        props.stepNumber = 1;

        const moves = moveList().find("ol.move-list").children();

        const movesSelected = moves.map(move => move.hasClass("selectedStep"))

        expect(movesSelected[0]).toBeFalsy();
        expect(movesSelected[1]).toBeTruthy();
        expect(movesSelected[2]).toBeFalsy();
    })

    it("should call the passed jumpTo function when a move is clicked", () => {
        const mockJumpTo = jest.fn();
        props.jumpTo = mockJumpTo;
        
        const moves = moveList().find("ol.move-list").children();

        moves.at(2).find("a").simulate("click")
        moves.at(0).find("a").simulate("click")

        expect(mockJumpTo.mock.calls.length).toBe(2)
        expect(mockJumpTo.mock.calls[0]).toEqual([2])
        expect(mockJumpTo.mock.calls[1]).toEqual([0])
    })
})