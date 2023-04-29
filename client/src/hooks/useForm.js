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
    case "SET_FORM_DATA":
      return { ...state, inputs: action.inputs, statuses: action.statuses };
    default:
      return state;
  }
};

/**
 * [Hook to manage the submit form]
 * @param {Object} initialInput hold field's data
 * @param {Object} initialStatus fields' statuses are valid or not
 *
 * @returns {array}
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

  /* Setup form data when switch mode  */
  const setFormData = useCallback((inputData, inputStatus) => {
    dispatch({
      type: "SET_FORM_DATA",
      inputs: inputData,
      statuses: inputStatus,
    });
  }, []);

  return [formState, handleInput, setFormData];
};

export default useForm;
