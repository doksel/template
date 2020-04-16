import React from "react";
import cm from "classnames";

import SelecterUI from "../../ui/Selecter/Selecter";

import f from "../form-components.less";

const Selecter = ({
  label,
  input,
  meta: { touched, error },
  placeholder,
  options,
  disabled,
  onChange,
  defaultValue,
  invisible
}) => {
  if (defaultValue) {
    input.onChange(defaultValue);
  }

  return (
    <div
      className={cm(f.formField, {
        [f.invisible]: invisible
      })}
    >
      {label ? <label>{label}</label> : <label>&nbsp;</label>}
      <SelecterUI
        {...input}
        onChange={value => {
          input.onChange(value);
          onChange && onChange(value);
        }}
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        onBlur={input.onBlur}
        error={touched && error}
      />

      {touched && error && <span className={f.error}>{error}</span>}
    </div>
  );
};

export default Selecter;
