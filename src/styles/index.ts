import { StyleConfigType } from "../../types";

export const defaultOptionMenuHeight = 40;
export const defaultOptionMenuCount = 5;

export const selectStyle: StyleConfigType = {
  position: "relative",
  "*": { boxSizing: "border-box" },
  "--option-menu-height": defaultOptionMenuHeight,
};

export const controlStyle: StyleConfigType = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  backgroundColor: "#fff",
  borderColor: "#d9d9d9 #ccc #b3b3b3",
  borderRadius: 4,
  border: "1px solid #ccc",
  color: "#333",
  cursor: "default",
  outline: "none",
};

export const inputFormStyle: StyleConfigType = {
  height: "calc(1.5em + .75rem + 2px)",
  border: 0,
  paddingLeft: 10,
  outline: "none",
  lineHeight: 1.5,
  fontSize: "1rem",
  flex: "auto",
  borderRadius: "inherit",
};

export const clearValueStyle: StyleConfigType = {
  width: 17,
  cursor: "pointer",
  textAlign: "center",
  "&:hover": {
    color: "rgba(0,0,0,.5)",
  },
};

export const dropDownArrowWrapperStyle: StyleConfigType = {
  width: 25,
  paddingRight: 5,
  cursor: "pointer",
  textAlign: "center",
  boxSizing: "border-box",
};

export const dropDownArrowItemStyle: StyleConfigType = {
  borderColor: "#999 transparent transparent",
  borderStyle: "solid",
  borderWidth: "5px 5px 2.5px",
  margin: "0 auto",
  width: 0,
  display: "inline-block",
  boxSizing: "border-box",
};

export const selectOptionsPortalStyle: StyleConfigType = {
  position: "absolute",
  zIndex: 9999,
};

export const selectOptionsStyle: StyleConfigType = {
  position: "absolute",
  left: 0,
  top: defaultOptionMenuHeight,
  width: "100%",
  overflowY: "scroll",
  background: "#fff",
  borderRadius: 2,
  zIndex: 1,
  boxShadow:
    "0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)",
  margin: "4px 0",
};

export const optionMenuStyle: StyleConfigType = {
  color: "#3c4043",
  padding: "0 15px",
  height: defaultOptionMenuHeight,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "1rem",
  "&:hover:not([disabled])": {
    backgroundColor: "#f1f3f4",
  },
  "&[focus]:not([disabled])": {
    backgroundColor: "#f1f3f4",
  },
  "&[disabled]": {
    color: "#cccccc",
    cursor: "not-allowed",
  },
};
