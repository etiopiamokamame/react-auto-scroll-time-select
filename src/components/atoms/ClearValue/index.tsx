import React from "react";
import { Fragment } from "react";
import SelectContext from "../../../contexts/Select";

const ClearValue = () => {
  return (
    <SelectContext.Consumer>
      {({
        clearInputValue,
        inputFormRef,
        changeFocusOptionMenuIndex,
        isClearable,
        styles: { clearValue },
      }) => {
        if (!isClearable) {
          return <Fragment></Fragment>;
        }

        const clearValueBaseStyle = {
          width: 17,
          display: "table-cell",
          verticalAlign: "middle",
          cursor: "pointer",
          "&:hover": {
            color: "rgba(0,0,0,.5)",
          },
        };

        return (
          <div
            onClick={() => {
              changeFocusOptionMenuIndex(0);
              clearInputValue();
              if (inputFormRef.current) {
                inputFormRef.current.focus();
                inputFormRef.current.select();
              }
            }}
            style={
              clearValue ? clearValue(clearValueBaseStyle) : clearValueBaseStyle
            }
          >
            ×
          </div>
        );
      }}
    </SelectContext.Consumer>
  );
};

export default ClearValue;
