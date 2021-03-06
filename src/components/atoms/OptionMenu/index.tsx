import React from "react";
import { css } from "@emotion/css";
import SelectContext from "../../../contexts/Select";
import { OptionType } from "../../../";

interface IProps {
  option: OptionType;
  index: number;
}

const OptionMenu = ({ option: { label, value }, index }: IProps) => {
  return (
    <SelectContext.Consumer>
      {({
        onInputChange,
        onChange,
        focusOptionMenuIndex,
        options,
        styles: { optionMenu },
        disabledOptions,
      }) => {
        const optionMenuBaseStyle = {
          color: "#3c4043",
          padding: "0 15px",
          height: 40,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "1rem",
          backgroundColor:
            index == focusOptionMenuIndex ? "#f1f3f4" : "inherit",
          "&:hover": {
            backgroundColor: "#f1f3f4",
          },
          "&[disabled]": {
            color: "#cccccc",
          },
        };

        const isDisabled = disabledOptions.indexOf(value) >= 0;

        return (
          <div
            onMouseDown={() => {
              if (!isDisabled) {
                onInputChange(value);
                if (onChange) {
                  const option = options.find(
                    ({ value: optVal }) => optVal === value
                  );
                  onChange(option || options[0]);
                }
              }
            }}
            className={css(
              optionMenu ? optionMenu(optionMenuBaseStyle) : optionMenuBaseStyle
            )}
            {...{ disabled: isDisabled }}
          >
            {label}
          </div>
        );
      }}
    </SelectContext.Consumer>
  );
};

export default OptionMenu;
