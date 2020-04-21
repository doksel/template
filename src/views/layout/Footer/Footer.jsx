import React from "react";
import { withRouter } from "react-router-dom";

import s from "./Footer.module.less";

const Header = ({ location }) => {
  const titles = location.pathname.split("/");
  return (
    <div className={s.footer}>
      <h1>
        Footer : {titles.length === 2 ? "Main page" : titles[titles.length - 1]}
      </h1>
    </div>
  );
};

export default withRouter(Header);
