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

        mountedBoard = undefined;
        props.boardSize = 4;
        expect(board().find(Square).length).toBe(16)

        mountedBoard = undefined;
        props.boardSize = 7;
        expect(board().find(Square).length).toBe(49)
    })

    it("should render the correct number of rows", () => {
        expect(board().find(".board-row").length).toBe(3)

        mountedBoard = undefined;
        props.boardSize = 4;
        expect(board().find(".board-row").length).toBe(4)

        mountedBoard = undefined;
        props.boardSize = 7;
        expect(board().find(".board-row").length).toBe(7)
    })

    it("should pass the correct props to each Square", () => {
        const mockOnClick = jest.fn()
        props.onClick = mockOnClick;

        const squares = board().find(Square)

        squares.at(0).simulate("click")
        squares.at(4).simulate("click")
        squares.at(7).simulate("click")
        
        expect(mockOnClick.mock.calls[0]).toEqual([0])
        expect(mockOnClick.mock.calls[1]).toEqual([4])
        expect(mockOnClick.mock.calls[2]).toEqual([7])
    })
})