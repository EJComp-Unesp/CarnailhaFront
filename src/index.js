import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "views/Login/Login.jsx";
import Auth from "./services/auth.js";

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

function loggedIn() {
  Auth.data = {
    client_id: "carnailhaWeb",
    client_secret: "carnaweb",
    grant_type: "refresh_token",
    refresh_token: window.localStorage.getItem("refreshToken"),
  }

  let response = Auth.post(Auth.data);

  response.then((result) => {
    if (result.statusCode == 400) {
      return false;
    } else {
      return true;
    }
  });
}

function requireAuth() {
  if (!loggedIn() ) {
    hist.push(`/login`);
    hist.clear
    return <Redirect to={`/login`} />
  }
}

hist.listen((location, action) => {
  console.log(`The current URL is ${location.pathname}`)
  console.log(`The last navigation action was ${action}`)
  if (location.pathname != "/login" && window.localStorage.getItem("token") == null) {
    requireAuth()
  }
})

ReactDOM.render(
  <Router history={hist} >
    <Switch>
      <Route path={`/login`} component={Login} />
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} onEnter={requireAuth()} />;
      })}

    </Switch>
  </Router >,
  document.getElementById("root")
);
