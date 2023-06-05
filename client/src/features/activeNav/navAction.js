import { changeOption } from "./navSlice";

const updateSelection = async (selection, dispatch) => {
  dispatch(changeOption(selection));
};

export { updateSelection };
