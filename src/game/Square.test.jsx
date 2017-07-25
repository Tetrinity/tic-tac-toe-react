import React from "react";
import { shallow } from "enzyme";
import Square from "./Square";

describe("Square", () => {
    let props;
    let mountedSquare;

    const square = () => {
        if (!mountedSquare){
            mountedSquare = shallow(<Square {...props}/>)
        }

        return mountedSquare;
    }

    beforeEach(() => {
        props = {
            value: "X",
            isWinningSquare: false,
            onClick: undefined
        }
        mountedSquare = undefined;
    })

    it("should render a button with the correct player", () => {
        let button = square().find("button")

        expect(button.hasClass("square")).toBeTruthy()
        expect(button.hasClass("winningSquare")).toBeFalsy()

        expect(button.text()).toEqual("X")
    })

    it("should mark winning squares", () => {
        props.isWinningSquare = true;

        let button = square().find("button")

        expect(button.hasClass("square")).toBeTruthy()
        expect(button.hasClass("winningSquare")).toBeTruthy()
    })

    it("should accept an onClick function", () => {
        const mockOnClick = jest.fn();
        props.onClick = mockOnClick;

        let button = square().find("button")

        button.simulate("click")
        expect(mockOnClick.mock.calls.length).toBe(1)

        button.simulate("click")
        expect(mockOnClick.mock.calls.length).toBe(2)
    })
})