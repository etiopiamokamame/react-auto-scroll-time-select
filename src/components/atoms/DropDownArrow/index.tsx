import React from "react";
import { css } from "emotion";
import SelectContext from "../../../contexts/Select";

const DropDownArrow = () => {
  return (
    <SelectContext.Consumer>
      {({ inputFormRef }) => (
        <div
          onClick={() => {
            if (inputFormRef.current) {
              inputFormRef.current.focus();
            }
          }}
          className={css({
            width: 25,
            display: "table-cell",
            verticalAlign: "middle",
            paddingRight: 5,
            cursor: "pointer",
            "&:hover > div": {
              borderColor: "rgba(0,0,0,.5) transparent transparent",
            },
          })}
        >
          <div
            className={css({
              borderColor: "#999 transparent transparent",
              borderStyle: "solid",
              borderWidth: "5px 5px 2.5px",
              margin: "0 auto",
              width: 0,
              display: "inline-block",
            })}
          />
        </div>
      )}
    </SelectContext.Consumer>
  );
};

export default DropDownArrow;
