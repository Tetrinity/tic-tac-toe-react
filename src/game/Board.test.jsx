import React from "react";
import { shallow } from "enzyme";
import Board from "./Board";
import Square from "./Square";

describe("Board", () => {
    let props;
    let mountedBoard;

    const board = () => {
        if (!mountedBoard){
            mountedBoard = shallow(<Board {...props}/>)
        }

        return mountedBoard;
    }

    beforeEach(() => {
        props = {
            boardSize: 3,
            squares: Array(9).fill(null),
            winningSquares: [],
            onClick: () => {}
        }
        mountedBoard = undefined;
    })

    it("should render the correct number of squares", () => {
        expect(board().find(Square).length).toBe(9)
    })
})