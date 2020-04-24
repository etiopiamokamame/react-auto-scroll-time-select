"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const emotion_1 = require("emotion");
const Select_1 = __importDefault(require("../../../contexts/Select"));
const InputForm = () => {
    return (react_1.default.createElement("div", { className: emotion_1.css({ display: "table-cell", verticalAlign: "middle" }) },
        react_1.default.createElement(Select_1.default.Consumer, null, ({ inputFormRef, inputValue, menuOpen, onInputChange, onFocus, onBlur, onChange, options, focusOptionMenuIndex, changeFocusOptionMenuIndex, findOption, styles: { inputForm }, }) => {
            const inputFormBaseStyle = {
                height: "calc(1.5em + .75rem + 2px)",
                border: 0,
                paddingLeft: 10,
                width: 56,
                outline: "none",
                lineHeight: 1.5,
                fontSize: "1rem",
            };
            return (react_1.default.createElement("input", { type: "text", value: inputValue || "", onChange: (e) => onInputChange(e.target.value), maxLength: 5, onFocus: onFocus, onBlur: () => {
                    if (onChange) {
                        if (inputValue) {
                            const index = options.findIndex((options) => findOption(options, inputValue));
                            if (index < 0) {
                                onInputChange(null);
                                onChange(null);
                            }
                            else if (focusOptionMenuIndex === index) {
                                onChange(options[index]);
                            }
                        }
                        else {
                            onChange(null);
                        }
                    }
                    onBlur();
                }, onKeyUp: ({ key }) => {
                    switch (key) {
                        case "Escape":
                            if (menuOpen) {
                                onBlur();
                            }
                        case "Enter":
                            if (onChange) {
                                onChange(options[focusOptionMenuIndex]);
                            }
                            onInputChange(options[focusOptionMenuIndex].label);
                            onBlur();
                            break;
                        case "ArrowDown":
                            if (options.length - 1 > focusOptionMenuIndex) {
                                changeFocusOptionMenuIndex(focusOptionMenuIndex + 1);
                                onInputChange(options[focusOptionMenuIndex + 1].label);
                            }
                            break;
                        case "ArrowUp":
                            if (focusOptionMenuIndex !== 0) {
                                changeFocusOptionMenuIndex(focusOptionMenuIndex - 1);
                                onInputChange(options[focusOptionMenuIndex - 1].label);
                            }
                            break;
                        default:
                            const index = options.findIndex((options) => findOption(options, inputValue));
                            changeFocusOptionMenuIndex(index >= 0 ? index : 0);
                            break;
                    }
                    if (key !== "Enter" && !menuOpen) {
                        onFocus();
                    }
                }, ref: inputFormRef, className: emotion_1.css(inputForm ? inputForm(inputFormBaseStyle) : inputFormBaseStyle) }));
        })));
};
exports.default = InputForm;
