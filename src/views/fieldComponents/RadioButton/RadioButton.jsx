import React from "react";

import RadioButtonUI from "../../ui/RadioButton/RadioButton";

import s from "./RadioButton.module.less";
import c from "../Common.module.less";

const RadioButton = ({
  input,
  label,
  radioButtonList = [],
  disabled,
  meta: { touched, error },
  required
}) => (
  <div className={s.wrap}>
    <label className={required && c.required}>{label}:</label>

    <div className={s.wrap_list}>
      {radioButtonList.map((radioButton, index) => (
        <RadioButtonUI
          input={input}
          name={input.name}
          radioButton={radioButton}
          disabled={disabled}
          key={index}
          id={`${input.name}_${index}`}
        />
      ))}
    </div>

    {touched && error && <span className={s.error}>{error}</span>}
  </div>
);

export default RadioButton;
