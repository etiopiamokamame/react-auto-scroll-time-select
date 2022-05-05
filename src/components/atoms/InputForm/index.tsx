import React, {
  memo,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";
import { css, cx } from "@emotion/css";
import { inputFormStyle } from "../../../styles";
import { InputValueType, StyleFn } from "../../../../types";

interface Props {
  inputFormStyleFn?: StyleFn;
  menuOpen: boolean;
  inputValue: InputValueType;
  changeInputValue: (inputValue: InputValueType) => void;
  selectedOption: () => void;
  incrementFocusOptionMenuIndex: () => void;
  decrementFocusOptionMenuIndex: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

const InputForm = ({
  inputFormStyleFn,
  menuOpen,
  inputValue,
  changeInputValue,
  selectedOption,
  incrementFocusOptionMenuIndex,
  decrementFocusOptionMenuIndex,
  openMenu,
  closeMenu,
}: Props) => {
  const inputFormRef = useRef<HTMLInputElement>(null);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeInputValue(e.target.value);
  };

  const onKeyUp = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    switch (key) {
      case "Escape":
        return closeMenu();
      case "Enter":
        return selectedOption();
      case "ArrowDown":
        return incrementFocusOptionMenuIndex();
      case "ArrowUp":
        return decrementFocusOptionMenuIndex();
      default:
        if (!menuOpen) {
          openMenu();
        }
    }
  };

  useEffect(() => {
    if (inputFormRef.current && menuOpen) {
      inputFormRef.current.focus();
    }
  }, [menuOpen]);

  return (
    <input
      ref={inputFormRef}
      className={cx(
        "react-auto-scroll-time-select__input-form",
        css(
          inputFormStyleFn ? inputFormStyleFn(inputFormStyle) : inputFormStyle
        )
      )}
      type="text"
      value={inputValue || ""}
      maxLength={5}
      onClick={openMenu}
      onFocus={openMenu}
      onBlur={closeMenu}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );
};

export default memo(InputForm);
