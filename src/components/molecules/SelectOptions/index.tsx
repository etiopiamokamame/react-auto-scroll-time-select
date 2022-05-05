import React, { memo, useCallback, useEffect, useRef } from "react";
import { css, cx } from "@emotion/css";
import OptionMenu from "../../atoms/OptionMenu";
import {
  selectOptionsStyle as defaultSelectOptionsStyle,
  optionMenuStyle,
  defaultOptionMenuHeight,
  defaultOptionMenuCount,
} from "../../../styles";
import { OptionType, StyleFn } from "../../../../types";

interface Props {
  selectOptionsStyleFn?: StyleFn;
  optionMenuStyleFn?: StyleFn;
  options: OptionType[];
  focusOptionMenuIndex: number;
  selectedOption: (option: OptionType) => void;
  disabledOptions: string[];
}

const SelectOptions = ({
  selectOptionsStyleFn,
  optionMenuStyleFn,
  options,
  focusOptionMenuIndex,
  selectedOption,
  disabledOptions,
}: Props) => {
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const adjustScrollPosition = () => {
    if (!scrollContentRef.current) return;

    const optionMenuHeight: number =
      scrollContentRef.current.scrollHeight / options.length;
    const scrollTo =
      (focusOptionMenuIndex - Math.floor(defaultOptionMenuCount / 2)) *
      optionMenuHeight;

    scrollContentRef.current.scrollTo(0, scrollTo);
  };

  useEffect(() => {
    adjustScrollPosition();
  }, [focusOptionMenuIndex, options]);

  const selectOptionsStyle = {
    ...defaultSelectOptionsStyle,
    height:
      options.length >= defaultOptionMenuCount
        ? defaultOptionMenuHeight * defaultOptionMenuCount
        : options.length * defaultOptionMenuHeight,
  };

  const optionMenuClassName = cx(
    "react-auto-scroll-time-select__option-menu",
    css(
      optionMenuStyleFn ? optionMenuStyleFn(optionMenuStyle) : optionMenuStyle
    )
  );

  return (
    <div
      ref={scrollContentRef}
      tabIndex={-1}
      className={cx(
        "react-auto-scroll-time-select__select-options",
        css(
          selectOptionsStyleFn
            ? selectOptionsStyleFn(selectOptionsStyle)
            : selectOptionsStyle
        )
      )}
    >
      {options.map((option, i) => (
        <OptionMenu
          key={i}
          className={optionMenuClassName}
          option={option}
          isFocused={focusOptionMenuIndex === i}
          selectedOption={useCallback(selectedOption, [])}
          isDisabled={disabledOptions.indexOf(option.value) >= 0}
        />
      ))}
    </div>
  );
};

export default memo(SelectOptions);
