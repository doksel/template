import React, { useState, useEffect } from "react";

import InputPhoneUI from "../../ui/InputPhone/InputPhone";
import { getUserIp } from "../../../helpers";

import s from "../Common.module.less";

const InputPhone = ({ label, input, required, meta: { touched, error } }) => {
  const [code, setCode] = useState("ua");

  useEffect(() => {
    getUserIp().then(res => {
      setCode(res);
    });
  }, [code]);

  return (
    <div className={s.formField}>
      {label ? (
        <label className={required && s.required}>{label}:</label>
      ) : (
        <label>&nbsp;</label>
      )}

      <InputPhoneUI
        {...input}
        onChange={input.onChange}
        touched={touched}
        error={error}
        countryCode={code}
      />

      {touched && error && <span className={s.error}>{error}</span>}
    </div>
  );
};
export default InputPhone;
