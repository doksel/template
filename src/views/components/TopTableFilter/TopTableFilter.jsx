import React from "react";
import { connect } from "react-redux";
import { TweenOneGroup } from "rc-tween-one";

import { removeFilter } from "../../../state/ducks/filters/actions";

import "./TopTableFilter.less";

const TopTableFilter = ({ selectedFilters, removeFilter }) => (
  <TweenOneGroup
    enter={{
      opacity: 0,
      type: "from",
      duration: 300,
      margin: 0,
      paddingTop: 0,
      paddingBottom: 0,
      height: 0,
      onComplete: e => {
        e.target.style = "";
      }
    }}
    leave={{
      opacity: 0,
      height: 0,
      margin: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 300
    }}
    appear={false}
  >
    {selectedFilters.length > 0 && (
      <div className="filters paper small-shadow container-actions" key="0">
        {selectedFilters.map((filter, index) => (
          <span key={index}>
            <div
              onClose={e => {
                e.preventDefault();
                removeFilter(filter);
              }}
            >
              {filter.type === "rangeDate" ? (
                <span>
                  {filter.text} з {filter.valueInFilter[0]} по{" "}
                  {filter.valueInFilter[1]}
                </span>
              ) : (
                <span>
                  {filter.text}
                  {filter.valueInFilter}
                </span>
              )}
            </div>
          </span>
        ))}
      </div>
    )}
  </TweenOneGroup>
);

const mapStateToProps = ({ filters: { selectedFilters } }) => ({
  selectedFilters
});

const mapDispatchToProps = { removeFilter };

export default connect(mapStateToProps, mapDispatchToProps)(TopTableFilter);
