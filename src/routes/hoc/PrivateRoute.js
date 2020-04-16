import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, user, resources, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (user) {
        return <Component {...props} resources={resources} />;
      }

      return <Redirect to="/" />;
    }}
  />
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
