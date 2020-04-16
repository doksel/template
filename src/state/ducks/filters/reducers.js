import * as types from "./types";
import createReducer from "../../../utils/createReducer";

const initialState = {
  tableFilters: [],
  selectedFilters: []
};

const signInReducer = createReducer(initialState)({
  [types.SET_FILTER]: (state, { payload }) => {
    return {
      ...state,
      selectedFilters: [...state.selectedFilters, payload]
    };
  },

  [types.REMOVE_FILTER]: (state, { payload }) => {
    const selectedFilters = state.selectedFilters.filter(
      filter => filter.id !== payload.id
    );

    return {
      ...state,
      selectedFilters
    };
  },

  [types.SET_FILTERS]: (state, { payload }) => ({
    ...state,
    tableFilters: payload
  }),

  [types.REMOVE_FILTERS]: () => ({
    tableFilters: [],
    selectedFilters: []
  })
});

export default signInReducer;
