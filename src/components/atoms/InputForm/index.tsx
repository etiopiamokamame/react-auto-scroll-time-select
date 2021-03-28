import React from "react";
import { KeyboardEvent } from "react";
import Select from "../../../contexts/Select";

const InputForm = () => {
  return (
    <div style={{ display: "table-cell", verticalAlign: "middle" }}>
      <Select.Consumer>
        {({
          inputFormRef,
          inputValue,
          menuOpen,
          onInputChange,
          onFocus,
          onBlur,
          onChange,
          options,
          focusOptionMenuIndex,
          changeFocusOptionMenuIndex,
          findOption,
          styles: { inputForm },
          defaultScrollOptionValue,
        }) => {
          const inputFormBaseStyle = {
            height: "calc(1.5em + .75rem + 2px)",
            border: 0,
            paddingLeft: 10,
            width: 56,
            outline: "none",
            lineHeight: 1.5,
            fontSize: "1rem",
          };

          return (
            <input
              type="text"
              value={inputValue || ""}
              onChange={(e) => onInputChange(e.target.value)}
              maxLength={5}
              onFocus={onFocus}
              onBlur={() => {
                if (onChange) {
                  if (inputValue) {
                    const index = options.findIndex((options) =>
                      findOption(options, inputValue)
                    );
                    if (index < 0) {
                      onInputChange(null);
                      onChange(null);
                    } else if (focusOptionMenuIndex === index) {
                      onChange(options[index]);
                    }
                  } else {
                    onChange(null);
                  }
                }

                onBlur();
              }}
              onKeyUp={({ key }: KeyboardEvent<HTMLInputElement>) => {
                switch (key) {
                  case "Escape":
                  case "Enter":
                    if (onChange) {
                      onChange(options[focusOptionMenuIndex]);
                    }
                    onInputChange(options[focusOptionMenuIndex].label);

                    if (menuOpen) {
                      onBlur();
                    }
                    break;
                  case "ArrowDown":
                    if (options.length - 1 > focusOptionMenuIndex) {
                      changeFocusOptionMenuIndex(focusOptionMenuIndex + 1);
                      onInputChange(options[focusOptionMenuIndex + 1].label);
                    }

                    break;
                  case "ArrowUp":
                    if (focusOptionMenuIndex !== 0) {
                      changeFocusOptionMenuIndex(focusOptionMenuIndex - 1);
                      onInputChange(options[focusOptionMenuIndex - 1].label);
                    }

                    break;
                  default:
                    let index = options.findIndex((options) =>
                      findOption(options, inputValue)
                    );

                    if (
                      defaultScrollOptionValue &&
                      (index < 0 || !inputValue)
                    ) {
                      index = options.findIndex((options) =>
                        findOption(options, defaultScrollOptionValue)
                      );
                    }

                    changeFocusOptionMenuIndex(index >= 0 ? index : 0);

                    break;
                }

                if (key !== "Enter" && !menuOpen) {
                  onFocus();
                }
              }}
              ref={inputFormRef}
              style={
                inputForm ? inputForm(inputFormBaseStyle) : inputFormBaseStyle
              }
            />
          );
        }}
      </Select.Consumer>
    </div>
  );
};

export default InputForm;
