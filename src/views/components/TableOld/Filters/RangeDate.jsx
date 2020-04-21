import React, { useState } from "react";
import { DatePicker } from "antd";
import { DATE_FORMAT } from "../../../../helpers/values";

import "moment/locale/uk";

import "./Filters.less";

const RangeDateFilter = ({ onSelect, checkValue }) => {
  const [value, setValue] = useState(null);

  return (
    <DatePicker.RangePicker
      size="large"
      className="button-margin date-picker"
      value={checkValue() ? null : value}
      format={DATE_FORMAT}
      onChange={(date, dateString) => {
        setValue(date);
        onSelect(date, dateString);
      }}
    />
  );
};

export default RangeDateFilter;
