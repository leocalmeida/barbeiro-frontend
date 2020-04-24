import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Principal from "./pages/Principal";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Agendamento from "./pages/Agendamento";
import Teste from "./pages/Teste";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Principal} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/agendamento/:providerID" component={Agendamento} />
        <Route path="/teste" component={Teste} />
      </Switch>
    </BrowserRouter>
  );
}
