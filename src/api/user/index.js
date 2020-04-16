import axios from "axios";
import { setHeader } from "../index";

export const USER_HOST = process.env.REACT_APP_USER_API_HOST;
export const USER_API = `${USER_HOST}/api`;

export default {
  signin: data =>
    axios.post(`${USER_API}/login`, data).then(res => res && res.data),

  me: () => {
    let config = {
      method: "GET",
      baseURL: `${USER_API}/users/me`,
      headers: setHeader()
    };

    return axios(config).then(res => res && res.data);
  }
};
