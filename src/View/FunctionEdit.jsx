import React from "react";
import { Edit, SimpleForm } from "react-admin";
import { FormPrefill } from "../Component/FormPrefill";

import { editingFields } from "./EditingFields";
import * as R from "ramda";

export const FunctionEdit = props => {
  const { functionModel, model } = props;
  const resource = functionModel.resource;
  const basePath = "/" + resource;
  const entity = (model.entities??[]).find(R.propEq("name", resource));
  const redirectFunction = functionModel.redirect
    ? model.functionModel.functions.find(f => f.name === functionModel.redirect)
    : undefined;

  function copyArgsToPrefill() {
    const prefill = functionModel.command.prefill;
    //TODO 表达式支持。
    //包裹在${}中的，再进行表达式计算
    const re = { ...prefill };
    console.log(re);
    return re;
  }
  return (
    <Edit
      basePath={basePath}
      resource={resource}
      id={props.location.state.id}
      {...props}
    >
      <FormPrefill
        prefill={{
          ...copyArgsToPrefill(),
          createdAt: undefined,
          updatedAt: undefined
        }}
      >
        <SimpleForm
          redirect={redirectFunction ? "/" + redirectFunction.name : "list"}
        >
          {editingFields(entity, model)}
        </SimpleForm>
      </FormPrefill>
    </Edit>
  );
};
