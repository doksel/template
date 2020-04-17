import React from "react";

import s from "./Content.module.less";

const Content = ({ children }) => <div className={s.content}>{children}</div>;

export default Content;
