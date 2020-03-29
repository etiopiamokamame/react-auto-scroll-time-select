import { css } from "emotion";
import React, { Component, createRef } from "react";
import SelectContext from "./contexts/Select";
import Control from "./components/molecules/Control";
import SelectOptions from "./components/molecules/SelectOptions";

interface IProps {
  span?: number;
  value?: string | null;
  onChange?: () => void;
}

interface IState {
  span: number;
  inputValue: string | undefined | null;
  menuOpen: boolean;
}

class Select extends Component<IProps, IState> {
  selectControlRef = createRef<HTMLDivElement>();

  constructor(props: IProps) {
    super(props);

    this.state = {
      span: props.span || 30,
      inputValue: props.value,
      menuOpen: false
    };
  }

  render() {
    console.log(this.state);

    return (
      <div
        className={css({
          position: "relative",
          "*": { boxSizing: "border-box" }
        })}
        ref={this.selectControlRef}
      >
        <SelectContext.Provider
          value={{
            inputValue: this.state.inputValue,
            clearInputValue: () => this.setState({ inputValue: null }),
            onInputChange: inputValue => this.setState({ inputValue }),
            onFocus: () => this.setState({ menuOpen: true }),
            onBlur: () => this.setState({ menuOpen: false }),
            span: this.state.span,
            offsetHeight: this.selectControlRef.current?.offsetHeight || 0
          }}
        >
          <Control />
          {this.state.menuOpen && <SelectOptions span={this.state.span} />}
        </SelectContext.Provider>
      </div>
    );
  }
}

export default Select;
