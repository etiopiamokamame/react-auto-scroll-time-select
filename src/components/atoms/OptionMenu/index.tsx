import React, { ReactNode } from "react";
import { css } from "emotion";

interface IProps {
  children: ReactNode;
}

const OptionMenu = (props: IProps) => {
  return (
    <div
      className={css({
        color: "#3c4043",
        padding: "0 15px",
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      })}
      {...props}
    />
  );
};

export default OptionMenu;
