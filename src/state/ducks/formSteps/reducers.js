import * as types from "./types";
import createReducer from "../../../utils/createReducer";

const initialState = {
  current: 0,
  isCheckedOnValid: false,
  isCameToLastStep: false,
  isLoading: true,
  list: []
};

const formStepsReducer = createReducer(initialState)({
  [types.SET_STEPS]: (state, { steps }) => ({ ...state, list: steps }),

  [types.SET_CURRENT_STEP]: (state, { current }) => ({ ...state, current }),

  [types.RESET_STEPS]: () => ({
    list: [],
    current: 0,
    isCheckedOnValid: false,
    isCameToLastStep: false,
    isLoading: true
  }),

  [types.SET_CHECKED_ON_VALID]: state => ({
    ...state,
    isCheckedOnValid: true,
    current: 0
  }),

  [types.SET_CAME_TO_LAST_STEP]: state => ({
    ...state,
    isCameToLastStep: true
  }),

  [types.STOP_STEPS_LOADING]: state => ({ ...state, isLoading: false }),

  [types.UPDATE_STATUS_STEPS]: (
    state,
    { options: { valid, waitSteps = [] } }
  ) => {
    const current = state.current;
    const steps = [...state.list];

    steps[current].valid = valid;

    let firstInvalidStep = steps.length - 1;

    for (let i = steps.length - 1; i >= 0; i--) {
      if (!steps[i].valid) {
        firstInvalidStep = i;
      }
    }

    steps.forEach((s, i) => {
      if (i > firstInvalidStep) steps[i].status = "wait";

      if (i < firstInvalidStep)
        steps[i].status = steps[i].valid ? "finish" : "wait";
    });

    steps[firstInvalidStep].status = steps[firstInvalidStep].valid
      ? "finish"
      : "process";

    steps[current].status = steps[current].valid ? "finish" : "process";

    waitSteps.forEach(step => {
      steps[step - 1].status = "wait";
    });

    return { ...state, list: steps };
  }
});

export default formStepsReducer;
