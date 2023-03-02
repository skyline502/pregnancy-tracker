import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import Modal from "./components/modal/modal";
import LoginForm from "./components/auth/LoginForm";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Modal />
      <Switch>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          {user ? (
            <div className="container-fluid m-2 mx-auto text-warning">
              <h1>Your Pregnancy Tracker</h1>
            </div>
          ) : (
            <div className="container text-warning justify-content-around p-2">
              <h1>Please Login</h1>
              <LoginForm />
            </div>
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
