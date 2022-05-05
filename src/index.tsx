import React, { HTMLAttributes, useCallback, useRef } from "react";
import { css, cx } from "@emotion/css";
import SelectOptionsFrame from "./components/templates/SelectOptionsFrame";
import SelectOptions from "./components/molecules/SelectOptions";
import InputForm from "./components/atoms/InputForm";
import ClearValue from "./components/atoms/ClearValue";
import DropDownArrow from "./components/atoms/DropDownArrow";
import { useStore } from "./stores";
import { selectStyle, controlStyle } from "./styles";
import { SelectProps } from "../types";

type Props = SelectProps & HTMLAttributes<HTMLDivElement>;

const App = ({
  value,
  onChange,
  span,
  hourLimit,
  findOption,
  isClearable,
  defaultScrollOptionValue,
  hideOptions,
  disabledOptions,
  startTime,
  menuPortalTarget,
  styles,
  ...props
}: Props) => {
  const selectProps: SelectProps = {
    value,
    onChange,
    span,
    hourLimit,
    findOption,
    isClearable,
    defaultScrollOptionValue,
    hideOptions,
    disabledOptions,
    startTime,
    menuPortalTarget,
    styles,
  };

  const {
    state,
    changeInputValue,
    changeFocusOptionMenuIndex,
    openMenu,
    closeMenu,
    selectedOption,
    clearValue,
  } = useStore(selectProps);

  const selectControlRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...props}
      className={cx(
        "react-auto-scroll-time-select__select",
        css(
          state.styles?.select ? state.styles.select(selectStyle) : selectStyle
        )
      )}
      ref={selectControlRef}
    >
      <div
        className={cx(
          "react-auto-scroll-time-select__control",
          css(
            state.styles?.control
              ? state.styles.control(controlStyle)
              : controlStyle
          )
        )}
      >
        <InputForm
          inputFormStyleFn={state.styles?.inputForm}
          menuOpen={state.menuOpen}
          inputValue={state.inputValue}
          changeInputValue={changeInputValue}
          selectedOption={() =>
            selectedOption(state.options[state.focusOptionMenuIndex])
          }
          incrementFocusOptionMenuIndex={() =>
            changeFocusOptionMenuIndex(state.focusOptionMenuIndex + 1)
          }
          decrementFocusOptionMenuIndex={() =>
            changeFocusOptionMenuIndex(state.focusOptionMenuIndex - 1)
          }
          openMenu={useCallback(openMenu, [])}
          closeMenu={useCallback(closeMenu, [
            state.inputValue,
            state.focusOptionMenuIndex,
          ])}
        />
        <ClearValue
          isClearable={state.isClearable}
          clearValueStyleFn={state.styles?.clearValue}
          clearValue={useCallback(clearValue, [])}
        />
        <DropDownArrow
          dropDownArrowWrapperStyleFn={state.styles?.dropDownArrowWrapper}
          dropDownArrowItemStyleFn={state.styles?.dropDownArrowItem}
          openMenu={useCallback(openMenu, [])}
        />
      </div>

      {state.menuOpen && (
        <SelectOptionsFrame
          menuPortalTarget={state.menuPortalTarget}
          selectControlRef={selectControlRef}
          optionLength={state.options.length}
        >
          <SelectOptions
            selectOptionsStyleFn={state.styles?.selectOptions}
            optionMenuStyleFn={state.styles?.optionMenu}
            options={state.options}
            focusOptionMenuIndex={state.focusOptionMenuIndex}
            selectedOption={selectedOption}
            disabledOptions={state.disabledOptions}
          />
        </SelectOptionsFrame>
      )}
    </div>
  );
};

export default App;
