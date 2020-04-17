import React from "react";
import DatePicker from "react-datetime";

import cm from "classnames";
import s from "./DatePicker.module.less";
import { formatDateView } from "../../../helpers/values";

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
  viewValidDate,
  closeOnSelect = true,
  touched,
  onKeyUp,
  ...props
}) => (
  <DatePicker
    className={cm(s.datePicker, {
      [s.error]: touched && error
    })}
    name={name}
    timeFormat={false}
    closeOnSelect={closeOnSelect}
    dateFormat={formatDateView}
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
    inputProps={{ placeholder, onKeyUp }}
    isValidDate={validDate}
    viewDate={viewValidDate}
    {...props}
  />
);

export default DatePickerUI;
