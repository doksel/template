import React from "react";
import { connect } from "react-redux";

import { hideSider } from "../../../state/ducks/sider/actions";

import "./Sider.less";

const Sider = ({ hideSider, sider }) => (
  <>
    <div className={`sider ${sider}`} onClick={hideSider}>
      SideBar
    </div>
  </>
);

const mapStateToProps = ({ user, sider }) => ({ user, sider });

const mapDispatchToProps = { hideSider };

export default connect(mapStateToProps, mapDispatchToProps)(Sider);
