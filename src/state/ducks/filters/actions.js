import * as types from "./types";

export const setFilter = payload => ({
  type: types.SET_FILTER,
  payload
});

export const removeFilter = payload => ({
  type: types.REMOVE_FILTER,
  payload
});

export const setFilters = payload => ({
  type: types.SET_FILTERS,
  payload
});

export const removeFilters = () => ({ type: types.REMOVE_FILTERS });
