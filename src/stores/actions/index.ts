import { generateOptions } from "../../utils";
import {
  Store,
  InputValueType,
  OptionType,
  FindOptionFn,
} from "../../../types";

export default {
  changeInputValue: (state: Store.State, inputValue: InputValueType) => {
    const focusOptionMenuIndex = state.options.findIndex((option) =>
      state.findOption(option, inputValue)
    );

    return {
      ...state,
      focusOptionMenuIndex,
      inputValue,
    };
  },

  changeFocusOptionMenuIndex: (
    state: Store.State,
    focusOptionMenuIndex: number
  ) => {
    const inputOption = state.options[focusOptionMenuIndex];

    if (!inputOption) return state;

    return {
      ...state,
      focusOptionMenuIndex,
      menuOpen: true,
    };
  },

  openMenu: (state: Store.State) => {
    if (state.menuOpen) {
      return state;
    } else {
      const focusOptionMenuIndex =
        state.focusOptionMenuIndex < 0 && state.defaultScrollOptionValue
          ? state.options.findIndex((option) =>
              state.findOption(option, state.defaultScrollOptionValue || null)
            )
          : state.focusOptionMenuIndex;

      return {
        ...state,
        menuOpen: true,
        focusOptionMenuIndex,
      };
    }
  },

  closeMenu: (state: Store.State) => {
    if (state.menuOpen) {
      const focusOptionMenuIndex = state.options.findIndex((o) =>
        state.findOption(o, state.inputValue)
      );
      const option = state.options[focusOptionMenuIndex];

      return {
        ...state,
        menuOpen: false,
        inputValue: option ? option.value : null,
        value: option || null,
        focusOptionMenuIndex,
      };
    } else {
      return state;
    }
  },

  selectedOption: (state: Store.State, option: OptionType | null) => {
    const focusOptionMenuIndex = state.options.findIndex((o) =>
      state.findOption(o, option?.value || null)
    );

    if (option && state.disabledOptions.indexOf(option.value) >= 0) {
      return state;
    } else {
      return {
        ...state,
        menuOpen: false,
        inputValue: option ? option.value : null,
        focusOptionMenuIndex,
        value: option || null,
      };
    }
  },

  clearValue: (state: Store.State) => {
    if (state.focusOptionMenuIndex < 0 && !state.inputValue && state.menuOpen) {
      return state;
    } else {
      return {
        ...state,
        focusOptionMenuIndex: -1,
        inputValue: null,
        menuOpen: true,
      };
    }
  },

  updateValue: (state: Store.State, option: OptionType | null) => {
    const focusOptionMenuIndex = state.options.findIndex((o) =>
      state.findOption(o, option?.value || null)
    );

    return {
      ...state,
      value: option,
      focusOptionMenuIndex,
      inputValue: option?.value || null,
    };
  },

  updateSpan: (state: Store.State, span: number) => {
    const [startHour, startMin] = state.startTime.split(":");
    const start = parseInt(startHour) * 60 + parseInt(startMin);
    const options = generateOptions(
      start,
      state.hourLimit,
      span,
      state.hideOptions
    );

    const focusOptionMenuIndex = options.findIndex((o) =>
      state.findOption(o, state.inputValue)
    );

    return {
      ...state,
      span,
      options,
      focusOptionMenuIndex,
    };
  },

  updateHourLimit: (state: Store.State, hourLimit: number) => {
    const [startHour, startMin] = state.startTime.split(":");
    const start = parseInt(startHour) * 60 + parseInt(startMin);
    const options = generateOptions(
      start,
      hourLimit,
      state.span,
      state.hideOptions
    );

    const focusOptionMenuIndex = options.findIndex((o) =>
      state.findOption(o, state.inputValue)
    );

    return {
      ...state,
      hourLimit,
      options,
      focusOptionMenuIndex,
    };
  },

  updateFindOption: (state: Store.State, findOption: FindOptionFn) => {
    return {
      ...state,
      findOption,
    };
  },

  updateIsClearable: (state: Store.State, isClearable: boolean) => {
    return {
      ...state,
      isClearable,
    };
  },

  updateDefaultScrollOptionValue: (
    state: Store.State,
    defaultScrollOptionValue: string | undefined
  ) => {
    return {
      ...state,
      defaultScrollOptionValue,
    };
  },

  updateHideOptions: (state: Store.State, hideOptions: string[]) => {
    const [startHour, startMin] = state.startTime.split(":");
    const start = parseInt(startHour) * 60 + parseInt(startMin);
    const options = generateOptions(
      start,
      state.hourLimit,
      state.span,
      hideOptions
    );

    const focusOptionMenuIndex = options.findIndex((o) =>
      state.findOption(o, state.inputValue)
    );

    return {
      ...state,
      hideOptions,
      options,
      focusOptionMenuIndex,
    };
  },

  updateDisabledOptions: (state: Store.State, disabledOptions: string[]) => {
    return {
      ...state,
      disabledOptions,
    };
  },

  updateStartTime: (state: Store.State, startTime: string) => {
    const [startHour, startMin] = startTime.split(":");
    const start = parseInt(startHour) * 60 + parseInt(startMin);
    const options = generateOptions(
      start,
      state.hourLimit,
      state.span,
      state.hideOptions
    );

    const focusOptionMenuIndex = options.findIndex((o) =>
      state.findOption(o, state.inputValue)
    );

    return {
      ...state,
      startTime,
      options,
      focusOptionMenuIndex,
    };
  },
};
