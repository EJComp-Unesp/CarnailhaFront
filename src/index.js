import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "views/Login/Login.jsx";

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

function loggedIn() {
  if (window.localStorage.getItem("token") != null)
    return true
  else
    return false
}

function requireAuth(prop) {
  if (!loggedIn()) {
    hist.push(`/login`);
    hist.clea
    return <Redirect from={prop} to={`/login`}/>
  }
}

ReactDOM.render(
  <Router history={hist} >
    <Switch>
      <Route path={`/login`} component={Login} />
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} onEnter={requireAuth(prop.path)} />;
      })}

    </Switch>
  </Router >,
  document.getElementById("root")
);
