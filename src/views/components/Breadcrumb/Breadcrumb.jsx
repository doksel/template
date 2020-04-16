import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import s from "./Breadcrumb.less";

const Breadcrumb = ({ crumbs, history }) => (
  <div className={s.breadcrumb}>
    <Link to="/">
      <span>Головна</span>
    </Link>

    {crumbs && crumbs[0] && <span className={s.slash}>/</span>}

    {crumbs.map((crumb, index) => (
      <Fragment key={index}>
        {history.location.pathname === crumb.to ? (
          <span>{crumb.name}</span>
        ) : (
          <Link to="/">
            <span>{crumb.name}</span>
          </Link>
        )}

        {crumbs.length - 1 !== index && <span className={s.slash}>/</span>}
      </Fragment>
    ))}
  </div>
);

export default withRouter(Breadcrumb);
