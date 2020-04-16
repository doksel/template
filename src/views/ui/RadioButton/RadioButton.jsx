import React from "react";

import s from "./RadioButton.less";

const RadioButtonUI = ({ name, id, disabled, value, radioButton, input }) => (
  <label htmlFor={id}>
    <div className={s.agree_wrap}>
      <input
        type="radio"
        name={name}
        id={id}
        value={radioButton.value}
        checked={input.value === radioButton.value}
        disabled={disabled}
        className={s.radio}
        hidden
        {...input}
        onChange={() => input.onChange(radioButton.value)}
      />

      <label htmlFor={id} className={s.text_delete}></label>

      <div className={s.checkbox_text}>{radioButton.text}</div>
    </div>
  </label>
);

export default RadioButtonUI;
