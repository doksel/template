import React from "react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ua from "../../../helpers/countriesUa.json";

import cm from "classnames";
import s from "./InputPhone.module.less";

const InputPhoneUI = ({
  onChange,
  name,
  countryCode,
  touched,
  error,
  ...props
}) => (
  <div
    className={cm(s.inputPhone, {
      [s.error]: touched && error
    })}
  >
    <PhoneInput
      country={countryCode}
      inputProps={{ name }}
      {...props}
      onChange={onChange}
      localization={ua}
    />
  </div>
);

export default InputPhoneUI;
