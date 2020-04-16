import * as types from "./types";
import createReducer from "../../../utils/createReducer";

const initialState = {
  isLoad: false
};

const loaderReducer = createReducer(initialState)({
  [types.START_LOADING]: () => ({
    isLoad: true
  }),

  [types.STOP_LOADING]: () => ({
    isLoad: false
  })
});

export default loaderReducer;
