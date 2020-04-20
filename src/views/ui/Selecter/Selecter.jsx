import React from "react";
import Select from "react-select";

const customStyles = {
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isFocused || isSelected ? "#004bc1" : null,
    color: isFocused ? "#fff" : isSelected ? "#fff" : "inherit",
    transition: "0.2s",
    padding: 15,
    cursor: "pointer"
  }),
  control: (provided, { isFocused, isSelected }) => ({
    ...provided,
    position: "relative",
    display: "flex",
    cursor: "pointer",
    minHeight: "50px",
    boxShadow: "none",
    border: isFocused || isSelected ? "1px solid #004bc1" : "1px solid #323a45",
    padding: 0,
    color: "inherit",
    fontSize: "16px",
    borderRadius: 0,
    outline: isFocused
      ? "2px dotted #6f777b"
      : isSelected
      ? "2px dotted #6f777b"
      : null,
    outlineOffset: isFocused || isSelected ? 3 : null,
    "&:hover": {
      borderColor: "none"
    }
  }),
  indicatorSeparator: () => ({
    display: "none"
  }),
  indicatorContainer: (provided, state) => {
    const opacity = state.isDisabled ? 1 : 1;
    const color = state.isDisabled ? "#004bc1" : "#004bc1";

    return { ...provided, opacity, color };
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 1 : 1;
    const color = state.isDisabled ? "#000" : "inherit";

    return { ...provided, opacity, color };
  },
  menu: provided => ({
    ...provided,
    border: "none",
    boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
    "&:-webkit-scrollbar-track": {
      backgroundColor: "transparent"
    }
  }),
  menuList: provided => ({
    ...provided,
    "&:-webkit-scrollbar-track": {
      backgroundColor: "transparent"
    }
  })
};

const Selecter = ({
  options,
  placeholder,
  disabled,
  input,
  error,
  onChange,
  name,
  value
}) => (
  <Select
    {...input}
    className="react-select-container"
    classNamePrefix="react-select"
    styles={customStyles}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    options={options}
    isDisabled={disabled}
    error={error}
    name={name}
    onBlur={e => {
      e.preventDefault();
    }}
    noOptionsMessage={() => "Not found"}
  />
);

export default Selecter;
