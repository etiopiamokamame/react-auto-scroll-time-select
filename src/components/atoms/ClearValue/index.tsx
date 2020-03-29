import React from "react";
import { css } from "emotion";
import SelectContext from "../../../contexts/Select";

const ClearValue = () => {
  return (
    <SelectContext.Consumer>
      {({ clearInputValue, inputFormRef, changeFocusOptionMenuIndex }) => (
        <div
          onClick={() => {
            changeFocusOptionMenuIndex(0);
            clearInputValue();
            if (inputFormRef.current) {
              inputFormRef.current.focus();
              inputFormRef.current.select();
            }
          }}
          className={css({
            width: 17,
            display: "table-cell",
            verticalAlign: "middle",
            cursor: "pointer",
            "&:hover": {
              color: "rgba(0,0,0,.5)",
            },
          })}
        >
          ×
        </div>
      )}
    </SelectContext.Consumer>
  );
};

export default ClearValue;
