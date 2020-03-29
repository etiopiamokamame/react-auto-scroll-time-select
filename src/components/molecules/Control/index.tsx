import React, { createRef } from "react";
import { css } from "emotion";
import ClearValue from "../../atoms/ClearValue";
import DropDownArrow from "../../atoms/DropDownArrow";
import InputForm from "../../atoms/InputForm";
import InputFormContext from "../../../contexts/InputForm";

const Control = () => {
  const InputFormRef = createRef<HTMLInputElement>();

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
      <InputFormContext.Provider value={{ inputFormRef: InputFormRef }}>
        <InputForm />
        <ClearValue />
        <DropDownArrow />
      </InputFormContext.Provider>
    </div>
  );
};

export default Control;
