import React from "react";

import DatePickerUI from "../../ui/DatePicker/DatePicker";

import { formatDate } from "../../../helpers/values";
import { maskDatePicker } from "../../../helpers/validate";

import f from "../form-components.less";
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
  return (
    <div className={f.formField}>
      {label ? <label>{label}</label> : <label>&nbsp;</label>}

      <DatePickerUI
        {...input}
        name={inputProps.name}
        value={
          (input.value && typeof value === "object") ||
          input.value.indexOf("-") > 0
            ? moment(input.value, formatDate).format("DD.MM.YYYY")
            : input.value
        }
        defaultValue={
          input.value && moment(input.value, formatDate).format("DD.MM.YYYY")
        }
        onBlur={() => input.onBlur(input.value)}
        onKeyUp={e => {
          maskDatePicker(e, input);
        }}
        onChange={value =>
          typeof value === "object"
            ? input.onChange(moment(value, "DD.MM.YYYY").format(formatDate))
            : input.onChange(value)
        }
        placeholder={placeholder}
        touched={touched}
        error={error}
        visited={visited}
        disabled={disabled}
        validDate={validDate}
      />

      {visited && error && <span className={f.error}>{error}</span>}
    </div>
  );
};

export default DatePicker;
