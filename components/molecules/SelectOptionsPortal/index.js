"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const emotion_1 = require("emotion");
const react_dom_1 = require("react-dom");
const Select_1 = __importDefault(require("../../../contexts/Select"));
const SelectOptions_1 = __importDefault(require("../SelectOptions"));
const SelectOptionsPortal = () => {
    return (react_1.default.createElement(Select_1.default.Consumer, null, ({ menuOpen, inputValue, scrollbarsRef, inputFormRef, focusOptionMenuIndex, options, findOption, changeFocusOptionMenuIndex, menuPortalTarget, selectControlRef, }) => {
        if (!menuPortalTarget || !selectControlRef.current) {
            return react_1.default.createElement(react_1.default.Fragment, null);
        }
        let overFrameMenuPosition = false;
        const { left, top, width, bottom: selectControlBottom, } = selectControlRef.current.getBoundingClientRect();
        let positionTop = top;
        if (menuOpen && menuPortalTarget && inputFormRef.current) {
            const scrollbarHeight = 200 + 8;
            const { bottom: menuPortalBottom, } = menuPortalTarget.getBoundingClientRect();
            if (menuPortalBottom < selectControlBottom + scrollbarHeight) {
                positionTop -= scrollbarHeight;
                overFrameMenuPosition = true;
            }
        }
        return react_dom_1.createPortal(react_1.default.createElement("div", { className: emotion_1.css({
                left,
                position: "absolute",
                top: positionTop,
                width,
                zIndex: 9999,
                boxSizing: "border-box",
            }) },
            react_1.default.createElement(SelectOptions_1.default, { menuOpen: menuOpen, inputValue: inputValue, scrollbarsRef: scrollbarsRef, inputFormRef: inputFormRef, focusOptionMenuIndex: focusOptionMenuIndex, options: options, findOption: findOption, changeFocusOptionMenuIndex: changeFocusOptionMenuIndex, overFrameMenuPosition: overFrameMenuPosition })), menuPortalTarget);
    }));
};
exports.default = SelectOptionsPortal;
