import * as types from "./types";
import createReducer from "../../../utils/createReducer";

const initialState = [];

const requestReducer = createReducer(initialState)({
  [types.SET_REQUEST]: (state, { request }) => [...state, request],

  [types.CANCEL_ALL_REQUESTS]: state => {
    state.forEach(cancel => cancel());

    return [];
  }
});

export default requestReducer;
