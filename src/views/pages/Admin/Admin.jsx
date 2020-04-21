import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Route } from "react-router-dom";

import Header from "../../layout/Header/Header";
import Content from "../../layout/Content/Content";
import Footer from "../../layout/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

import Main from "../Main/Main";
import Form from "../../forms/Form/Form";
import TopTableFilter from "../../components/TopTableFilter/TopTableFilter";

import s from "./Admin.module.less";

const Admin = () => (
  <div className={s.content_wrap}>
    <Header />
    <Breadcrumb crumbs={[]} />

    <Content>
      <TopTableFilter />

      <Route path="/admin" exact render={() => <Main />} />

      <Route path="/admin/form/:type?/:id?" exact render={() => <Form />} />
    </Content>

    <Footer />
  </div>
);

const mapStateToProps = ({ formSteps }) => ({
  isLoadingFormSteps: formSteps.isLoading,
  formStepsList: formSteps.list
});

const enhance = compose(withRouter, connect(mapStateToProps));

export default enhance(Admin);
