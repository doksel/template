import React from "react";
import DatePicker from "react-datetime";
import moment from "moment";

import cm from "classnames";
import s from "./DatePicker.less";

import "moment/locale/uk";
import "react-datetime/css/react-datetime.css";

const DatePickerUI = ({
  name,
  disabled,
  value,
  defaultValue,
  onChange,
  error,
  placeholder,
  validDate,
  closeOnSelect = true,
  touched,
  onKeyUp,
  ...props
}) => {
  var adulthood =
    validDate && moment().subtract(validDate.number, validDate.type);

  const valid = current => current[validDate.period](adulthood);

  value && value.indexOf("Z") !== -1 && onChange(value.substr(0, 10));

  return (
    <DatePicker
      className={cm(s.datePicker, {
        [s.error]: touched && error
      })}
      name={name}
      timeFormat={false}
      closeOnSelect={closeOnSelect}
      dateFormat="DD.MM.YYYY"
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      inputProps={{ placeholder, onKeyUp }}
      isValidDate={validDate && valid}
      viewDate={validDate ? new Date(adulthood) : new Date()}
      {...props}
    />
  );
};

export default DatePickerUI;
