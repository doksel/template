import React from "react";
import cm from "classnames";

import Input from "../../ui/Input/Input";

import f from "../FieldComponents.module.less";
import s from "./InputSeriesNumber.module.less";

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
  ...props
}) => {
  const series = fieldsName
    ? props[fieldsName][index][
        names[0].split(".")[names[0].split(".").length - 1]
      ]
    : props[names[0].split(".")[names[0].split(".").length - 1]];

  const number = fieldsName
    ? props[fieldsName][index][
        names[1].split(".")[names[1].split(".").length - 1]
      ]
    : props[names[1].split(".")[names[1].split(".").length - 1]];

  const touched =
    (number && number.meta.touched) || (series && series.meta.touched);

  const error = (number && number.meta.error) || (series && series.meta.error);

  return (
    <div className={f.formField}>
      {label ? (
        <label className={required && "required"}>{label}</label>
      ) : (
        <label>&nbsp;</label>
      )}

      <div className={s.input_series_number}>
        <div className={s.series_input}>
          <Input
            type={type}
            placeholder="AA"
            disabled={disabled}
            {...series.input}
            onChange={e => series.input.onChange(e.target.value.toUpperCase())}
            touched={series.meta.touched}
            error={series.meta.error}
          />
        </div>

        <div className={s.number_input}>
          <Input
            type={type}
            placeholder="123456"
            disabled={disabled ? true : false}
            {...number.input}
            touched={number.meta.touched}
            error={number.meta.error}
          />
        </div>
      </div>

      <p
        className={cm(s.input_series_number, {
          [s.error]: touched && error
        })}
      >
        {series.meta.touched && series.meta.error}{" "}
        {series.meta.touched &&
        number.meta.touched &&
        number.meta.error &&
        series.meta.error
          ? " та "
          : null}{" "}
        {number.meta.touched && number.meta.error}
      </p>
    </div>
  );
};
export default InputSeriesNumber;
