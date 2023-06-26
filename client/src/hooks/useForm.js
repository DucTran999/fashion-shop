import { useReducer, useCallback } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.fieldName]: action.value,
        },
        statuses: {
          ...state.statuses,
          [action.fieldName]: action.status,
        },
      };
    default:
      return state;
  }
};

/**

 * @returns {array} * [Hook to manage the submit form]
 * @param {Object} initialInput hold field's data
 * @param {Object} initialStatus fields' statuses are valid or not
 *
 */
const useForm = (initialInput, initialStatus) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInput,
    statuses: initialStatus,
  });

  /* Update fields data, and status when the user inputs */
  const handleInput = useCallback((name, value, status) => {
    dispatch({
      type: "INPUT_CHANGE",
      fieldName: name,
      value: value,
      status: status,
    });
  }, []);

  return [formState, handleInput];
};

export default useForm;
