import { Store } from "../../../types";
import Action from "../actions";

export const reducer = (state: Store.State, action: Store.Action) => {
  switch (action.type) {
    case "change-input-value":
      return Action.changeInputValue(state, action.inputValue);
    case "change-focus-option-menu-index":
      return Action.changeFocusOptionMenuIndex(
        state,
        action.focusOptionMenuIndex
      );
    case "open-menu":
      return Action.openMenu(state);
    case "close-menu":
      return Action.closeMenu(state);
    case "selected-option":
      return Action.selectedOption(state, action.option);
    case "clear-value":
      return Action.clearValue(state);
    case "update-value":
      return Action.updateValue(state, action.value);
    case "update-span":
      return Action.updateSpan(state, action.span);
    case "update-hour-limit":
      return Action.updateHourLimit(state, action.hourLimit);
    case "update-find-option":
      return Action.updateFindOption(state, action.findOption);
    case "update-is-clearable":
      return Action.updateIsClearable(state, action.isClearable);
    case "update-default-scroll-option-value":
      return Action.updateDefaultScrollOptionValue(
        state,
        action.defaultScrollOptionValue
      );
    case "update-hide-options":
      return Action.updateHideOptions(state, action.hideOptions);
    case "update-disabled-options":
      return Action.updateDisabledOptions(state, action.disabledOptions);
    case "update-start-time":
      return Action.updateStartTime(state, action.startTime);
    default:
      return { ...state };
  }
};
