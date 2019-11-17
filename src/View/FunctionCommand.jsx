import React from "react";
import { Create, SimpleForm } from "react-admin";
import { FormPrefill } from "../Component/FormPrefill";

import { editingFieldsForCommand } from "./EditingFields";
import * as R from "ramda";
import { oc } from "ts-optchain";

export const FunctionCommand = props => {
  const { functionModel, model } = props;
  const resource = functionModel.resource;
  const basePath = "/" + resource;
  const redirectFunction = functionModel.redirect
    ? model.functionModel.functions.find(f => f.name === functionModel.redirect)
    : undefined;

  function copyArgsToPrefill() {
    const prefills = functionModel.prefill;
    //TODO 表达式支持。
    //包裹在${}中的，再进行表达式计算
    const re = { ...prefills };
    return re;
  }
  return (
    <Create basePath={basePath} resource={resource} {...props}>
      <FormPrefill
        prefill={{
          ...copyArgsToPrefill()
        }}
      >
        {
          //TODO bug？ redirect之后没有刷新。至少是realtime 自动刷新没有起作用。
        }
        <SimpleForm
          redirect={redirectFunction ? "/" + redirectFunction.name : false}
        >
          {editingFieldsForCommand(functionModel, model)}
        </SimpleForm>
      </FormPrefill>
    </Create>
  );
};
