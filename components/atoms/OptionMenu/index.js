"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const emotion_1 = require("emotion");
const Select_1 = __importDefault(require("../../../contexts/Select"));
const OptionMenu = ({ option: { label, value }, index }) => {
    return (react_1.default.createElement(Select_1.default.Consumer, null, ({ onInputChange, onChange, focusOptionMenuIndex, options, styles: { optionMenu }, }) => {
        const optionMenuBaseStyle = {
            color: "#3c4043",
            padding: "0 15px",
            height: 40,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "1rem",
            backgroundColor: index == focusOptionMenuIndex ? "#f1f3f4" : "inherit",
            "&:hover": {
                backgroundColor: "#f1f3f4",
            },
        };
        return (react_1.default.createElement("div", { onMouseDown: () => {
                onInputChange(value);
                if (onChange) {
                    const option = options.find(({ value: optVal }) => optVal === value);
                    onChange(option || options[0]);
                }
            }, className: emotion_1.css(optionMenu ? optionMenu(optionMenuBaseStyle) : optionMenuBaseStyle) }, label));
    }));
};
exports.default = OptionMenu;
