import React from "react";
import cm from "classnames";

import InputUI from "../../ui/Input/Input";

import s from "../Common.module.less";

const Input = ({
  label,
  input,
  type,
  meta: { touched, error },
  placeholder,
  initValue,
  defaultValue,
  disabled,
  autoUpperCase,
  invisible,
  required,
  mask
}) => {
  if (initValue && !input.value) {
    input.onChange(initValue);
  }

  if (defaultValue) {
    input.onChange(defaultValue);
  }

  return (
    <div
      className={cm(s.formField, {
        [s.invisible]: invisible
      })}
    >
      {label ? (
        <label className={required && s.required}>{label}:</label>
      ) : (
        <label>&nbsp;</label>
      )}

      <InputUI
        {...input}
        placeholder={placeholder}
        touched={touched}
        error={error}
        type={type}
        disabled={disabled}
        onKeyUp={mask && (e => mask(e, input))}
        onChange={e =>
          autoUpperCase
            ? input.onChange(e.target.value.toUpperCase())
            : input.onChange(e.target.value)
        }
      />

      {touched && error && <span className={s.error}>{error}</span>}
    </div>
  );
};
export default Input;
