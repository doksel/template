import axios from "axios";
import { setHeader } from "../index";
import { API } from "../index";

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
      baseURL: `${API}/attachments/upload`,
      headers: setHeader(),
      data
    };

    return axios(config).then(res => res && res.data);
  },

  removeFile: fileHash => {
    let config = {
      method: "DELETE",
      baseURL: `${API}/attachments/${fileHash}`,
      headers: setHeader()
    };

    return axios(config).then(res => res && res.data);
  }
};
