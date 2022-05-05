import React, { memo } from "react";
import { OptionType } from "../../../../types";

interface Props {
  className: string;
  option: OptionType;
  isFocused: boolean;
  selectedOption: (option: OptionType) => void;
  isDisabled: boolean;
}

const OptionMenu = ({
  className,
  option,
  isFocused,
  selectedOption,
  isDisabled,
}: Props) => {
  const additionalProps = {
    focus: isFocused ? "" : undefined,
    disabled: isDisabled,
  };

  return (
    <div
      className={className}
      onMouseDown={(e) => {
        if (isDisabled) {
          e.preventDefault();
        } else {
          selectedOption(option);
        }
      }}
      {...additionalProps}
    >
      {option.label}
    </div>
  );
};

export default memo(OptionMenu);
