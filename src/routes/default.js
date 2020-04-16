import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const DefaultRoute = ({ user }) => {
  let path;

  if (user) {
    path = "admin";
  } else {
    path = "login";
  }

  return <Redirect to={path} />;
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(DefaultRoute);
