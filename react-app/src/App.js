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
  const today = new Date();
  const period_year = user?.last_period.slice(4)
  const period_month = user?.last_period.slice(0,2);
  const period_day = user?.last_period.slice(2,4);
  const period = new Date(period_year, period_month - 1, period_day);
  console.log(today, 'today date')
  console.log(period, 'last period')

  const ms = today - period;
  const seconds = ms/1000;
  const min = seconds/60
  const hours = min / 60
  const days = hours/24;
  const weeks = Math.trunc(days/7);
  console.log(ms, 'how many ms')
  console.log(seconds, 'how many seconds')
  console.log(min, 'how many minutes')
  console.log(hours, 'how many hours')
  console.log(days, 'how many days')
  console.log(weeks, 'how many weeks')

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
              <h1 className="font-weight-light">Welcome back {user?.username}</h1>
              <h2 className="font-weight-light text-dark bg-light">Week {weeks} Day {Math.floor(days % 7)}</h2>
            </div>
          ) : (
            <div className="container text-warning justify-content-around p-2">
              <h1 className="text-center">
                Returning Mom?
                <small className="text-muted"> Please Log in!</small>
              </h1>
              <LoginForm />
            </div>
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
