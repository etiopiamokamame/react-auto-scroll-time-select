"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Select = react_1.createContext({
    clearInputValue: () => { },
    onInputChange: () => { },
    onFocus: () => { },
    onBlur: () => { },
    onChange: () => { },
    selectControlRef: react_1.createRef(),
    inputFormRef: react_1.createRef(),
    scrollbarsRef: react_1.createRef(),
    inputValue: null,
    menuOpen: false,
    offsetHeight: 0,
    options: [],
    focusOptionMenuIndex: 0,
    changeFocusOptionMenuIndex: () => { },
    findOption: () => false,
    isClearable: true,
    styles: {},
    menuPortalTarget: undefined,
});
exports.default = Select;
