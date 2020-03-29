import React from "react";
import { css } from "emotion";
import ClearValue from "../../atoms/ClearValue";
import DropDownArrow from "../../atoms/DropDownArrow";
import InputForm from "../../atoms/InputForm";

const Control = () => {
  return (
    <div
      className={css({
        backgroundColor: "#fff",
        borderColor: "#d9d9d9 #ccc #b3b3b3",
        borderRadius: 4,
        border: "1px solid #ccc",
        color: "#333",
        cursor: "default",
        outline: "none",
        overflow: "hidden",
        position: "relative",
        display: "table"
      })}
    >
      <InputForm />
      <ClearValue />
      <DropDownArrow />
    </div>
  );
};

export default Control;
