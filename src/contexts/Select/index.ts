import { createContext, createRef, RefObject } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { OptionType, InputValueType } from "../../";

interface IValueType {
  clearInputValue: () => void;
  onInputChange: (inputValue: string | undefined | null) => void;
  onFocus: () => void;
  onBlur: () => void;
  onChange?: (value: string | undefined | null) => void;
  inputFormRef: RefObject<HTMLInputElement>;
  scrollbarsRef: RefObject<Scrollbars>;
  inputValue: string | undefined | null;
  menuOpen: boolean;
  offsetHeight: number;
  options: OptionType[];
  focusOptionMenuIndex: number;
  changeFocusOptionMenuIndex: (i: number) => void;
  filterOption: (option: OptionType, input: InputValueType) => void;
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
  filterOption: () => false,
});

export default Select;
