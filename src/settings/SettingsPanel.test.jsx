import React from "react";
import { shallow } from "enzyme";
import SettingsPanel from './SettingsPanel';

describe("SettingsPanel", () => {
    let props;
    let mountedSettingsPanel;

    const settingsPanel = () => {
        if (!mountedSettingsPanel){
            mountedSettingsPanel = shallow(<SettingsPanel {...props}/>)
        }

        return mountedSettingsPanel;
    }

    beforeEach(() => {
        props = {
            onBoardSizeChange: () => {}
        }
        mountedSettingsPanel = undefined;
    })

    describe("boardSize", () => {
        it("should allow the user to change the board size", () => {
            const mockBoardSizeChange = jest.fn();
            props.onBoardSizeChange = mockBoardSizeChange;

            const boardSizeInput = settingsPanel().find("input")
            boardSizeInput.simulate("change", {target: {value: 4}})

            expect(mockBoardSizeChange.mock.calls.length).toBe(1)
            expect(mockBoardSizeChange.mock.calls[0]).toEqual([4])
        })

        it("should default to board size 3 if the text box is empty", () => {
            const mockBoardSizeChange = jest.fn();
            props.onBoardSizeChange = mockBoardSizeChange;

            const boardSizeInput = settingsPanel().find("input")
            boardSizeInput.simulate("change", {target: {value: ""}})

            expect(mockBoardSizeChange.mock.calls.length).toBe(1)
            expect(mockBoardSizeChange.mock.calls[0]).toEqual([3])
        })
    })
})