import {
  IProps as SelectProps,
  OptionType as SelectOptionType,
  InputValueType as SelectInputValueType,
} from "../../src";

export interface OptionType extends SelectOptionType {}
export type InputValueType = SelectInputValueType;

declare const _default: React.ComponentType<SelectProps>;
export default _default;
