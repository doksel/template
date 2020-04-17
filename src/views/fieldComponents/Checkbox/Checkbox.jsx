import React, { useEffect } from "react";

import CheckboxUI from "../../ui/Checkbox/Checkbox";

import s from "./Checkbox.module.less";

const Checkbox = ({ input, name, id, disabled, label }) => {
  useEffect(() => {
    input.value === "" && input.onChange(false);
  });

  return (
    <div className={s.wrapper_checkbox}>
      <div>
        <label htmlFor={id}></label>

        <CheckboxUI {...input} name={name} id={id} disabled={disabled} />
      </div>

      <div className={s.label_checkbox}>{label}</div>
    </div>
  );
};

export default Checkbox;
