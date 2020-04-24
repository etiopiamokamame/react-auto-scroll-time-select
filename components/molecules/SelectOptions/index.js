"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const emotion_1 = require("emotion");
const react_custom_scrollbars_1 = require("react-custom-scrollbars");
const Select_1 = __importDefault(require("../../../contexts/Select"));
const OptionMenu_1 = __importDefault(require("../../atoms/OptionMenu"));
class SelectOptions extends react_1.Component {
    shouldComponentUpdate(prevProps) {
        return (prevProps.menuOpen !== this.props.menuOpen ||
            prevProps.focusOptionMenuIndex !== this.props.focusOptionMenuIndex);
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.menuOpen && this.props.menuOpen) {
            const index = this.props.options.findIndex((option) => this.props.findOption(option, this.props.inputValue));
            this.props.changeFocusOptionMenuIndex(index >= 0 ? index : 0);
        }
        if (this.props.menuOpen && this.props.scrollbarsRef.current) {
            const optionMenuHeight = this.props.scrollbarsRef.current.getValues().scrollHeight /
                this.props.options.length;
            this.props.scrollbarsRef.current.scrollTop((this.props.focusOptionMenuIndex - 2) * optionMenuHeight);
        }
    }
    render() {
        return (react_1.default.createElement(Select_1.default.Consumer, null, ({ menuOpen, offsetHeight, options, styles: { selectOptions } }) => {
            if (!menuOpen) {
                return react_1.default.createElement(react_1.default.Fragment, null);
            }
            let selectOptionsBaseStyle = {
                position: "absolute",
                width: "100%",
                overflowY: "scroll",
                background: "#fff",
                borderRadius: 2,
                zIndex: 1,
                boxShadow: "0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)",
            };
            if (!this.props.overFrameMenuPosition) {
                selectOptionsBaseStyle = Object.assign(Object.assign({}, selectOptionsBaseStyle), {
                    top: offsetHeight,
                });
            }
            return (react_1.default.createElement("div", { className: emotion_1.css(Object.assign(Object.assign({}, (selectOptions
                    ? selectOptions(selectOptionsBaseStyle)
                    : selectOptionsBaseStyle)), { height: 200, margin: "4px 0" })) },
                react_1.default.createElement(react_custom_scrollbars_1.Scrollbars, { ref: this.props.scrollbarsRef }, options.map((option, i) => (react_1.default.createElement(OptionMenu_1.default, { key: i, option: option, index: i }))))));
        }));
    }
}
exports.default = SelectOptions;
