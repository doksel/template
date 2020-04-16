import * as types from "./types";

export const setSteps = steps => ({
  type: types.SET_STEPS,
  steps
});

export const setCurrentStep = current => ({
  type: types.SET_CURRENT_STEP,
  current
});

export const updateStatusSteps = options => ({
  type: types.UPDATE_STATUS_STEPS,
  options
});

export const resetSteps = () => ({
  type: types.RESET_STEPS
});

export const setCheckedOnValid = () => ({
  type: types.SET_CHECKED_ON_VALID
});

export const setCameToLastStep = () => ({
  type: types.SET_CAME_TO_LAST_STEP
});

export const stopStepsLoad = () => ({
  type: types.STOP_STEPS_LOADING
});
