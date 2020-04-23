import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

import cm from "classnames";
import s from "./NavBar.module.less";

import { listNavBar } from "../../../helpers/values";

const NavBar = ({ location }) => {
  const [activeResource, setActiveResource] = useState(null);

  // Reset active link
  if (location.pathname.split("/").length === 2 && activeResource) {
    setActiveResource(null);
  }

  return (
    <div className={s.nav_bar}>
      {Object.keys(listNavBar).map(key => (
        <div
          key={key}
          className={cm(s.wrap_resource, {
            [s.active]: location.pathname.startsWith(
              `/${location.pathname.split("/")[1]}/${listNavBar[key].name}`
            )
          })}
        >
          <NavLink
            className={s.resource}
            to={`/${location.pathname.split("/")[1]}/${listNavBar[key].name}`}
            activeClassName={s.active}
            onClick={() => setActiveResource(listNavBar[key].name)}
          >
            <div className={s.main_resource}>
              <span>{listNavBar[key].name}</span>
            </div>
          </NavLink>

          <div className={s.sub_resources}>
            {listNavBar[key].subMenu &&
              listNavBar[key].subMenu.map((subItem, index) => (
                <NavLink
                  key={index}
                  className={s.sub_resource}
                  to={`/${location.pathname.split("/")[1]}/${
                    listNavBar[key].name
                  }/${subItem.name}`}
                  activeClassName={s.active_sub_resource}
                >
                  <span>{subItem.name}</span>
                </NavLink>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default withRouter(NavBar);
