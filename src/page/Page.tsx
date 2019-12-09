import React from "react";
import {
  Page,
  Function,
  getNameWithCategory,
  StringKeyObject,
  Place
} from "@quick-qui/model-defines";
import { ModelWrapped } from "../Model";

import { FunctionList } from "../View/FunctionList";
import { FunctionEdit } from "../View/FunctionEdit";
import { FunctionCreate } from "../View/FunctionCreate";
import { FunctionCommand } from "../View/FunctionCommand";
import { IconCardView } from "../View/IconCardView";
import _ from "lodash";

export function getPage(page: Page, model: ModelWrapped, props: any) {
  const gride = +page.gride ?? 3;
  const gridStyle = {
    container: {
      display: "grid",
      "grid-template-columns": "auto ".repeat(gride).trim()
    },
    item: {
      marginTop: "2em"
    }
  };
  const functions = _(
    page.places
      ?.map((place: Place) => place.function)
      ?.map((functionName: string) =>
        model.functions.find((fun: Function) => functionName === fun.name)
      )
  )
    .compact()
    .toArray()
    .value();
  // const funName = page.places?.[0]?.function;
  // const fun = model.functionModel?.functions?.find(f => f.name === funName);
  if (functions?.length ?? 0 > 0) {
    return (
      <div style={gridStyle.container}>
        {functions.map(fun => {
          return getByFunction(fun, model, props);
        })}
      </div>
    );
  } else {
    return undefined;
  }
}
function getByFunction(fun: Function, model: ModelWrapped, props: any) {
  const baseFunction = fun.annotations?.["implementation"];
  if (baseFunction) {
    const { category, name } = getNameWithCategory(baseFunction);
    if (category === "provided") {
      const mapToType: StringKeyObject = {
        command: FunctionCommand,
        create: FunctionCreate,
        edit: FunctionEdit,
        list: FunctionList,
        iconCard: IconCardView
      };
      const type = mapToType[name];
      if (type) {
        return React.createElement(type, {
          key: fun.name,
          functionModel: fun,
          model,
          ...props
        });
      } else {
        throw new Error(`not supported function - ${name}`);
      }
    }
  }
  throw new Error(`not provided function`);
}
