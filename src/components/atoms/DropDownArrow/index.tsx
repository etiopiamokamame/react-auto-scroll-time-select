import React from "react";
import { css } from "emotion";
import InputFormContext from "../../../contexts/InputForm";

const DropDownArrow = () => {
  return (
    <InputFormContext.Consumer>
      {({ inputFormRef }) => (
        <div
          onClick={() => {
            inputFormRef.current?.focus();
            inputFormRef.current?.select();
          }}
          className={css({
            width: 25,
            display: "table-cell",
            verticalAlign: "middle",
            paddingRight: 5,
            cursor: "pointer",
            "&:hover > div": {
              borderColor: "rgba(0,0,0,.5) transparent transparent"
            }
          })}
        >
          <div
            className={css({
              borderColor: "#999 transparent transparent",
              borderStyle: "solid",
              borderWidth: "5px 5px 2.5px",
              margin: "0 auto",
              width: 0,
              display: "inline-block"
            })}
          />
        </div>
      )}
    </InputFormContext.Consumer>
  );
};

export default DropDownArrow;
