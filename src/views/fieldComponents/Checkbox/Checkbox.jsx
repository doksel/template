import React, { useEffect } from "react";

import CheckboxUI from "../../ui/Checkbox/Checkbox";

import f from "../form-components.less";

const Checkbox = ({ input, name, id, disabled, defaultValue, label }) => {
  useEffect(() => {
    input.value === "" && input.onChange(false);
  });

  return (
    <div className={f.wrapper_checkbox}>
      <div>
        <label htmlFor={id}></label>

        <CheckboxUI {...input} name={name} id={id} disabled={disabled} />
      </div>

      <div className={f.label_checkbox}>{label}</div>
    </div>
  );
};

export default Checkbox;
