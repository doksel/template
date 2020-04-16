import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Route } from "react-router-dom";

import Header from "../../layout/Header/Header";
import Content from "../../layout/Content/Content";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

import Main from "../Main/Main";
import Form from "../Form/Form";
import TopTableFilter from "../../components/TopTableFilter/TopTableFilter";

import s from "./Admin.less";

const Admin = ({ location }) => (
  <>
    <Header />
    <Breadcrumb crumbs={[]} />

    <Content>
      <TopTableFilter />

      <Route path="/admin" exact render={() => <Main />} />

      <Route path="/form" exact render={() => <Form />} />

      {/* {Object.keys(resources).map(key => (
          <>
            <Route
              path={`/${location.pathname.split("/")[1]}/${
                resources[key].name
              }`}
              exact
              component={resources[key].list}
            />

            <Route
              path={`/${location.pathname.split("/")[1]}/${
                resources[key].name
              }/Створення`}
              exact
              component={resources[key].create}
            />

            <Route
              path={`/${location.pathname.split("/")[1]}/${
                resources[key].name
              }/Редагування`}
              exact
              component={resources[key].edit}
            />

            <Route
              path={`/${location.pathname.split("/")[1]}/${
                resources[key].name
              }/Перегляд`}
              exact
              component={resources[key].review}
            />
          </>
        ))} */}
    </Content>
  </>
);

const mapStateToProps = ({ formSteps }) => ({
  isLoadingFormSteps: formSteps.isLoading,
  formStepsList: formSteps.list
});

const enhance = compose(withRouter, connect(mapStateToProps));

export default enhance(Admin);
