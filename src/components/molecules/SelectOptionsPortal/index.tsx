import React from "react";
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

        let overFrameMenuPosition = false;

        const {
          left,
          top,
          width,
          bottom: selectControlBottom,
        } = selectControlRef.current.getBoundingClientRect();
        let positionTop = top;

        if (menuOpen && menuPortalTarget && inputFormRef.current) {
          const scrollbarHeight = 200 + 8;
          const {
            bottom: menuPortalBottom,
          } = menuPortalTarget.getBoundingClientRect();

          if (menuPortalBottom < selectControlBottom + scrollbarHeight) {
            positionTop -= scrollbarHeight;
            overFrameMenuPosition = true;
          }
        }

        return createPortal(
          <div
            style={{
              left,
              position: "absolute",
              top: positionTop,
              width,
              zIndex: 9999,
              boxSizing: "border-box",
            }}
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
              overFrameMenuPosition={overFrameMenuPosition}
            />
          </div>,
          menuPortalTarget
        );
      }}
    </SelectContext.Consumer>
  );
};

export default SelectOptionsPortal;
