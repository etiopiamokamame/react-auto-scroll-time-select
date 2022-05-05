import React, { ReactChild, RefObject } from "react";
import SelectOptionsPortal from "../../molecules/SelectOptionsPortal";

interface Props {
  children: ReactChild;
  menuPortalTarget?: HTMLElement;
  selectControlRef: RefObject<HTMLDivElement>;
  optionLength: number;
}

const SelectOptionsFrame = ({
  children,
  menuPortalTarget,
  selectControlRef,
  optionLength,
}: Props) => {
  if (menuPortalTarget) {
    return (
      <SelectOptionsPortal
        menuPortalTarget={menuPortalTarget}
        selectControlRef={selectControlRef}
        optionLength={optionLength}
      >
        {children}
      </SelectOptionsPortal>
    );
  } else {
    return <>{children}</>;
  }
};

export default SelectOptionsFrame;
