import React from "react";

import DatePickerUI from "../../ui/DatePicker/DatePicker";

import { formatDate, formatDateView } from "../../../helpers/values";
import { maskDatePicker } from "../../../helpers/validate";

import f from "../Common.module.less";
import moment from "moment";

const DatePicker = ({
  label,
  input,
  meta: { touched, error, visited },
  placeholder,
  disabled,
  inputProps,
  validDate
}) => {
  let adulthood =
    validDate && moment().subtract(validDate.number, validDate.type);

  const valid = current => current[validDate.period](adulthood);

  let value =
    (input.value && typeof input.value === "object") ||
    input.value.indexOf("-") > 0
      ? moment(input.value, formatDate).format(formatDateView)
      : input.value;

  return (
    <div className={f.formField}>
      {label ? <label>{label}</label> : <label>&nbsp;</label>}

      <DatePickerUI
        {...input}
        name={inputProps.name}
        value={
          (input.value && typeof value === "object") ||
          input.value.indexOf("-") > 0
            ? moment(input.value, formatDate).format(formatDateView)
            : input.value
        }
        defaultValue={
          input.value && moment(input.value, formatDate).format(formatDateView)
        }
        onBlur={() => input.onBlur(input.value)}
        onKeyUp={e => {
          maskDatePicker(e, input);
        }}
        onChange={value =>
          typeof value === "object"
            ? input.onChange(moment(value, formatDateView).format(formatDate))
            : input.onChange(value)
        }
        placeholder={placeholder}
        touched={touched}
        error={error}
        visited={visited}
        disabled={disabled}
        validDate={validDate && valid}
        viewValidDate={validDate ? new Date(adulthood) : new Date()}
      />

      {visited && error && <span className={f.error}>{error}</span>}
    </div>
  );
};

export default DatePicker;
