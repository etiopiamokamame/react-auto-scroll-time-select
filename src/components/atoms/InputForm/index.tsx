import React, { KeyboardEvent } from "react";
import { css } from "emotion";
import Select from "../../../contexts/Select";

const InputForm = () => {
  return (
    <div className={css({ display: "table-cell", verticalAlign: "middle" })}>
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
          filterOption,
        }) => (
          <input
            type="text"
            value={inputValue || ""}
            onChange={(e) => onInputChange(e.target.value)}
            maxLength={5}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyUp={({ key }: KeyboardEvent<HTMLInputElement>) => {
              switch (key) {
                case "Escape":
                  if (menuOpen) {
                    onBlur();
                  }
                case "Enter":
                  if (onChange) {
                    onChange(options[focusOptionMenuIndex].label);
                  }
                  onInputChange(options[focusOptionMenuIndex].label);
                  onBlur();
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
                  const index = options.findIndex((options) =>
                    filterOption(options, inputValue)
                  );
                  changeFocusOptionMenuIndex(index >= 0 ? index : 0);

                  break;
              }

              if (key !== "Enter" && !menuOpen) {
                onFocus();
              }
            }}
            ref={inputFormRef}
            className={css({
              height: "calc(1.5em + .75rem + 2px)",
              border: 0,
              paddingLeft: 10,
              width: 56,
              outline: "none",
              lineHeight: 1.5,
              fontSize: "1rem",
            })}
          />
        )}
      </Select.Consumer>
    </div>
  );
};

export default InputForm;
