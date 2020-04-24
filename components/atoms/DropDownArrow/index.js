"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const emotion_1 = require("emotion");
const Select_1 = __importDefault(require("../../../contexts/Select"));
const DropDownArrow = () => {
    return (react_1.default.createElement(Select_1.default.Consumer, null, ({ inputFormRef, styles: { dropDownArrowWrapper, dropDownArrowItem }, }) => {
        const dropDownArrowWrapperBaseStyle = {
            width: 25,
            display: "table-cell",
            verticalAlign: "middle",
            paddingRight: 5,
            cursor: "pointer",
            "&:hover > div": {
                borderColor: "rgba(0,0,0,.5) transparent transparent",
            },
        };
        const dropDownArrowItemBaseStyle = {
            borderColor: "#999 transparent transparent",
            borderStyle: "solid",
            borderWidth: "5px 5px 2.5px",
            margin: "0 auto",
            width: 0,
            display: "inline-block",
        };
        return (react_1.default.createElement("div", { onClick: () => {
                if (inputFormRef.current) {
                    inputFormRef.current.focus();
                }
            }, className: emotion_1.css(dropDownArrowWrapper
                ? dropDownArrowWrapper(dropDownArrowWrapperBaseStyle)
                : dropDownArrowWrapperBaseStyle) },
            react_1.default.createElement("div", { className: emotion_1.css(dropDownArrowItem
                    ? dropDownArrowItem(dropDownArrowItemBaseStyle)
                    : dropDownArrowItemBaseStyle) })));
    }));
};
exports.default = DropDownArrow;
