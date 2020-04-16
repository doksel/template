import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

import "./NavBar.less";
import "../ProfileTool/ProfileTool.less";

const NavBar = ({ location, resources }) => {
  const [activeResource, setActiveResource] = useState(null);

  // Reset active link
  if (location.pathname.split("/").length === 2 && activeResource) {
    setActiveResource(null);
  }

  return (
    <div className="nav-bar">
      {Object.keys(resources).map(key => (
        <div
          key={key}
          className={`wrap-resource ${
            location.pathname.startsWith(
              `/${location.pathname.split("/")[1]}/${resources[key].name}`
            )
              ? "active"
              : ""
          }`}
        >
          <NavLink
            className="resource"
            to={`/${location.pathname.split("/")[1]}/${resources[key].name}`}
            activeClassName="active"
            onClick={() => setActiveResource(resources[key].name)}
          >
            <div className="main-resource">
              <span>{resources[key].name}</span>
            </div>
          </NavLink>

          <div className="sub-resources">
            {resources[key].subResources &&
              resources[key].subResources.map((subResource, index) => (
                <NavLink
                  key={index}
                  className="sub-resource"
                  to={`/${location.pathname.split("/")[1]}/${
                    resources[key].name
                  }/${subResource.name}`}
                  activeClassName="active-sub-resource"
                >
                  <span>{subResource.name}</span>
                </NavLink>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default withRouter(NavBar);
