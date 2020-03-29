import React, { Component } from "react";
import { css } from "emotion";
import { Scrollbars } from "react-custom-scrollbars";
import SelectContext from "../../../contexts/Select";
import OptionMenu from "../../atoms/OptionMenu";

interface IProps {
  span: number;
}

type OptionType = {
  label: string;
  value: string;
};

class SelectOptions extends Component<IProps> {
  shouldComponentUpdate(nextProps: IProps) {
    return nextProps.span !== this.props.span;
  }

  render() {
    const candidates = Array.from({ length: 33 })
      .map((_, h) => {
        return Array.from({ length: 60 }).map((_, m) => m + h * 60);
      })
      .flat()
      .filter(n => n % this.props.span === 0);

    const format = (num: number) => ("0" + num).slice(-2);

    const options: OptionType[] = candidates.map(candidate => {
      const h = Math.floor(candidate / 60);
      const m = candidate - h * 60;
      const formatTime = `${format(h)}:${format(m)}`;

      return {
        label: formatTime,
        value: formatTime
      };
    });

    return (
      <SelectContext.Consumer>
        {({ offsetHeight }) => (
          <div
            className={css({
              margin: "8px 0",
              position: "absolute",
              top: offsetHeight,
              height: 200,
              width: "100%",
              overflowY: "scroll",
              background: "#fff",
              borderRadius: 2,
              boxShadow:
                "0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)"
            })}
          >
            <Scrollbars>
              {options.map(({ label }, i) => (
                <OptionMenu key={i}>{label}</OptionMenu>
              ))}
            </Scrollbars>
          </div>
        )}
      </SelectContext.Consumer>
    );
  }
}

export default SelectOptions;
