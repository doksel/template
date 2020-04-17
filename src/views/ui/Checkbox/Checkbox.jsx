import React from "react";

import s from "./Checkbox.module.less";

const CheckboxUI = ({ name, id, disabled, value, ...props }) => (
  <div className={s.wrap_checkbox}>
    <input
      type="checkbox"
      name={name}
      id={id}
      disabled={disabled}
      className={s.checkbox}
      value={value}
      checked={value}
      hidden
      {...props}
    />

    <label htmlFor={id}></label>
  </div>
);

export default CheckboxUI;
