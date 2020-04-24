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
const emotion_1 = require("emotion");
const react_1 = __importStar(require("react"));
const Select_1 = __importDefault(require("./contexts/Select"));
const Control_1 = __importDefault(require("./components/molecules/Control"));
const SelectOptions_1 = __importDefault(require("./components/molecules/SelectOptions"));
const SelectOptionsPortal_1 = __importDefault(require("./components/molecules/SelectOptionsPortal"));
class Select extends react_1.Component {
    constructor(props) {
        super(props);
        this.selectControlRef = react_1.createRef();
        this.inputFormRef = react_1.createRef();
        this.scrollbarsRef = react_1.createRef();
        this.state = {
            hourLimit: props.hourLimit || 24,
            span: props.span || 30,
            inputValue: props.value ? props.value.value : "",
            menuOpen: false,
            focusOptionMenuIndex: 0,
            findOption: props.findOption ||
                (({ value }, input) => {
                    let inputValue = input || "";
                    if (inputValue.indexOf(":") < 0) {
                        if (inputValue.length <= 2) {
                            return value.indexOf(inputValue + ":") > -1;
                        }
                        else {
                            return value.replace(":", "").indexOf(inputValue) > -1;
                        }
                    }
                    else {
                        return value.indexOf(inputValue) > -1;
                    }
                }),
            isClearable: props.isClearable === undefined ? true : props.isClearable,
            styles: props.styles || {},
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value ||
            (prevProps.value &&
                this.props.value &&
                (prevProps.value.label !== this.props.value.label ||
                    prevProps.value.value !== this.props.value.value)) ||
            prevProps.hourLimit !== this.props.hourLimit ||
            prevProps.span !== this.props.span) {
            this.setState({
                inputValue: this.props.value ? this.props.value.value : null,
                hourLimit: this.props.hourLimit || this.state.hourLimit,
                span: this.props.span || this.state.span,
            });
        }
    }
    format(num) {
        return ("0" + num).slice(-2);
    }
    render() {
        const candidates = Array.from({
            length: this.state.hourLimit * 60,
        })
            .map((_, i) => {
            const h = Math.floor(i / 60);
            const m = i - h * 60;
            return m + h * 60;
        })
            .filter((n) => n % this.state.span === 0);
        const options = candidates.map((candidate) => {
            const h = Math.floor(candidate / 60);
            const m = candidate - h * 60;
            const option = `${this.format(h)}:${this.format(m)}`;
            return {
                label: option,
                value: option,
            };
        });
        const selectBaseStyle = {
            position: "relative",
            "*": { boxSizing: "border-box" },
        };
        return (react_1.default.createElement("div", { className: emotion_1.css(this.state.styles.select
                ? this.state.styles.select(selectBaseStyle)
                : selectBaseStyle), ref: this.selectControlRef },
            react_1.default.createElement(Select_1.default.Provider, { value: {
                    clearInputValue: () => this.setState({ inputValue: null }),
                    onInputChange: (inputValue) => this.setState({ inputValue }),
                    onFocus: () => this.setState({ menuOpen: true }),
                    onBlur: () => this.setState({ menuOpen: false }),
                    onChange: this.props.onChange,
                    inputValue: this.state.inputValue,
                    menuOpen: this.state.menuOpen,
                    selectControlRef: this.selectControlRef,
                    offsetHeight: this.selectControlRef.current
                        ? this.selectControlRef.current.offsetHeight
                        : 0,
                    inputFormRef: this.inputFormRef,
                    scrollbarsRef: this.scrollbarsRef,
                    options,
                    focusOptionMenuIndex: this.state.focusOptionMenuIndex,
                    changeFocusOptionMenuIndex: (i) => this.setState({ focusOptionMenuIndex: i }),
                    findOption: this.state.findOption,
                    isClearable: this.state.isClearable,
                    styles: this.state.styles,
                    menuPortalTarget: this.props.menuPortalTarget,
                } },
                react_1.default.createElement(Control_1.default, null),
                this.props.menuPortalTarget ? (react_1.default.createElement(SelectOptionsPortal_1.default, null)) : (react_1.default.createElement(SelectOptions_1.default, { menuOpen: this.state.menuOpen, inputValue: this.state.inputValue, scrollbarsRef: this.scrollbarsRef, inputFormRef: this.inputFormRef, focusOptionMenuIndex: this.state.focusOptionMenuIndex, options: options, findOption: this.state.findOption, changeFocusOptionMenuIndex: (i) => this.setState({ focusOptionMenuIndex: i }) })))));
    }
}
exports.default = Select;
