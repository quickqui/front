import React from "react";
import { Edit, SimpleForm } from "react-admin";
import { FormPrefill } from "../Component/FormPrefill";

import { editingFields } from "./EditingFields";
import * as R from "ramda";
import { withoutAbstract } from "@quick-qui/model-defines";
import ContinuousEditingForm from './ContinuousEditingForm'

export const FunctionContinuousEdit = (props) => {
  const { functionModel, model, presentation } = props;
  const resource = functionModel.resource;
  const basePath = "/" + resource;
  const entity = (model.entities ?? []).find(R.propEq("name", resource));
  const redirectFunction = functionModel.redirect
    ? withoutAbstract(model.functionModel.functions).find(
        (f) => f.name === functionModel.redirect
      )
    : undefined;
  const id = props.location?.state?.id ?? functionModel.parameters?.["id"];
  function copyArgsToPrefill() {
    const prefill = functionModel.command?.prefill ?? {};
    const re = { ...prefill };
    // console.log(re);
    return re;
  }
  return (
    <Edit basePath={basePath} resource={resource} id={id} {...props}>
      <FormPrefill
        prefill={{
          ...copyArgsToPrefill(),
          createdAt: undefined,
          updatedAt: undefined,
        }}
      >
        <ContinuousEditingForm
          changingSource={functionModel.parameters?.["changingSource"]}
        >
          {editingFields(entity, model, presentation)}
        </ContinuousEditingForm>
      </FormPrefill>
    </Edit>
  );
};
