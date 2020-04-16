import * as types from "./types";
import api from "../../../api";

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
  api.user
    .signin(credentials)
    .then(data => (data && !data.errors ? dispatch(userSignIn(data)) : data));
};

export const me = () => dispatch =>
  api.user.me().then(data => dispatch(setMe(data)));

export const signOut = () => {
  localStorage.removeItem("token");

  return {
    type: types.SIGN_OUT
  };
};
