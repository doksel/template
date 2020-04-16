import * as types from "./types";

export const setRequest = request => ({
  type: types.SET_REQUEST,
  request
});

export const cancelAllRequests = () => ({
  type: types.CANCEL_ALL_REQUESTS
});
