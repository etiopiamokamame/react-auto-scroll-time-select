import React, { memo } from "react";
import { css, cx } from "@emotion/css";
import {
  dropDownArrowWrapperStyle,
  dropDownArrowItemStyle,
} from "../../../styles";
import { StyleFn } from "../../../../types";

interface Props {
  dropDownArrowWrapperStyleFn?: StyleFn;
  dropDownArrowItemStyleFn?: StyleFn;
  openMenu: () => void;
}

const DropDownArrow = ({
  dropDownArrowWrapperStyleFn,
  dropDownArrowItemStyleFn,
  openMenu,
}: Props) => {
  return (
    <div
      className={cx(
        "react-auto-scroll-time-select__drop-down-arrow-wrapper",
        css(
          dropDownArrowWrapperStyleFn
            ? dropDownArrowWrapperStyleFn(dropDownArrowWrapperStyle)
            : dropDownArrowWrapperStyle
        )
      )}
      onClick={openMenu}
    >
      <div
        className={cx(
          "react-auto-scroll-time-select__drop-down-arrow-item",
          css(
            dropDownArrowItemStyleFn
              ? dropDownArrowItemStyleFn(dropDownArrowItemStyle)
              : dropDownArrowItemStyle
          )
        )}
      />
    </div>
  );
};

export default memo(DropDownArrow);
