import React from "react";
import LogIn from "../../forms/LogIn/LogIn";

import s from "./Auth.module.less";

const Auth = () => (
  <div className={s.background}>
    <div className={s.wrapForm}>
      <LogIn />
    </div>
  </div>
);

export default Auth;
