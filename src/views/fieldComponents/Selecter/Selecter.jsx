import React, { useState, useEffect } from "react";
import SelectUI from "../../ui/Selecter/Selecter";

import s from "../FieldComponents.module.less";

const Selecter = ({
  initValue,
  options,
  placeholder,
  disabled,
  input,
  required,
  meta: { touched, error },
  label
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (initValue) {
      setSelectedOption(
        options.filter(option => option.value === initValue)[0]
      );
      input.onChange(initValue);
    } else {
      setSelectedValue();
    }
  }, []);

  useEffect(() => {
    if (!options.length && selectedOption) {
      setSelectedValue(null);
    }
  }, [selectedOption]);

  const setSelectedValue = () => {
    if (typeof input.value === "object") {
      setSelectedOption(
        options.filter(option => option.value.id === input.value.id)[0]
      );
    } else {
      setSelectedOption(
        options.filter(option => option.value === input.value)[0]
      );
    }
  };

  const handleChange = selectedOption => {
    setSelectedValue(selectedOption);
  };

  return (
    <div className={s.formField}>
      {label ? (
        <label className={required && s.required}>{label}:</label>
      ) : (
        <label>&nbsp;</label>
      )}

      <SelectUI
        {...input}
        onChange={value => {
          input.onChange(typeof value === "object" ? value.value : value);
          handleChange(value);
        }}
        value={selectedOption}
        placeholder={placeholder}
        options={options}
        disabled={disabled}
        error={touched && error}
        name={input.name}
      />

      {touched && error && <span className={s.error}>{error}</span>}
    </div>
  );
};

export default Selecter;
