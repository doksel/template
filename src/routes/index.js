import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import DefaultRoute from "./default";
import GuestRoute from "./hoc/GuestRoute";
import PrivateRoute from "./hoc/PrivateRoute";

import LoaderLineBar from "../views/components/LoaderLineBar/LoaderLineBar";
import ConfirmModal from "../views/components/ConfirmModal/ConfirmModal";
import { message } from "../helpers/notifications";

import Auth from "../views/pages/Auth/Auth";
import Admin from "../views/pages/Admin/Admin";

import { me, setMe } from "../state/ducks/user/actions";

const token = localStorage.getItem("token");

const App = ({ user, me, setMe }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      getMe();
    }
  }, [user]);

  const getMe = async () => {
    if (token) {
      await me()
        .then(() => {
          message.success("Ви успішно увійшли у систему");
        })
        .catch(() => {
          localStorage.removeItem("token");
          message.error();
        });
    }

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <LoaderLineBar />

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

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = { me, setMe };

export default connect(mapStateToProps, mapDispatchToProps)(App);
