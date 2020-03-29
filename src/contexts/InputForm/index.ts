import { createContext, createRef, RefObject } from "react";

interface IValueType {
  inputFormRef: RefObject<HTMLInputElement>;
}

const InputForm = createContext<IValueType>({
  inputFormRef: createRef<HTMLInputElement>()
});

export default InputForm;
