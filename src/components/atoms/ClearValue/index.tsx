import React, { memo } from "react";
import { css, cx } from "@emotion/css";
import { clearValueStyle } from "../../../styles";
import { StyleFn } from "../../../../types";

interface Props {
  isClearable: boolean;
  clearValueStyleFn?: StyleFn;
  clearValue: () => void;
}

const ClearValue = ({ isClearable, clearValueStyleFn, clearValue }: Props) => {
  if (!isClearable) return <></>;

  return (
    <div
      className={cx(
        "react-auto-scroll-time-select__clear-value",
        css(
          clearValueStyleFn
            ? clearValueStyleFn(clearValueStyle)
            : clearValueStyle
        )
      )}
      onClick={clearValue}
    >
      ×
    </div>
  );
};

export default memo(ClearValue);
