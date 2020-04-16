import * as types from "./types";
import createReducer from "../../../utils/createReducer";

const initialState = {
  data: [],
  meta: {},
  lastQueryParams: {},
  req: null,
  loading: true
};

const tableReducer = createReducer(initialState)({
  [types.INIT_TABLE]: (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false
  }),

  [types.DESTROY_TABLE]: () => ({
    data: [],
    meta: {},
    lastQueryParams: {},
    req: null,
    loading: true
  }),

  [types.UPDATE_TABLE]: (state, { payload }) => ({
    ...state,
    ...payload
  }),

  [types.STRAT_TABLE_LOADING]: state => ({
    ...state,
    loading: true
  }),

  [types.STOP_TABLE_LOADING]: state => ({
    ...state,
    loading: false
  }),

  [types.SET_LAST_QUERY_PARAMS_TABLE]: (state, { lastQueryParams, req }) => ({
    ...state,
    lastQueryParams,
    req
  })
});

export default tableReducer;
