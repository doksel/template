import React, { useEffect } from "react";
import cm from "classnames";

import Input from "../../ui/Input/Input";
import SelecterUI from "../../ui/Selecter/Selecter";

import f from "../Common.module.less";
import s from "./InputCurrency.module.less";

const InputSeriesNumber = ({
  type,
  label,
  disabled,
  required,
  meta,
  fieldsName,
  index,
  seriesName,
  names,
  numberName,
  options,
  localCurrency,
  invisible,
  placeholder = "Enter amound",
  ...props
}) => {
  const series = fieldsName
    ? props[fieldsName][index][
        names[0].split(".")[names[0].split(".").length - 1]
      ]
    : props[names[0].split(".")[names[0].split(".").length - 1]];

  const number = props[names[1].split(".")[names[1].split(".").length - 1]];

  const touched =
    (number && number.meta.touched) || (series && series.meta.touched);

  const error = (number && number.meta.error) || (series && series.meta.error);

  useEffect(() => {
    series.input.onChange(0);
  });

  return (
    <div
      className={cm(f.formField, {
        [f.invisible]: invisible
      })}
    >
      {label ? (
        <label className={required && "required"}>{label}</label>
      ) : (
        <label>&nbsp;</label>
      )}

      <div className={s.input_currency}>
        <div className={s.count_currency}>
          <Input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            {...series.input}
            onChange={e => series.input.onChange(e.target.value.toUpperCase())}
            touched={series.meta.touched}
            error={series.meta.error}
          />
        </div>

        <div className={s.type_currency}>
          <SelecterUI
            {...number.input}
            onChange={value => number.input.onChange(value)}
            disabled={disabled}
            placeholder={number.input.value || localCurrency}
            localCurrency={localCurrency}
            options={options}
            onBlur={number.input.onBlur}
            error={touched && error}
          />
        </div>
      </div>

      <p
        className={cm(s.input_series_number, {
          [s.error]: touched && error
        })}
      >
        {touched && series.meta.error}{" "}
        {touched && number.meta.error && series.meta.error ? " та " : null}{" "}
        {touched && number.meta.error}
      </p>
    </div>
  );
};
export default InputSeriesNumber;
