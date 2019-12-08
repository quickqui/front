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
      (model.pageModel?.pages ?? []).map(page => {
        return getRoute(page, model);

        //NOTE 凡是有可能有menupath的都有route
        //TODO menupath改成page的属性，function的menupath只是一个快捷。
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
      render={props => getControlAndView(page ,model, props)}
    />
  );
}
function getControlAndView(page, model, props) {
  //TODO 先支持单function的page再说
  const funName = page.places?.[0]?.function;
  const fun = model.functionModel?.functions?.find(f => f.name === funName);
  if (fun) {
    const baseFunction = fun.annotations?.["implementation"];
    if (baseFunction) {
      const { category, name } = getNameWithCategory(baseFunction);
      if (category === "provided") {
        switch (name) {
          case "command":
            return (
              <FunctionCommand functionModel={fun} model={model} {...props} />
            );
          case "create":
            return (
              <FunctionCreate functionModel={fun} model={model} {...props} />
            );
          case "edit":
            return (
              <FunctionEdit functionModel={fun} model={model} {...props} />
            );
          case "list":
            return (
              <FunctionList functionModel={fun} model={model} {...props} />
            );
          default:
            throw new Error(`not supported function - ${name}`);
        }
      }
    }
    throw new Error(`not provided function`);
  } else {
    throw new Error(`no function find -${funName}`);
  }
}
