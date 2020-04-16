import * as types from "./types";
import createReducer from "../../../utils/createReducer";

const initialState = null;

const referenceReducer = createReducer(initialState)({
  [types.SET_VALUES]: (state, { values }) => ({ ...values }),

  [types.RESET_VALUES]: () => null
});

export default referenceReducer;
