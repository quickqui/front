// in src/customRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import { FunctionList } from "./View/FunctionList";
import { FunctionEdit } from "./View/FunctionEdit";
import { FunctionCreate } from "./View/FunctionCreate";
import Dashboard from "./View/Dashboard";
import { getNameWithCategory } from "@quick-qui/model-defines";
import { FunctionCommand } from "./View/FunctionCommand";

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
      model.functionModel.functions
        .filter(fun => fun.abstract === false)
        .map(fun => {
          const baseFunction =
            fun.annotations && fun.annotations.implementation;
          if (baseFunction) {
            const { category, name } = getNameWithCategory(baseFunction);
            if (category === "provided") {
              if (name === "list") {
                return (
                  <Route
                    exact
                    path={"/" + fun.name}
                    key={fun.name}
                    render={props => (
                      <FunctionList
                        functionModel={fun}
                        model={model}
                        {...props}
                      />
                    )}
                  />
                );
              }
              if (name === "edit") {
                return (
                  <Route
                    exact
                    path={"/" + fun.name}
                    key={fun.name}
                    render={props => (
                      <FunctionEdit
                        functionModel={fun}
                        model={model}
                        {...props}
                      />
                    )}
                  />
                );
              }
              if (name === "create") {
                return (
                  <Route
                    exact
                    path={"/" + fun.name}
                    key={fun.name}
                    render={props => (
                      <FunctionCreate
                        functionModel={fun}
                        model={model}
                        {...props}
                      />
                    )}
                  />
                );
              }
              //NOTE 凡是有可能有menupath的都有route
              //TODO menupath改成page的属性，function的menupath只是一个快捷。
              if (name === "command") {
                return (
                  <Route
                    exact
                    path={"/" + fun.name}
                    key={fun.name}
                    render={props => (
                      <FunctionCommand
                        functionModel={fun}
                        model={model}
                        {...props}
                      />
                    )}
                  />
                );
              }
              if (name === "iconCard") return [];
            }
          }
          throw new Error(`not supported function - ${baseFunction}`);
        })
    )
    .flat();
}
