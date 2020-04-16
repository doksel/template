import React, { Component } from "react";
import ScrollArea from "react-scrollbar";
import cm from "classnames";

import s from "./Selecter.less";

class SelecterUI extends Component {
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

  componentDidUpdate() {
    const { selected } = this.state;

    if (!this.props.options.length && selected) {
      this.setState({ selected: null });
    }
  }

  setSelectedValue = () => {
    const { options, localCurrency } = this.props;

    if (typeof this.props.value === "object") {
      this.setState({
        selected: options.filter(
          option => option.value.id === this.props.value.id
        )[0]
      });
    } else {
      if (!this.props.value && localCurrency) {
        this.props.onChange(options[0].value);
      } else {
        this.setState({
          selected: options.filter(
            option => option.value === this.props.value
          )[0]
        });
      }
    }
  };

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

    this.props.onChange && this.props.onChange(option.value);
  };

  render() {
    const { selected, active } = this.state;

    const { placeholder, options, disabled, error, onBlur } = this.props;

    return (
      <div
        className={cm(s.wrapInput, {
          [s.disabled]: disabled
        })}
      >
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

export default SelecterUI;
