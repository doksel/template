import * as types from "./types";

export const setInitalValues = values => ({
  type: types.SET_VALUES,
  values
});

export const resetInitialValues = () => ({
  type: types.RESET_VALUES
});
