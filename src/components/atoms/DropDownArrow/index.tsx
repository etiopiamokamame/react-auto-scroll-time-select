import React from "react";
import { css } from "emotion";
import SelectContext from "../../../contexts/Select";

const DropDownArrow = () => {
  return (
    <SelectContext.Consumer>
      {({
        inputFormRef,
        styles: { dropDownArrowWrapper, dropDownArrowItem },
      }) => {
        const dropDownArrowWrapperBaseStyle = {
          width: 25,
          display: "table-cell",
          verticalAlign: "middle",
          paddingRight: 5,
          cursor: "pointer",
          "&:hover > div": {
            borderColor: "rgba(0,0,0,.5) transparent transparent",
          },
        };

        const dropDownArrowItemBaseStyle = {
          borderColor: "#999 transparent transparent",
          borderStyle: "solid",
          borderWidth: "5px 5px 2.5px",
          margin: "0 auto",
          width: 0,
          display: "inline-block",
        };

        return (
          <div
            onClick={() => {
              if (inputFormRef.current) {
                inputFormRef.current.focus();
              }
            }}
            className={css(
              dropDownArrowWrapper
                ? dropDownArrowWrapper(dropDownArrowWrapperBaseStyle)
                : dropDownArrowWrapperBaseStyle
            )}
          >
            <div
              className={css(
                dropDownArrowItem
                  ? dropDownArrowItem(dropDownArrowItemBaseStyle)
                  : dropDownArrowItemBaseStyle
              )}
            />
          </div>
        );
      }}
    </SelectContext.Consumer>
  );
};

export default DropDownArrow;
