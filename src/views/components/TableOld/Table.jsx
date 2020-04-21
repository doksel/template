import React, { Component } from "react";
import { Row, Col, Table as MainTable } from "antd";
import Column from "antd/lib/table/Column";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import Actions from "./Actions/Actions";

import {
  setFilters,
  removeFilters
} from "../../../state/ducks/filters/actions";
import {
  getDataTable,
  destroyTable,
  updateDataTable,
  setLastQueryParamsTable
} from "../../../state/ducks/table/actions";

import { getNameOfTypeReference } from "../../../helpers/table";
import "./Table.less";

class Table extends Component {
  state = {
    filterIsShowing: false,
    current: 1,
    searchValue: "",
    sorter: {},
    filterParams: {},
    pagination: {
      pageSize: 10,
      current: 1
    }
  };

  componentDidMount() {
    this.initTable();
  }

  componentWillUnmount() {
    this.destroyTable();
  }

  initTable = () => {
    const {
      filters,
      setFilters,
      getReq,
      getDataTable,
      params,
      setLastQueryParamsTable,
      reference
    } = this.props;

    const defaultOffset = 10;
    const startPage = 1;
    const defaultSort = "registeredAt";
    const defaultDirection = "desc";

    let queryParams = {
      [params.offset]: defaultOffset,
      [params.page]: startPage,
      [params.sort]: defaultSort,
      [params.order]: defaultDirection
    };

    if (reference) {
      queryParams[params.page] = undefined;
      queryParams[params.sort] = undefined;
      queryParams[params.order] = "registeredAt,desc";
    }

    setLastQueryParamsTable(queryParams, getReq);
    getDataTable(getReq, queryParams);
    setFilters(filters);
  };

  destroyTable = () => {
    const { removeFilters, destroyTable } = this.props;

    removeFilters();
    destroyTable();
  };

  onSortOrPaginate = (pagination, f, sorter) => {
    this.setState({ pagination, sorter }, () => this.onChange());
  };

  compileFiltersForParams = (filters, callback) => {
    let filterParams = {};

    filters.forEach(filter => {
      if (!filterParams[filter.column]) {
        filterParams[filter.column] = [];
      }
      filterParams[filter.column].push(filter.value);
    });

    this.setState({ filterParams });

    callback(filterParams);
  };

  onSearch = (value, callback) => {
    this.setState({ searchValue: value });

    callback(value);
  };

  onChange = (filters, search) => {
    const {
      getReq,
      params,
      updateDataTable,
      setLastQueryParamsTable,
      reference
    } = this.props;
    let { pagination, sorter, filterParams, searchValue } = this.state;
    let from;
    let to;

    if (filters) {
      this.compileFiltersForParams(filters, values => {
        filterParams = values;
        pagination.current = 1;
      });

      const rangeDate = filters.filter(
        filter => filter.type === "rangeDate"
      )[0];

      if (rangeDate) {
        from = rangeDate.valueInFilter[0];
        to = rangeDate.valueInFilter[1];
      }
    }

    search !== undefined &&
      this.onSearch(search, value => {
        searchValue = value;
      });

    this.setState({ current: pagination.current });

    let queryParams = {
      [params.offset]: pagination.pageSize,
      [params.page]: pagination.current,
      [params.order]:
        sorter.order && (sorter.order === "ascend" ? "asc" : "desc"),
      [params.sort]: sorter.order && sorter.field,
      [params.search]: searchValue ? searchValue : undefined,
      [params.periodFrom]: from,
      [params.periodTo]: to,
      ...filterParams
    };

    if (reference) {
      queryParams = {
        [params.offset]: pagination.pageSize,
        [params.page]: (pagination.current - 1) * pagination.pageSize,
        [params.order]:
          sorter.order && sorter.field && sorter.order === "ascend"
            ? `${sorter.field},asc`
            : sorter.order && sorter.field && sorter.order === "descend"
            ? `${sorter.field},desc`
            : "registeredAt,desc",
        [params.search]: searchValue ? searchValue : undefined,
        [params.registeredAtRange]: from && to && `["${from}","${to}"]`,
        ...filterParams
      };
    }

    setLastQueryParamsTable(queryParams, getReq);

    updateDataTable(getReq, queryParams);
  };

  render() {
    const { filterIsShowing, current, pagination } = this.state;

    const {
      children,
      location,
      history,
      chckboxes,
      table,
      permisions,
      main,
      withIndexing
    } = this.props;

    return (
      <>
        <div className="wrap-table">
          <Row gutter={20}>
            <Col
              span={19}
              xl={19}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              className="left-side"
            >
              <div className="paper small-shadow">
                <MainTable
                  loading={table.loading}
                  rowKey={record => record.id}
                  rowSelection={
                    chckboxes
                      ? {
                          onSelect: (record, selected, selectedRows) => {
                            this.setState({ selectedRows });
                          },
                          onSelectAll: (selected, selectedRows) => {
                            this.setState({ selectedRows });
                          }
                        }
                      : null
                  }
                  pagination={{
                    total: table.meta.items_count,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "15"],
                    locale: { items_per_page: "" },
                    showTotal: total => `Кількість заяв: ${total}`,
                    current
                  }}
                  dataSource={table.data}
                  onRow={(record, rowIndex) => ({
                    onClick: e => {
                      const pathRecordType = getNameOfTypeReference(
                        record.serviceId
                      );

                      if (e.target.classList.contains("action")) {
                        e.preventDefault();
                      } else if (main) {
                        history.push(
                          `${location.pathname}/${pathRecordType}/Перегляд?id=${record.id}`
                        );
                      } else {
                        history.push(
                          `${location.pathname}/Перегляд?id=${record.id}`
                        );
                      }
                    }
                  })}
                  onChange={this.onSortOrPaginate}
                >
                  {withIndexing && (
                    <Column
                      width="5%"
                      title="№"
                      render={(text, record, index) => {
                        return (
                          (pagination.current - 1) * pagination.pageSize +
                          index +
                          1
                        );
                      }}
                      key="index"
                    />
                  )}

                  {children}
                </MainTable>
              </div>
            </Col>

            <Col
              span={5}
              xl={5}
              lg={0}
              md={0}
              sm={0}
              xs={0}
              className={`right-side ${
                filterIsShowing ? "filters-open-tablet" : ""
              }`}
            >
              <Actions
                onChange={this.onChange}
                permisions={permisions}
                getFilterIsShowing={filterIsShowing =>
                  this.setState({ filterIsShowing })
                }
              />
            </Col>
          </Row>
        </div>
      </>
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

const mapDispatchToProps = {
  setFilters,
  removeFilters,
  getDataTable,
  destroyTable,
  updateDataTable,
  setLastQueryParamsTable
};

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Table);
