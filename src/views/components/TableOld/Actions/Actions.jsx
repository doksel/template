import React, { Component } from "react";
import { Button, Dropdown, Input, Icon } from "antd";
import { NavLink, withRouter, matchPath } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import Filters from "../Filters/Filters";

import * as resources from "../../../resources";
import {
  setFilters,
  removeFilters
} from "../../../../state/ducks/filters/actions";

class Actions extends Component {
  state = {
    filterIsShowing: false
  };

  match = matchPath(this.props.history.location.pathname, {
    path: "/:role/:category?/:subCategory?",
    exact: true,
    strict: false
  });

  getSubResources = () => {
    const currentResource = this.getCurrentResource();

    return resources[currentResource].subResources;
  };

  getCurrentResource = () => {
    const listResources = Object.keys(resources);

    const currentResource = listResources.filter(
      name => this.match.params.category === resources[name].name
    )[0];

    return currentResource;
  };

  render() {
    const { filterIsShowing } = this.state;
    const { location, tableFilters, permisions } = this.props;

    return (
      <div className="paper small-shadow container-actions">
        {permisions.create &&
          (!this.match.params.subCategory &&
          this.getSubResources() &&
          this.getSubResources()[0] ? (
            <Dropdown
              className="button-create"
              overlay={
                <div className="list-create-buttons">
                  {this.getSubResources().map(
                    subResource =>
                      subResource.create && (
                        <NavLink
                          key={subResource.name}
                          to={`${location.pathname}/${subResource.name}/Створення`}
                        >
                          <Button type="primary" size="large">
                            {subResource.name}
                          </Button>
                        </NavLink>
                      )
                  )}
                </div>
              }
              trigger={["click"]}
            >
              <Button type="primary" size="large">
                Створити
              </Button>
            </Dropdown>
          ) : (
            <NavLink
              className="button-create"
              to={`${location.pathname}/Створення`}
            >
              <Button type="primary" size="large">
                Створити
              </Button>
            </NavLink>
          ))}

        <div className="button-margin">
          <Input.Search
            placeholder="Пошук..."
            size="large"
            enterButton
            onSearch={value => {
              this.props.onChange(null, value);
            }}
          />
        </div>

        <div
          className="close-filter"
          onClick={() => {
            this.setState({ filterIsShowing: !filterIsShowing });
            this.props.getFilterIsShowing(!filterIsShowing);
          }}
        >
          <Icon type={filterIsShowing ? "menu-unfold" : "menu-fold"} />
        </div>

        {tableFilters && <Filters onChange={this.props.onChange} />}
      </div>
    );
  }
}

const mapStateToProps = ({
  filters: { tableFilters, selectedFilters },
  table
}) => ({
  tableFilters,
  selectedFilters,
  table
});

const mapDispatchToProps = { setFilters, removeFilters };

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Actions);
