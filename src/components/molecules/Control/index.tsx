import React from "react";
import { css } from "emotion";
import ClearValue from "../../atoms/ClearValue";
import DropDownArrow from "../../atoms/DropDownArrow";
import InputForm from "../../atoms/InputForm";
import Select from "../../../contexts/Select";

const Control = () => {
  return (
    <Select.Consumer>
      {({ styles: { control } }) => {
        const controlBaseStyle = {
          backgroundColor: "#fff",
          borderColor: "#d9d9d9 #ccc #b3b3b3",
          borderRadius: 4,
          border: "1px solid #ccc",
          color: "#333",
          cursor: "default",
          outline: "none",
          overflow: "hidden",
          position: "relative",
          display: "table",
          borderCollapse: "separate",
          borderSpacing: 0,
        };

        return (
          <div
            className={css(
              control ? control(controlBaseStyle) : controlBaseStyle
            )}
          >
            <InputForm />
            <ClearValue />
            <DropDownArrow />
          </div>
        );
      }}
    </Select.Consumer>
  );
};

export default Control;
