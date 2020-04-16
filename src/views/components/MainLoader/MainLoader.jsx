import React from "react";

import "./MainLoader.less";

const MainLoader = ({ loading }) => (
  <div className={`main-loader ${loading ? "active" : ""}`}>
    <img src="/logo.svg" alt="mvaua" />

    <div className="line-loading"></div>
  </div>
);

export default MainLoader;
