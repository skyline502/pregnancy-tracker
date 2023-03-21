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
  const period_year = user?.last_period.slice(4);
  const period_month = user?.last_period.slice(0, 2);
  const period_day = user?.last_period.slice(2, 4);
  const period = new Date(period_year, period_month - 1, period_day);
  console.log(today, "today date");
  console.log(period, "last period");

  const ms = today - period;
  const seconds = ms / 1000;
  const min = seconds / 60;
  const hours = min / 60;
  const days = hours / 24;
  const weeks = Math.trunc(days / 7);
  // console.log(ms, 'how many ms')
  // console.log(seconds, 'how many seconds')
  // console.log(min, 'how many minutes')
  // console.log(hours, 'how many hours')
  // console.log(days, 'how many days')
  // console.log(weeks, 'how many weeks')
  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const week = {
    4: "Your baby is about the size of a Poppy Seed",
    5: "Your baby is about the size of a Apple Seed",
    6: "Your baby is about the size of a Sweet Pea",
    7: "Your baby is about the size of a Blueberry",
    8: "Your baby is about the size of a Rasberry",
    9: "Your baby is about the size of a Green Olive",
    10: "Your baby is about the size of a Kumquat",
    11: "Your baby is about the size of a Lime",
    12: "Your baby is about the size of a Plum",
    13: "Your baby is about the size of a Lemon",
    14: "Your baby is about the size of a Nectarine",
    15: "Your baby is about the size of a Apple",
    16: "Your baby is about the size of a Avocado",
    17: "Your baby is about the size of a Pear",
    18: "Your baby is about the size of a Bell Pepper",
    19: "Your baby is about the size of a Heirloom Tomato",
    20: "Your baby is about the size of a Artichoke",
    21: "Your baby is as long as a Carrot!",
    22: "Your baby is about the size of a Papaya!",
    23: "Your baby is about the size of a Grapefruit!",
    24: "Your baby is about the size of a Ear of Corn",
    25: "Your baby is about the size of a Rutabaga",
    26: "Your baby is about the size of a Lettuce",
    27: "Your baby is about the size of a Cauliflower",
    28: 'Your baby is about the size of a Eggplant',
    29: 'Your baby is about the size of a Acorn Squash',
    30: 'Your baby is about the size of a Cabbage',
    31: 'Your baby is about the size of a Coconut',
    32: 'Your baby is about the size of a Jicama',
    33: 'Your baby is about the size of a Pineapple',
    34: 'Your baby is about the size of a Butternut Squash',
    35: 'Your baby is about the size of a Honeydew',
    36: 'Your baby is about the size of a Swiss Chard',
    37: 'Your baby is about the size of a Winter Melon',
    38: 'Your baby is about the size of a Rhubarb',
    39: 'Your baby is about the size of a Yardlong Beans',
    40: 'Your baby is about the size of a Pumpkin',
    41: 'Your baby is about the size of a Watermelon',
    42: 'Your baby is about the size of a Jackfruit',
  };

  const dueDate = today.setDate(today.getDate() + Math.trunc(280 - days));

  console.log(dueDate, "duedate....");
  console.log(
    today.getMonth() + 1,
    today.getDate(),
    today.getFullYear(),
    "today date..."
  );

  const due = `${
    months[today.getMonth() + 1]
  } ${today.getDate()}, ${today.getFullYear()}`;

  console.log(due, "due.....");

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
              <h2 className="font-weight-light text-dark bg-light">
                Week {weeks} Day {Math.floor(days % 7)}
              </h2>
              <p className="font-weight-strong text-light bg-danger mx-2">{week[weeks]}</p>
              <h2 className="font-weight-strong text-info">Due Date: {due}</h2>
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
