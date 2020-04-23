import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import DefaultRoute from "./default";
import GuestRoute from "./hoc/GuestRoute";
import PrivateRoute from "./hoc/PrivateRoute";

import MainLoader from "../views/components/MainLoader/MainLoader";
import ConfirmModal from "../views/components/ConfirmModal/ConfirmModal";

import Auth from "../views/pages/Auth/Auth";
import Admin from "../views/pages/Admin/Admin";

import { me } from "../state/ducks/user/actions";

const token = localStorage.getItem("token");

const App = ({ user, me, isLoad }) => {
  useEffect(() => {
    token && me();
  }, []);

  useEffect(() => {
    !user && token && me();
  }, [user, me]);

  return (
    <>
      {isLoad ? (
        <MainLoader loading={isLoad} />
      ) : (
        <>
          <ConfirmModal />

          <Switch>
            <Route path="/" exact component={DefaultRoute} />

            <GuestRoute path="/login" exact component={Auth} />

            <PrivateRoute
              path="/admin/:category?/:id?"
              exact
              component={Admin}
            />
          </Switch>
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ user, loader: { isLoad } }) => ({ user, isLoad });

const mapDispatchToProps = { me };

export default connect(mapStateToProps, mapDispatchToProps)(App);
