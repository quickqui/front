import React from "react";
import {
  Page,
  getNameWithCategory,
  StringKeyObject
} from "@quick-qui/model-defines";
import { ModelWrapped } from "../Model";

import { FunctionList } from "../View/FunctionList";
import { FunctionEdit } from "../View/FunctionEdit";
import { FunctionCreate } from "../View/FunctionCreate";
import { FunctionCommand } from "../View/FunctionCommand";


export function getControlAndView(page: Page, model: ModelWrapped, props: any) {
  //TODO 先支持单function的page再说
  const funName = page.places?.[0]?.function;
  const fun = model.functionModel?.functions?.find(f => f.name === funName);
  if (fun) {
    const baseFunction = fun.annotations?.["implementation"];
    if (baseFunction) {
      const { category, name } = getNameWithCategory(baseFunction);
      if (category === "provided") {
        const mapToType: StringKeyObject = {
          command: FunctionCommand,
          create: FunctionCreate,
          edit: FunctionEdit,
          list: FunctionList
        };
        const type = mapToType[name];
        if (type) {
          return React.createElement(type, {
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
  } else {
    throw new Error(`no function find -${funName}`);
  }
}
