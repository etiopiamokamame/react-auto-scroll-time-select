export interface Store {
  state: Store.State;
  changeInputValue: (inputValue: InputValueType) => void;
  changeFocusOptionMenuIndex: (focusOptionMenuIndex: number) => void;
  openMenu: () => void;
  closeMenu: () => void;
  selectedOption: (option: OptionType | null) => void;
  clearValue: () => void;
}

export namespace Store {
  export interface State extends SelectProps {
    value: OptionType | null;
    options: OptionType[];
    span: number;
    hourLimit: number;
    inputValue: InputValueType;
    focusOptionMenuIndex: number;
    findOption: FindOptionFn;
    isClearable: boolean;
    hideOptions: string[];
    disabledOptions: string[];
    menuOpen: boolean;
    startTime: string;
  }

  export type Action =
    | ChangeInputValueAction
    | ChangeFocusOptionMenuIndexAction
    | OpenMenuAction
    | CloseMenuAction
    | SelectedOptionAction
    | ClearValueAction
    | UpdateValueAction
    | UpdateSpanAction
    | UpdateHourLimitAction
    | UpdateFindOptionAction
    | UpdateIsClearableAction
    | UpdateDefaultScrollOptionValueAction
    | UpdateHideOptionsAction
    | UpdateDisabledOptionsAction
    | UpdateStartTimeAction;

  interface ChangeInputValueAction {
    type: "change-input-value";
    inputValue: InputValueType;
  }

  interface ChangeFocusOptionMenuIndexAction {
    type: "change-focus-option-menu-index";
    focusOptionMenuIndex: number;
  }

  interface OpenMenuAction {
    type: "open-menu";
  }

  interface CloseMenuAction {
    type: "close-menu";
  }

  interface SelectedOptionAction {
    type: "selected-option";
    option: OptionType | null;
  }

  interface ClearValueAction {
    type: "clear-value";
  }

  interface UpdateValueAction {
    type: "update-value";
    value: OptionType | null;
  }

  interface UpdateSpanAction {
    type: "update-span";
    span: number;
  }

  interface UpdateHourLimitAction {
    type: "update-hour-limit";
    hourLimit: number;
  }

  interface UpdateFindOptionAction {
    type: "update-find-option";
    findOption: FindOptionFn;
  }

  interface UpdateIsClearableAction {
    type: "update-is-clearable";
    isClearable: boolean;
  }

  interface UpdateDefaultScrollOptionValueAction {
    type: "update-default-scroll-option-value";
    defaultScrollOptionValue: string | undefined;
  }

  interface UpdateHideOptionsAction {
    type: "update-hide-options";
    hideOptions: string[];
  }

  interface UpdateDisabledOptionsAction {
    type: "update-disabled-options";
    disabledOptions: string[];
  }

  interface UpdateStartTimeAction {
    type: "update-start-time";
    startTime: string;
  }
}

export interface OptionType {
  label: string;
  value: string;
}

export type InputValueType = string | null;

export type StyleConfigType = { [key: string]: any };
export type StyleFn = (config: StyleConfigType) => {};

export type StylesType = {
  select?: StyleFn;
  control?: StyleFn;
  inputForm?: StyleFn;
  clearValue?: StyleFn;
  dropDownArrowWrapper?: StyleFn;
  dropDownArrowItem?: StyleFn;
  selectOptions?: StyleFn;
  optionMenu?: StyleFn;
};

export type FindOptionFn = (
  option: OptionType,
  inputValue: InputValueType
) => void;

export interface SelectProps {
  span?: number;
  hourLimit?: number;
  value?: OptionType | null;
  onChange?: (option: OptionType | null) => void;
  findOption?: FindOptionFn;
  isClearable?: boolean;
  defaultScrollOptionValue?: string;
  styles?: StylesType;
  menuPortalTarget?: HTMLElement;
  hideOptions?: string[];
  disabledOptions?: string[];
  startTime?: string;
}

declare const _default: React.ComponentType<SelectProps>;
export default _default;
