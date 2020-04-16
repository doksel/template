import React from "react";
import { withRouter } from "react-router-dom";

import s from "./Header.less";

const Header = ({ location }) => {
  const titles = location.pathname.split("/");
  console.log(s);

  return (
    <div className={s.header}>
      <h1>
        Header :{" "}
        {titles.length === 2 ? "Головна Сторінка" : titles[titles.length - 1]}
      </h1>
    </div>
  );
};

export default withRouter(Header);
