import React from "react";
import InputPhoneUI from "../../ui/InputPhone/InputPhone";

import f from "../form-components.less";

const InputPhone = ({ label, input, meta: { touched, error } }) => (
  <div className={f.formField}>
    {label ? <label>{label}</label> : <label>&nbsp;</label>}

    <InputPhoneUI
      {...input}
      onChange={input.onChange}
      touched={touched}
      error={error}
    />

    {touched && error && <span className={f.error}>{error}</span>}
  </div>
);
export default InputPhone;
