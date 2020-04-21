import axios from "axios";
import common from "./common";
import user from "./user";
import store from "../state/store";

export const CancelToken = axios.CancelToken;
export const host = process.env.REACT_APP_API_HOST;
export const REACT_RESIDENCY_HOST = process.env.REACT_APP_RESIDENCY_API_HOST;
export const API = `${host}/api/v1`;

export const setHeader = () => {
  const state = store.getState();
  const token =
    (state.user && state.user.token) || localStorage.getItem("token");

  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`
  };
};

export default {
  common,
  user
};
