import React, { Component } from "react";
import ScrollArea from "react-scrollbar";

import s from "./InputCerrency.less";
import cm from "classnames";

class InputCerrencyUI extends Component {
  state = {
    selected: null,
    active: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);

    this.setSelectedValue();
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setSelectedValue = () =>
    this.setState({
      selected: this.props.options.filter(
        option => option.value === this.props.value
      )[0]
    });

  handleClickOutside = e => {
    if (this.list && !this.list.contains(e.target)) {
      this.setState({ active: false });
    }
  };

  onChange = option => {
    this.setState({
      selected: option,
      active: false
    });

    this.input.focus();

    this.props.onChange && this.props.onChange(option);
  };

  render() {
    const { selected, active } = this.state;

    const {
      placeholder,
      options,
      disabled,
      error,
      type,
      onBlur,
      onChange,
      touched,
      ...props
    } = this.props;

    return (
      <div
        className={cm(s.wrapInput, {
          [s.disabled]: disabled
        })}
      >
        <input
          className={cm(s.input, {
            [s.error]: touched && error
          })}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          {...props}
        />
        <div
          className={cm(s.input, {
            [s.focused]: active,
            [s.error]: error
          })}
          ref={ref => (this.input = ref)}
          tabIndex="0"
          onClick={() => this.setState({ active: true })}
          onBlur={onBlur}
        >
          {selected ? (
            <span className={s.selected}>{selected.text}</span>
          ) : (
            <span>{placeholder}</span>
          )}

          <div className={s.arrow} />
        </div>

        <div className={s.wrapperOptions} ref={ref => (this.list = ref)}>
          {active && (
            <ScrollArea
              speed={0.8}
              className={s.area}
              horizontal={false}
              onScroll={() => {
                this.input.focus();
              }}
            >
              <div className={s.options}>
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={cm(s.option, {
                      [s.active]: option.value === selected && selected.value
                    })}
                    onClick={() => this.onChange(option)}
                  >
                    {option.text}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    );
  }
}

export default InputCerrencyUI;
