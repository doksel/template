import * as types from "./types";
import createReducer from "../../../utils/createReducer";

const initialState = {
  data: [],
  loading: true,
  sending: false,
  active: false
};

const chatReducer = createReducer(initialState)({
  [types.OPEN_CHAT_FORM]: state => ({ ...state, active: true, loading: true }),

  [types.CLOSE_CHAT_FORM]: state => ({
    ...state,
    active: false,
    loading: false
  }),

  [types.INIT_CHAT]: (state, { data }) => ({
    ...state,
    loading: false,
    data
  }),

  [types.SET_MESSAGE]: (state, { message }) => ({
    ...state,
    data: [message, ...state.data],
    active: false,
    sending: false
  }),

  [types.SET_SENDING_MESSAGE]: state => ({
    ...state,
    sending: true
  }),

  [types.RESET_CHAT_DATA]: () => ({})
});

export default chatReducer;
