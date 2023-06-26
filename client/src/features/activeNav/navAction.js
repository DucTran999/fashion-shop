import { changeOption, sidebarChangeOption } from "./navSlice";

const updateSelection = async (selection, dispatch) => {
  dispatch(changeOption(selection));
};

const updateSidebarSelection = async (selection, dispatch) => {
  dispatch(sidebarChangeOption(selection));
};

export { updateSelection, updateSidebarSelection };
