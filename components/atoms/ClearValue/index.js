"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const emotion_1 = require("emotion");
const Select_1 = __importDefault(require("../../../contexts/Select"));
const ClearValue = () => {
    return (react_1.default.createElement(Select_1.default.Consumer, null, ({ clearInputValue, inputFormRef, changeFocusOptionMenuIndex, isClearable, styles: { clearValue }, }) => {
        if (!isClearable) {
            return react_1.default.createElement(react_1.default.Fragment, null);
        }
        const clearValueBaseStyle = {
            width: 17,
            display: "table-cell",
            verticalAlign: "middle",
            cursor: "pointer",
            "&:hover": {
                color: "rgba(0,0,0,.5)",
            },
        };
        return (react_1.default.createElement("div", { onClick: () => {
                changeFocusOptionMenuIndex(0);
                clearInputValue();
                if (inputFormRef.current) {
                    inputFormRef.current.focus();
                    inputFormRef.current.select();
                }
            }, className: emotion_1.css(clearValue ? clearValue(clearValueBaseStyle) : clearValueBaseStyle) }, "\u00D7"));
    }));
};
exports.default = ClearValue;
