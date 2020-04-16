import axios from "axios";
import common from "./common";
import user from "./user";
import store from "../state/store";

export const CancelToken = axios.CancelToken;

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
