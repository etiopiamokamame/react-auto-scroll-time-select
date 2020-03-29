import React from "react";
import { css } from "emotion";
import Select from "../../../contexts/Select";
import InputFormContext from "../../../contexts/InputForm";

const InputForm = () => {
  return (
    <div className={css({ display: "table-cell", verticalAlign: "middle" })}>
      <Select.Consumer>
        {({ inputValue, onInputChange, onFocus, onBlur }) => (
          <InputFormContext.Consumer>
            {({ inputFormRef }) => (
              <input
                type="text"
                value={inputValue || ""}
                onChange={e => onInputChange(e.target.value)}
                maxLength={5}
                onFocus={onFocus}
                onBlur={onBlur}
                ref={inputFormRef}
                className={css({
                  height: "calc(1.5em + .75rem + 2px)",
                  border: 0,
                  paddingLeft: 10,
                  width: 56,
                  outline: "none",
                  lineHeight: 1.5,
                  fontSize: "1rem"
                })}
              />
            )}
          </InputFormContext.Consumer>
        )}
      </Select.Consumer>
    </div>
  );
};

export default InputForm;
