import React from "react";
import { css } from "emotion";
import SelectContext from "../../../contexts/Select";
import InputFormContext from "../../../contexts/InputForm";

const ClearValue = () => {
  return (
    <SelectContext.Consumer>
      {({ clearInputValue }) => (
        <InputFormContext.Consumer>
          {({ inputFormRef }) => (
            <div
              onClick={() => {
                clearInputValue();
                inputFormRef.current?.focus();
                inputFormRef.current?.select();
              }}
              className={css({
                width: 17,
                display: "table-cell",
                verticalAlign: "middle",
                cursor: "pointer",
                "&:hover": {
                  color: "rgba(0,0,0,.5)"
                }
              })}
            >
              ×
            </div>
          )}
        </InputFormContext.Consumer>
      )}
    </SelectContext.Consumer>
  );
};

export default ClearValue;
