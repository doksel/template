import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const UserRoleRoute = ({
  component: Component,
  user,
  userRole,
  resources,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (user && user.role === userRole) {
        return <Component {...props} resources={resources} />;
      }

      return <Redirect to="/" />;
    }}
  />
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(UserRoleRoute);
