import React, { Component } from "react";
import { Menu, Checkbox, Icon } from "antd";
import { connect } from "react-redux";

import DateFilter from "./Date";

import {
  setFilter,
  removeFilter
} from "../../../../state/ducks/filters/actions";

import "./Filters.less";
import RangeDateFilter from "./RangeDate";

const { SubMenu } = Menu;

class Filters extends Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedFilters.length !== this.props.selectedFilters.length
    ) {
      this.props.onChange(nextProps.selectedFilters);
    }
  }

  checkValueDateFilter = index => {
    const { selectedFilters } = this.props;

    let isEmpty = true;

    selectedFilters.forEach(selectedFilter => {
      if (selectedFilter.id === index) {
        isEmpty = false;
      }
    });

    return isEmpty;
  };

  onSelectDate = (date, dateString, index, filter) => {
    const { removeFilter, setFilter } = this.props;

    if (date) {
      setFilter({
        id: index,
        type: filter.type,
        text: "По даті створення : ",
        valueInFilter: dateString,
        value: date._d,
        column: filter.column
      });
    } else {
      removeFilter({
        id: index
      });
    }
  };

  onSelectRangeDate = (date, dateString, index, filter) => {
    const { removeFilter, setFilter } = this.props;

    removeFilter({
      id: index
    });

    if (date.length > 0) {
      setFilter({
        id: index,
        type: filter.type,
        text: "По періоду : ",
        valueInFilter: dateString,
        value: date._d,
        column: filter.column
      });
    } else {
      removeFilter({
        id: index
      });
    }
  };

  onChangeCheckbox = (e, key, filter) => {
    const { removeFilter, setFilter } = this.props;

    if (e.target.checked) {
      setFilter({
        id: key.value,
        type: filter.type,
        text: `${filter.text} : `,
        valueInFilter: key.text,
        value: key.value,
        column: filter.column
      });
    } else {
      removeFilter({
        id: key.value
      });
    }
  };

  render() {
    const { tableFilters, selectedFilters } = this.props;

    return (
      <Menu mode="inline" className="tab-filters button-margin">
        {tableFilters.map((filter, index) => {
          switch (filter.type) {
            case "date":
              return (
                <SubMenu
                  key={`sub${index}`}
                  className="wrap-tab-filter"
                  title={
                    <span>
                      <Icon type="filter" theme="filled" /> По даті створення
                    </span>
                  }
                >
                  <div className="tab-filter">
                    <DateFilter
                      checkValue={() => this.checkValueDateFilter(index)}
                      onSelect={(date, dateString) => {
                        this.onSelectDate(date, dateString, index, filter);
                      }}
                    />
                  </div>
                </SubMenu>
              );

            case "rangeDate":
              return (
                <SubMenu
                  key={`sub${index}`}
                  className="wrap-tab-filter"
                  title={
                    <span>
                      <Icon type="filter" theme="filled" /> По періоду
                    </span>
                  }
                >
                  <div className="tab-filter">
                    <RangeDateFilter
                      checkValue={() => this.checkValueDateFilter(index)}
                      onSelect={(date, dateString) => {
                        this.onSelectRangeDate(date, dateString, index, filter);
                      }}
                    />
                  </div>
                </SubMenu>
              );

            case "selecter":
              return (
                <SubMenu
                  key={`sub${index}`}
                  className="wrap-tab-filter"
                  title={
                    <span>
                      <Icon type="filter" theme="filled" /> {filter.text}
                    </span>
                  }
                >
                  <div className="tab-filter">
                    {filter.keys.map(key => {
                      let isChecked = false;

                      selectedFilters.forEach(selectedFilter => {
                        if (selectedFilter.id === key.value) {
                          isChecked = true;
                        }
                      });

                      return (
                        <Checkbox
                          className="tab-checkbox"
                          key={key.value}
                          checked={isChecked}
                          onChange={e => {
                            this.onChangeCheckbox(e, key, filter);
                          }}
                        >
                          {key.text}
                        </Checkbox>
                      );
                    })}
                  </div>
                </SubMenu>
              );

            default:
              return null;
          }
        })}
      </Menu>
    );
  }
}
const mapStateToProps = ({ filters: { tableFilters, selectedFilters } }) => ({
  tableFilters,
  selectedFilters
});

const mapDispatchToProps = { removeFilter, setFilter };

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
