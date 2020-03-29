import { css } from "emotion";
import React, { Component, createRef, RefObject } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import SelectContext from "./contexts/Select";
import Control from "./components/molecules/Control";
import SelectOptions from "./components/molecules/SelectOptions";

export type OptionType = {
  label: string;
  value: string;
};

export type InputValueType = string | null | undefined;

export interface IProps {
  span?: number;
  hourLimit?: number;
  value?: OptionType;
  onChange?: (value: string | undefined | null) => void;
  filterOption?: (option: OptionType, input: InputValueType) => void;
}

interface IState {
  hourLimit: number;
  span: number;
  inputValue: string | undefined | null;
  menuOpen: boolean;
  focusOptionMenuIndex: number;
  filterOption: (option: OptionType, input: InputValueType) => void;
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
      filterOption:
        props.filterOption ||
        (({ value }: OptionType, input: InputValueType) => {
          let inputValue = input || "";

          if (inputValue.indexOf(":") < 0) {
            return value.replace(":", "").indexOf(inputValue) > -1;
          } else {
            return value.indexOf(inputValue) > -1;
          }
        }),
    };
  }

  private format(num: number) {
    return ("0" + num).slice(-2);
  }

  render() {
    const candidates: number[] = Array.from({
      length: this.state.hourLimit * 60,
    })
      .map((_, i) => {
        const h = Math.floor(i / 60);
        const m = i - h * 60;

        return m + h * 60;
      })
      .filter((n) => n % this.state.span === 0);

    const options: OptionType[] = candidates.map((candidate) => {
      const h = Math.floor(candidate / 60);
      const m = candidate - h * 60;
      const option = `${this.format(h)}:${this.format(m)}`;

      return {
        label: option,
        value: option,
      };
    });

    return (
      <div
        className={css({
          position: "relative",
          "*": { boxSizing: "border-box" },
        })}
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
            offsetHeight: this.selectControlRef.current
              ? this.selectControlRef.current.offsetHeight
              : 0,
            inputFormRef: this.inputFormRef,
            scrollbarsRef: this.scrollbarsRef,
            options,
            focusOptionMenuIndex: this.state.focusOptionMenuIndex,
            changeFocusOptionMenuIndex: (i: number) =>
              this.setState({ focusOptionMenuIndex: i }),
            filterOption: this.state.filterOption,
          }}
        >
          <Control />
          <SelectOptions
            menuOpen={this.state.menuOpen}
            inputValue={this.state.inputValue}
            scrollbarsRef={this.scrollbarsRef}
            inputFormRef={this.inputFormRef}
            focusOptionMenuIndex={this.state.focusOptionMenuIndex}
            options={options}
            filterOption={this.state.filterOption}
            changeFocusOptionMenuIndex={(i: number) =>
              this.setState({ focusOptionMenuIndex: i })
            }
          />
        </SelectContext.Provider>
      </div>
    );
  }
}

export default Select;
