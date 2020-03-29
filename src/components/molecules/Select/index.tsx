import { css } from "emotion";
import React from "react";

interface IProps {
  span?: number;
}

const Select = (props: IProps) => {
  return (
    <div className={css({ position: "relative" })}>
      <h1>Select</h1>
    </div>
  );
};

Select.defaultProps = {
  span: 15
};

export default Select;
