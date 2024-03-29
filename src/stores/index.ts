import { useEffect, useReducer, useRef } from "react";
import { reducer } from "./reducers";
import { generateOptions, defaultFindOption } from "../utils";
import { Store, SelectProps, InputValueType, OptionType } from "../../types";

const initialState: Store.State = {
  value: null,
  menuPortalTarget: undefined,
  options: [],
  span: 30,
  hourLimit: 24,
  inputValue: null,
  focusOptionMenuIndex: -1,
  findOption: defaultFindOption,
  isClearable: true,
  hideOptions: [],
  disabledOptions: [],
  menuOpen: false,
  startTime: "00:00",
};

export const initialStore: Store = {
  state: initialState,
  changeInputValue: () => {},
  changeFocusOptionMenuIndex: () => {},
  openMenu: () => {},
  closeMenu: () => {},
  selectedOption: () => {},
  clearValue: () => {},
};

export function useStore(selectProps: SelectProps): Store {
  const initState: Store.State = {
    value: selectProps.value || initialState.value,
    onChange: selectProps.onChange,
    span: selectProps.span || initialState.span,
    menuPortalTarget: selectProps.menuPortalTarget,
    styles: selectProps.styles,
    options: initialState.options,
    hourLimit: selectProps.hourLimit || initialState.hourLimit,
    inputValue: initialState.inputValue,
    focusOptionMenuIndex: initialState.focusOptionMenuIndex,
    findOption: selectProps.findOption || initialState.findOption,
    isClearable:
      selectProps.isClearable === undefined
        ? initialState.isClearable
        : selectProps.isClearable,
    defaultScrollOptionValue: selectProps.defaultScrollOptionValue,
    hideOptions: selectProps.hideOptions || initialState.hideOptions,
    disabledOptions:
      selectProps.disabledOptions || initialState.disabledOptions,
    startTime: selectProps.startTime || initialState.startTime,
    menuOpen: initialState.menuOpen,
  };
  const [startHour, startMin] = initState.startTime.split(":");
  const start = parseInt(startHour) * 60 + parseInt(startMin);

  initState.options = generateOptions(
    start,
    initState.hourLimit,
    initState.span,
    initState.hideOptions
  );

  if (initState.value) {
    initState.inputValue = initState.value.value;

    const index = initState.options.findIndex((o) =>
      initState.findOption(o, initState.inputValue)
    );

    initState.focusOptionMenuIndex = index;
  } else if (initState.defaultScrollOptionValue) {
    const index = initState.options.findIndex((o) =>
      initState.findOption(o, initState.defaultScrollOptionValue || "")
    );

    initState.focusOptionMenuIndex = index;
  }

  const [state, dispatch] = useReducer(reducer, initState);

  const isInitialMount = useRef({
    value: true,
    onChange: true,
    span: true,
    hourLimit: true,
    findOption: true,
    isClearable: true,
    hideOptions: true,
    disabledOptions: true,
    startTime: true,
  });

  useEffect(() => {
    if (selectProps.value != state.value) {
      dispatch({ type: "update-value", value: selectProps.value || null });
    }
  }, [selectProps.value]);

  useEffect(() => {
    if (isInitialMount.current.value) {
      isInitialMount.current.value = false;
    } else if (state.onChange && selectProps.value !== state.value) {
      state.onChange(state.value);
    }
  }, [state.value?.value]);

  useEffect(() => {
    if (isInitialMount.current.onChange) {
      isInitialMount.current.onChange = false;
    } else {
      dispatch({
        type: "update-on-change",
        onChange: selectProps.onChange,
      });
    }
  }, [selectProps.onChange])

  useEffect(() => {
    if (isInitialMount.current.span) {
      isInitialMount.current.span = false;
    } else if (selectProps.span !== state.span) {
      dispatch({
        type: "update-span",
        span: selectProps.span || initialState.span,
      });
    }
  }, [selectProps.span]);

  useEffect(() => {
    if (isInitialMount.current.hourLimit) {
      isInitialMount.current.hourLimit = false;
    } else if (selectProps.hourLimit !== state.hourLimit) {
      dispatch({
        type: "update-hour-limit",
        hourLimit: selectProps.hourLimit || initialState.hourLimit,
      });
    }
  }, [selectProps.hourLimit]);

  useEffect(() => {
    if (isInitialMount.current.findOption) {
      isInitialMount.current.findOption = false;
    } else {
      dispatch({
        type: "update-find-option",
        findOption: selectProps.findOption || initialState.findOption,
      });
    }
  }, [selectProps.findOption]);

  useEffect(() => {
    if (isInitialMount.current.isClearable) {
      isInitialMount.current.isClearable = false;
    } else if (selectProps.isClearable !== state.isClearable) {
      dispatch({
        type: "update-is-clearable",
        isClearable:
          selectProps.isClearable == undefined
            ? initialState.isClearable
            : selectProps.isClearable,
      });
    }
  }, [selectProps.isClearable]);

  useEffect(() => {
    if (
      selectProps.defaultScrollOptionValue !== state.defaultScrollOptionValue
    ) {
      dispatch({
        type: "update-default-scroll-option-value",
        defaultScrollOptionValue: selectProps.defaultScrollOptionValue,
      });
    }
  }, [selectProps.defaultScrollOptionValue]);

  useEffect(() => {
    if (isInitialMount.current.hideOptions) {
      isInitialMount.current.hideOptions = false;
    } else if (selectProps.hideOptions !== state.hideOptions) {
      dispatch({
        type: "update-hide-options",
        hideOptions: selectProps.hideOptions || [],
      });
    }
  }, [selectProps.hideOptions]);

  useEffect(() => {
    if (isInitialMount.current.disabledOptions) {
      isInitialMount.current.disabledOptions = false;
    } else if (selectProps.disabledOptions !== state.disabledOptions) {
      dispatch({
        type: "update-disabled-options",
        disabledOptions: selectProps.disabledOptions || [],
      });
    }
  }, [selectProps.disabledOptions]);

  useEffect(() => {
    if (isInitialMount.current.startTime) {
      isInitialMount.current.startTime = false;
    } else if (selectProps.startTime !== state.startTime) {
      dispatch({
        type: "update-start-time",
        startTime: selectProps.startTime || initialState.startTime,
      });
    }
  }, [selectProps.startTime]);

  const changeInputValue = (inputValue: InputValueType) =>
    dispatch({ type: "change-input-value", inputValue });

  const changeFocusOptionMenuIndex = (focusOptionMenuIndex: number) =>
    dispatch({ type: "change-focus-option-menu-index", focusOptionMenuIndex });

  const openMenu = () => dispatch({ type: "open-menu" });
  const closeMenu = () => dispatch({ type: "close-menu" });

  const selectedOption = (option: OptionType | null) =>
    dispatch({ type: "selected-option", option });

  const clearValue = () => dispatch({ type: "clear-value" });

  return {
    state,
    changeInputValue,
    changeFocusOptionMenuIndex,
    openMenu,
    closeMenu,
    selectedOption,
    clearValue,
  };
}
