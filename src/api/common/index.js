import axios from "axios";
import { setHeader } from "../index";

const host = process.env.REACT_APP_API_HOST;
const api = `${host}/api/v1`;

export default {
  checkUserIp: () => {
    let config = {
      method: "GET",
      baseURL: `https://api.ipify.org?format=json`
    };

    return axios(config).then(res => res && res.data);
  },

  getCountryByIp: ip => {
    let config = {
      method: "GET",
      baseURL: `https://get.geojs.io/v1/ip/country?ip=${ip}`
    };

    return axios(config).then(res => res && res.data);
  },

  uploadFile: data => {
    let config = {
      method: "POST",
      baseURL: `${api}/attachments/upload`,
      headers: setHeader(),
      data
    };

    return axios(config).then(res => res && res.data);
  },

  removeFile: fileHash => {
    let config = {
      method: "DELETE",
      baseURL: `${api}/attachments/${fileHash}`,
      headers: setHeader()
    };

    return axios(config).then(res => res && res.data);
  }
};
