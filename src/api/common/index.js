import axios from "axios";
import { setHeader } from "../index";

const host = process.env.REACT_APP_CORE_API_HOST;
const api = `${host}/api`;

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

  uploadFile: file => {
    let formData = new FormData();
    formData.append("file", file);

    return axios
      .post(`${api}/upload`, formData, {
        headers: {
          ...setHeader(),
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res && res.data);
  },

  removeFile: fileHash => {
    let config = {
      method: "DELETE",
      baseURL: `${api}/upload/${fileHash}`,
      headers: setHeader()
    };

    return axios(config).then(res => res && res.data);
  }
};
