import {
  IProps as SelectProps,
  OptionType as SelectOptionType,
  InputValueType as SelectInputValueType,
  StyleConfigType as SelectStyleConfigType,
} from "../../src";

export interface OptionType extends SelectOptionType {}
export type InputValueType = SelectInputValueType;
export type StyleConfigType = SelectStyleConfigType;

declare const _default: React.ComponentType<SelectProps>;
export default _default;
