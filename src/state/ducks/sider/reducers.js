import * as types from "./types";
import createReducer from "../../../utils/createReducer";

const initialState = {
  isShowing: false
};

const loaderReducer = createReducer(initialState)({
  [types.SHOW_SIDER]: () => ({
    isShowing: true
  }),

  [types.HIDE_SIDER]: () => ({
    isShowing: false
  })
});

export default loaderReducer;
