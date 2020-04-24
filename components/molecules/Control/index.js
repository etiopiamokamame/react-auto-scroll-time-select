"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const emotion_1 = require("emotion");
const ClearValue_1 = __importDefault(require("../../atoms/ClearValue"));
const DropDownArrow_1 = __importDefault(require("../../atoms/DropDownArrow"));
const InputForm_1 = __importDefault(require("../../atoms/InputForm"));
const Select_1 = __importDefault(require("../../../contexts/Select"));
const Control = () => {
    return (react_1.default.createElement(Select_1.default.Consumer, null, ({ styles: { control } }) => {
        const controlBaseStyle = {
            backgroundColor: "#fff",
            borderColor: "#d9d9d9 #ccc #b3b3b3",
            borderRadius: 4,
            border: "1px solid #ccc",
            color: "#333",
            cursor: "default",
            outline: "none",
            overflow: "hidden",
            position: "relative",
            display: "table",
            borderCollapse: "separate",
            borderSpacing: 0,
            width: "100%",
        };
        return (react_1.default.createElement("div", { className: emotion_1.css(control ? control(controlBaseStyle) : controlBaseStyle) },
            react_1.default.createElement(InputForm_1.default, null),
            react_1.default.createElement(ClearValue_1.default, null),
            react_1.default.createElement(DropDownArrow_1.default, null)));
    }));
};
exports.default = Control;
