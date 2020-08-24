import React, {  } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import TvView from "./views/TvView";
import "./App.scss";

export default function App() {

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={TvView} />
      </Switch>
    </HashRouter>
  );
}
