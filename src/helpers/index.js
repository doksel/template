import api from "../api";

export const convertBase64ToFile = base64 => {
  const arr = base64.split(",");

  if (arr[0].match(/:(.*?);/)) {
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], "file", { type: mime });
  } else {
    return base64;
  }
};

export const toBase64 = (src, callback, outputFormat) => {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat, 0.5);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
};

export const checkOnEmptyObject = obj =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;

export const getUrlParam = param => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const getUserIp = async () =>
  await api.common.checkUserIp().then(async res => {
    let codeCountry = "";

    await api.common.getCountryByIp(res.ip).then(res => {
      codeCountry = res.substr(-3, 2).toLowerCase();
      return res;
    });

    return codeCountry;
  });
