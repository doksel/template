import React from "react";
import Select from "react-select";

import f from "../form-components.less";

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
    border: isFocused || isSelected ? "2px solid #004bc1" : "2px solid #323a45",
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

class SelectSearch extends React.Component {
  state = {
    selectedOption: null
  };

  componentDidMount() {
    const { initValue } = this.props;

    if (initValue) {
      this.setState({
        selectedOption: this.props.options.filter(
          option => option.value === initValue
        )[0]
      });
      this.props.input.onChange(initValue);
    } else {
      this.setSelectedValue();
    }
  }

  setSelectedValue = () => {
    if (typeof this.props.input.value === "object") {
      this.setState({
        selectedOption: this.props.options.filter(
          option => option.value.id === this.props.input.value.id
        )[0]
      });
    } else {
      this.setState({
        selectedOption: this.props.options.filter(
          option => option.value === this.props.input.value
        )[0]
      });
    }
  };

  componentDidUpdate() {
    const { selectedOption } = this.state;

    if (!this.props.options.length && selectedOption) {
      this.setState({ selectedOption: null });
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
    const { selectedOption } = this.state;
    const {
      options,
      placeholder,
      disabled,
      input,
      meta: { touched, error },
      label
    } = this.props;

    return (
      <div className={f.formField}>
        {label ? <label>{label}</label> : <label>&nbsp;</label>}

        <Select
          {...input}
          className="react-select-container"
          classNamePrefix="react-select"
          styles={customStyles}
          onChange={value => {
            input.onChange(typeof value === "object" ? value.value : value);
            this.handleChange(value);
          }}
          value={selectedOption}
          placeholder={placeholder}
          options={options}
          isDisabled={disabled}
          error={touched && error}
          name={input.name}
          onBlur={e => {
            e.preventDefault();
          }}
          noOptionsMessage={() => "Не знайдено"}
        />

        {touched && error && <span className={f.error}>{error}</span>}
      </div>
    );
  }
}

export default SelectSearch;
