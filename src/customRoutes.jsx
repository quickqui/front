// in src/customRoutes.js
import React from "react";
import { Route } from "react-router-dom";

import Dashboard from "./View/Dashboard";
import {getControlAndView} from './page/Page'

export default function(model) {
  return [
    <Route
      exact
      path={"/"}
      key={"/"}
      render={props => <Dashboard model={model} {...props} />}
    />
  ]
    .concat(
      (model.pageModel?.pages ?? []).map(page => {
        return getRoute(page, model);
      })
    )
    .flat();
}
function getRoute(page, model) {
  return (
    <Route
      exact
      path={"/" + page.name}
      key={page.name}
      //TODO 从这里改成目前dashboard的逻辑。
      render={props => getControlAndView(page ,model, props)}
    />
  );
}
