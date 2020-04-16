import React from "react";
import LogIn from "../../forms/LogIn/LogIn";

import "./Auth.less";

const Auth = () => (
  <div className="background">
    <div className="wrap-login-form">
      <LogIn />
    </div>

    <span className="version">v. {process.env.REACT_APP_VERSION}</span>
  </div>
);

export default Auth;
