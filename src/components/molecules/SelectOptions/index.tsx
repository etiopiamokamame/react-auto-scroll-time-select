import React, { RefObject, Component } from "react";
import { css } from "emotion";
import { Scrollbars } from "react-custom-scrollbars";
import SelectContext from "../../../contexts/Select";
import OptionMenu from "../../atoms/OptionMenu";
import { OptionType, InputValueType } from "../../../";

interface IProps {
  menuOpen: boolean;
  inputValue: string | undefined | null;
  inputFormRef: RefObject<HTMLInputElement>;
  scrollbarsRef: RefObject<Scrollbars>;
  focusOptionMenuIndex: number;
  options: OptionType[];
  findOption: (option: OptionType, input: InputValueType) => void;
  changeFocusOptionMenuIndex: (i: number) => void;
}

class SelectOptions extends Component<IProps> {
  shouldComponentUpdate(prevProps: IProps) {
    return (
      prevProps.menuOpen !== this.props.menuOpen ||
      prevProps.focusOptionMenuIndex !== this.props.focusOptionMenuIndex
    );
  }

  componentDidUpdate(prevProps: IProps) {
    if (!prevProps.menuOpen && this.props.menuOpen) {
      const index = this.props.options.findIndex((option) =>
        this.props.findOption(option, this.props.inputValue)
      );
      this.props.changeFocusOptionMenuIndex(index >= 0 ? index : 0);
    }

    if (this.props.menuOpen && this.props.scrollbarsRef.current) {
      const optionMenuHeight: number =
        this.props.scrollbarsRef.current.getValues().scrollHeight /
        this.props.options.length;
      this.props.scrollbarsRef.current.scrollTop(
        (this.props.focusOptionMenuIndex - 2) * optionMenuHeight
      );
    }
  }

  render() {
    return (
      <SelectContext.Consumer>
        {({ menuOpen, offsetHeight, options, styles: { selectOptions } }) => {
          if (!menuOpen) {
            return <></>;
          }

          const selectOptionsBaseStyle = {
            margin: "4px 0",
            position: "absolute",
            top: offsetHeight,
            height: 200,
            width: "100%",
            overflowY: "scroll",
            background: "#fff",
            borderRadius: 2,
            zIndex: 1,
            boxShadow:
              "0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)",
          };

          return (
            <div
              className={css(
                selectOptions
                  ? selectOptions(selectOptionsBaseStyle)
                  : selectOptions
              )}
            >
              <Scrollbars ref={this.props.scrollbarsRef}>
                {options.map((option, i) => (
                  <OptionMenu key={i} option={option} index={i} />
                ))}
              </Scrollbars>
            </div>
          );
        }}
      </SelectContext.Consumer>
    );
  }
}

export default SelectOptions;
