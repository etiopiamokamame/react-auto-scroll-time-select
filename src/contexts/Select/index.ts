import { createContext, createRef, RefObject } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { OptionType, InputValueType, StylesType } from "../../";

interface IValueType {
  clearInputValue: () => void;
  onInputChange: (inputValue: InputValueType) => void;
  onFocus: () => void;
  onBlur: () => void;
  onChange?: (option: OptionType | null) => void;
  inputFormRef: RefObject<HTMLInputElement>;
  scrollbarsRef: RefObject<Scrollbars>;
  inputValue: InputValueType;
  menuOpen: boolean;
  offsetHeight: number;
  options: OptionType[];
  focusOptionMenuIndex: number;
  changeFocusOptionMenuIndex: (i: number) => void;
  findOption: (option: OptionType, input: InputValueType) => void;
  isClearable: boolean;
  styles: StylesType;
}

const Select = createContext<IValueType>({
  clearInputValue: () => {},
  onInputChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  inputFormRef: createRef<HTMLInputElement>(),
  scrollbarsRef: createRef<Scrollbars>(),
  inputValue: null,
  menuOpen: false,
  offsetHeight: 0,
  options: [],
  focusOptionMenuIndex: 0,
  changeFocusOptionMenuIndex: () => {},
  findOption: () => false,
  isClearable: true,
  styles: {},
});

export default Select;
