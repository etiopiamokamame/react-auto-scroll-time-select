import React from "react";
import { Component, createRef, RefObject } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import SelectContext from "./contexts/Select";
import Control from "./components/molecules/Control";
import SelectOptions from "./components/molecules/SelectOptions";
import SelectOptionsPortal from "./components/molecules/SelectOptionsPortal";

export type OptionType = {
  label: string;
  value: string;
};

export type InputValueType = string | null | undefined;
export type StyleConfigType = { [key: string]: any };
type StyleFn = (config: StyleConfigType) => {};
export type StylesType = {
  select?: StyleFn;
  control?: StyleFn;
  inputForm?: StyleFn;
  clearValue?: StyleFn;
  dropDownArrowWrapper?: StyleFn;
  dropDownArrowItem?: StyleFn;
  selectOptions?: StyleFn;
  optionMenu?: StyleFn;
};

export interface IProps {
  span?: number;
  hourLimit?: number;
  value?: OptionType | null;
  onChange?: (option: OptionType | null) => void;
  findOption?: (option: OptionType, input: InputValueType) => void;
  isClearable?: boolean;
  styles?: StylesType;
  menuPortalTarget?: HTMLElement;
  defaultScrollOptionValue?: string;
  hideOptions?: string[];
  disabledOptions?: string[];
  startTime?: string;
}

interface IState {
  hourLimit: number;
  span: number;
  inputValue: string | undefined | null;
  menuOpen: boolean;
  focusOptionMenuIndex: number;
  findOption: (option: OptionType, input: InputValueType) => void;
  isClearable: boolean;
  styles: StylesType;
}

class Select extends Component<IProps, IState> {
  selectControlRef = createRef<HTMLDivElement>();
  inputFormRef = createRef<HTMLInputElement>();
  scrollbarsRef: RefObject<Scrollbars> = createRef<Scrollbars>();

  constructor(props: IProps) {
    super(props);

    this.state = {
      hourLimit: props.hourLimit || 24,
      span: props.span || 30,
      inputValue: props.value ? props.value.value : "",
      menuOpen: false,
      focusOptionMenuIndex: 0,
      findOption:
        props.findOption ||
        (({ value }: OptionType, input: InputValueType) => {
          let inputValue = input || "";

          if (inputValue.indexOf(":") < 0) {
            if (inputValue.length <= 2) {
              return value.indexOf(inputValue + ":") > -1;
            } else {
              return value.replace(":", "").indexOf(inputValue) > -1;
            }
          } else {
            return value.indexOf(inputValue) > -1;
          }
        }),
      isClearable: props.isClearable === undefined ? true : props.isClearable,
      styles: props.styles || {},
    };
  }

  componentDidUpdate(prevProps: IProps) {
    if (
      prevProps.value !== this.props.value ||
      (prevProps.value &&
        this.props.value &&
        (prevProps.value.label !== this.props.value.label ||
          prevProps.value.value !== this.props.value.value)) ||
      prevProps.hourLimit !== this.props.hourLimit ||
      prevProps.span !== this.props.span
    ) {
      this.setState({
        inputValue: this.props.value ? this.props.value.value : null,
        hourLimit: this.props.hourLimit || this.state.hourLimit,
        span: this.props.span || this.state.span,
      });
    }
  }

  private format(num: number) {
    return ("0" + num).slice(-2);
  }

  render() {
    const startTime = this.props.startTime || "00:00";
    const [startHour, startMin] = startTime.split(":");
    const start = parseInt(startHour) * 60 + parseInt(startMin);

    const hideOptions = this.props.hideOptions || [];
    const candidates: number[] = Array.from({
      length: this.state.hourLimit * 60 + 1,
    })
      .map((_, i) => i)
      .filter((n) => n % this.state.span === 0 && n >= start);
    const options: OptionType[] = candidates
      .map((candidate) => {
        const h = Math.floor(candidate / 60);
        const m = candidate - h * 60;
        const option = `${this.format(h)}:${this.format(m)}`;

        return {
          label: option,
          value: option,
        };
      })
      .filter(({ value }) => hideOptions.indexOf(value) < 0);

    const selectBaseStyle = {
      position: "relative",
      "*": { boxSizing: "border-box" },
    };

    return (
      <div
        style={
          this.state.styles.select
            ? this.state.styles.select(selectBaseStyle)
            : selectBaseStyle
        }
        ref={this.selectControlRef}
      >
        <SelectContext.Provider
          value={{
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
            changeFocusOptionMenuIndex: (i: number) =>
              this.setState({ focusOptionMenuIndex: i }),
            findOption: this.state.findOption,
            isClearable: this.state.isClearable,
            styles: this.state.styles,
            menuPortalTarget: this.props.menuPortalTarget,
            defaultScrollOptionValue: this.props.defaultScrollOptionValue,
            disabledOptions: this.props.disabledOptions || [],
          }}
        >
          <Control />

          {this.props.menuPortalTarget ? (
            <SelectOptionsPortal />
          ) : (
            <SelectOptions
              menuOpen={this.state.menuOpen}
              inputValue={this.state.inputValue}
              scrollbarsRef={this.scrollbarsRef}
              inputFormRef={this.inputFormRef}
              focusOptionMenuIndex={this.state.focusOptionMenuIndex}
              options={options}
              findOption={this.state.findOption}
              defaultScrollOptionValue={this.props.defaultScrollOptionValue}
              changeFocusOptionMenuIndex={(i: number) =>
                this.setState({ focusOptionMenuIndex: i })
              }
            />
          )}
        </SelectContext.Provider>
      </div>
    );
  }
}

export default Select;
