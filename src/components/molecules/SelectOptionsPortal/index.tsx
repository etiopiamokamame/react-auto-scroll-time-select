import React from "react";
import { css } from "emotion";
import { createPortal } from "react-dom";
import SelectContext from "../../../contexts/Select";
import SelectOptions from "../SelectOptions";

const SelectOptionsPortal = () => {
  return (
    <SelectContext.Consumer>
      {({
        menuOpen,
        inputValue,
        scrollbarsRef,
        inputFormRef,
        focusOptionMenuIndex,
        options,
        findOption,
        changeFocusOptionMenuIndex,
        menuPortalTarget,
        selectControlRef,
      }) => {
        if (!menuPortalTarget || !selectControlRef.current) {
          return <></>;
        }

        return createPortal(
          <div
            className={css({
              left: selectControlRef.current.offsetLeft,
              position: "absolute",
              top: selectControlRef.current.offsetTop,
              width: selectControlRef.current.offsetWidth,
              zIndex: 1,
              boxSizing: "border-box",
            })}
          >
            <SelectOptions
              menuOpen={menuOpen}
              inputValue={inputValue}
              scrollbarsRef={scrollbarsRef}
              inputFormRef={inputFormRef}
              focusOptionMenuIndex={focusOptionMenuIndex}
              options={options}
              findOption={findOption}
              changeFocusOptionMenuIndex={changeFocusOptionMenuIndex}
            />
          </div>,
          menuPortalTarget
        );
      }}
    </SelectContext.Consumer>
  );
};

export default SelectOptionsPortal;
