import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Users from "./pages/users";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/users/create" component={Users} />
      <Route path="/users/edit/:id" component={Users} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
