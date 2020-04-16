import React, { useState } from "react";
import { DatePicker } from "antd";
import { DATE_FORMAT } from "../../../../helpers/values";

import "moment/locale/uk";

import "./Filters.less";

const DateFilter = ({ onSelect, checkValue }) => {
  const [value, setValue] = useState(null);

  return (
    <DatePicker
      size="large"
      className="button-margin date-picker"
      placeholder="Обрати дату"
      value={checkValue() ? null : value}
      format={DATE_FORMAT}
      onChange={(date, dateString) => {
        setValue(date);
        onSelect(date, dateString);
      }}
    />
  );
};

export default DateFilter;
