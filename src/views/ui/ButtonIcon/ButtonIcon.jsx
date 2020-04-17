import React from "react";

import s from "./ButtonIcon.module.less";

const ButtonIcon = ({ icon, children, disabled, onClick }) => (
  <button
    className={s.buttonIcon}
    onClick={e => {
      e.preventDefault();
      onClick && onClick(e);
    }}
    disabled={disabled}
  >
    <img className={s.icon} src={icon} alt="icon"></img>
    {children}
    <input type="file" hidden />
  </button>
);

export default ButtonIcon;
