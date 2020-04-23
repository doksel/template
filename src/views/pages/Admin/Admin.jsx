import React from "react";
import { withRouter, Route } from "react-router-dom";

import Header from "../../layout/Header/Header";
import Content from "../../layout/Content/Content";
import Footer from "../../layout/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

import Main from "../Main/Main";
import Form from "../../forms/Form/Form";

import s from "./Admin.module.less";

const Admin = () => (
  <div className={s.content_wrap}>
    <Header />
    <Breadcrumb crumbs={[]} />

    <Content>
      <Route path="/admin" exact render={() => <Main />} />

      <Route path="/admin/form/:type?/:id?" exact render={() => <Form />} />
    </Content>

    <Footer />
  </div>
);

export default withRouter(Admin);
