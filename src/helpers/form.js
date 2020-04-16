import { AUTOSAVE_TIME } from "./values";
import store from "../state/store";

import {
  updateStatusSteps,
  setCurrentStep,
  setCheckedOnValid,
  setCameToLastStep,
  stopStepsLoad
} from "../state/ducks/formSteps/actions";

let timer = null;

export const startAutosave = method => {
  timer = setInterval(method, AUTOSAVE_TIME);
};

export const stopAutosave = () => clearInterval(timer);

export const startCheckSteps = (valid, waitSteps = []) => {
  const { dispatch, getState } = store;
  const state = getState();

  const {
    formSteps: { isCheckedOnValid, isCameToLastStep, list, current }
  } = state;

  if (list.length > 0) {
    dispatch(updateStatusSteps({ waitSteps, valid }));

    if (!isCheckedOnValid) {
      setTimeout(() => {
        if (list.length - 1 > current) {
          dispatch(setCurrentStep(current + 1));
        } else {
          dispatch(setCheckedOnValid());
        }
      }, 0);
    }

    if (!isCameToLastStep && isCheckedOnValid) {
      setTimeout(() => {
        let isNextStepWait = waitSteps.includes(current + 2);

        if (
          list[current].valid &&
          list.length - 1 > current &&
          !isNextStepWait
        ) {
          dispatch(setCurrentStep(current + 1));
        } else {
          dispatch(setCameToLastStep());
          dispatch(stopStepsLoad());
        }
      }, 0);
    }
  }
};
