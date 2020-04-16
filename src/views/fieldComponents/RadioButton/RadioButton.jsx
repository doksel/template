import React from "react";

import RadioButtonUI from "../../ui/RadioButton/RadioButton";

import s from "./RadioButton.less";

const RadioButton = ({ input, label, radioButtonList = [], disabled }) => (
  <div className={s.wrap}>
    <label>{label}</label>

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
  </div>
);

export default RadioButton;
