import * as types from "./types";
import { CancelToken } from "../../../api";
import { setRequest, cancelAllRequests } from "../requests/actions";

export const initTable = payload => ({
  type: types.INIT_TABLE,
  payload
});

export const updateTable = payload => ({
  type: types.UPDATE_TABLE,
  payload
});

export const startTableLoading = () => ({
  type: types.STRAT_TABLE_LOADING
});

export const stopTableLoading = () => ({
  type: types.STOP_TABLE_LOADING
});

export const setLastQueryParamsTable = (lastQueryParams, req) => ({
  type: types.SET_LAST_QUERY_PARAMS_TABLE,
  lastQueryParams,
  req
});

export const destroyTable = () => ({ type: types.DESTROY_TABLE });

export const getDataTable = (req, params) => dispatch => {
  dispatch(cancelAllRequests());

  const cancelToken = new CancelToken(cancel => dispatch(setRequest(cancel)));

  req(params, cancelToken).then(res => dispatch(initTable(res)));
};

export const updateDataTable = (req, params) => async dispatch => {
  dispatch(cancelAllRequests());
  dispatch(startTableLoading());

  const cancelToken = new CancelToken(cancel => dispatch(setRequest(cancel)));

  await req(params, cancelToken).then(res => dispatch(updateTable(res)));

  dispatch(stopTableLoading());
};
