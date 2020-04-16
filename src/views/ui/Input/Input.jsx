import React from "react";
import cm from "classnames";

import s from "./Input.less";

const InputUI = ({
  placeholder,
  type,
  onChange,
  touched,
  error,
  maxLength,
  onKeyUp,
  ...props
}) => (
  <input
    className={cm(s.input, {
      [s.error]: touched && error
    })}
    type={type}
    placeholder={placeholder}
    onKeyUp={onKeyUp}
    onChange={onChange}
    {...props}
  />
);

export default InputUI;
