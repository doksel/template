import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { getUserIp } from "../../../helpers/functions";

import cm from "classnames";
import s from "./InputPhone.less";

import ua from "../../../helpers/countriesUa.json";

const InputPhoneUI = ({ onChange, name, touched, error, ...props }) => {
  const [code, setCode] = useState("ua");

  useEffect(() => {
    getUserIp().then(res => {
      setCode(res);
    });
  }, [code]);

  return (
    <div
      className={cm(s.inputPhone, {
        [s.error]: touched && error
      })}
    >
      <PhoneInput
        country={code}
        inputProps={{ name }}
        {...props}
        onChange={onChange}
        localization={ua}
      />
    </div>
  );
};

export default InputPhoneUI;
