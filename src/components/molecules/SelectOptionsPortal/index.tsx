import React, { ReactChild, RefObject } from "react";
import { createPortal } from "react-dom";
import { css, cx } from "@emotion/css";
import {
  defaultOptionMenuHeight,
  defaultOptionMenuCount,
  selectOptionsPortalStyle,
} from "../../../styles";

interface Props {
  children: ReactChild;
  menuPortalTarget: HTMLElement;
  selectControlRef: RefObject<HTMLDivElement>;
  optionLength: number;
}

const SelectOptionsPortal = ({
  children,
  menuPortalTarget,
  selectControlRef,
  optionLength,
}: Props) => {
  if (!selectControlRef.current) return <></>;

  const {
    width,
    top,
    left,
    bottom: selectControlBottom,
  } = selectControlRef.current.getBoundingClientRect();
  const { bottom: menuPortalBottom } = menuPortalTarget.getBoundingClientRect();

  const scrollContentHeight =
    optionLength >= defaultOptionMenuCount
      ? defaultOptionMenuHeight * defaultOptionMenuCount
      : optionLength * defaultOptionMenuHeight;
  let positionTop = top;

  if (menuPortalBottom < selectControlBottom + scrollContentHeight) {
    positionTop -= scrollContentHeight + defaultOptionMenuHeight + 8;
  }

  return createPortal(
    <div
      className={cx(
        "react-auto-scroll-time-select__select-options-portal",
        css({
          ...selectOptionsPortalStyle,
          width,
          top: positionTop,
          left,
        })
      )}
    >
      {children}
    </div>,
    menuPortalTarget
  );
};

export default SelectOptionsPortal;
