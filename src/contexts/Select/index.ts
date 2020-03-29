import { createContext } from "react";

interface IValueType {
  inputValue: string | undefined | null;
  clearInputValue: () => void;
  onInputChange: (inputValue: string | undefined | null) => void;
  onFocus: () => void;
  onBlur: () => void;
  span: number;
  offsetHeight: number;
}

const Select = createContext<IValueType>({
  inputValue: null,
  clearInputValue: () => {},
  onInputChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  span: 0,
  offsetHeight: 0
});

export default Select;
