// in src/customRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import { FunctionList } from "./View/FunctionList";
import { FunctionEdit } from "./View/FunctionEdit";
import { FunctionCreate } from "./View/FunctionCreate";
import Dashboard from "./View/Dashboard";

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
      model.functionModel.functions.map(fun => {
        const base = fun.base;
        if (base.function === "list") {
          return (
            <Route
              exact
              path={"/" + fun.name}
              key={fun.name}
              render={props => (
                <FunctionList functionModel={fun} model={model} {...props} />
              )}
            />
          );
        }
        if (base.function === "edit") {
          return (
            <Route
              exact
              path={"/" + fun.name}
              key={fun.name}
              render={props => (
                <FunctionEdit functionModel={fun} model={model} {...props} />
              )}
            />
          );
        }
        if (base.function === "create") {
          return (
            <Route
              exact
              path={"/" + fun.name}
              key={fun.name}
              render={props => (
                <FunctionCreate functionModel={fun} model={model} {...props} />
              )}
            />
          );
        }
        if (base.function === "iconCard") return [];
        throw new Error(`not supported function - ${base.function}`);
      })
    )
    .flat();
}
