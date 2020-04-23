import * as types from "./types";
import api from "../../../api";
import { startLoading, stopLoading } from "../loader/actions";
import { message } from "../../../helpers/notifications";

export const userSignIn = ({ token }) => {
  if (token) {
    localStorage.setItem("token", token);

    return {
      type: types.SIGN_IN,
      token
    };
  }
};

export const setMe = user => ({
  type: types.SET_ME,
  user
});

export const signIn = credentials => dispatch => {
  dispatch(startLoading());

  return api.user
    .signin(credentials)
    .then(data => (data && !data.errors ? dispatch(userSignIn(data)) : data))
    .catch(err => {
      message.error();
    })
    .finally(() => dispatch(stopLoading()));
};

export const me = () => dispatch => {
  dispatch(startLoading());

  return api.user
    .me()
    .then(data => {
      message.success("Ви успішно увійшли у систему");
      return dispatch(setMe(data));
    })
    .catch(() => {
      localStorage.removeItem("token");
      message.error();
    })
    .finally(() => dispatch(stopLoading()));
};

export const signOut = () => {
  localStorage.removeItem("token");

  return {
    type: types.SIGN_OUT
  };
};
