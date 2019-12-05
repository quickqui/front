import React from "react";
import { Edit, SimpleForm } from "react-admin";

import { editingFields } from "./EditingFields";
import * as R from "ramda";
import { oc } from "ts-optchain";

import { FormPrefill } from "../Component/FormPrefill";

export const EditQuick = props => {
  const { options, resource } = props;
  const { model } = options;
  // const type = (model && model.types && model.types.find((ty) => ty.name === resource))
  const entity = oc(model.entities)([]).find(R.propEq("name", resource));
  return (
    <Edit {...props}>
      {
        //TODO 需要统一处理createdAt之类的系统字段，写死有点傻
      }
      <FormPrefill prefill={{ createdAt: undefined, updatedAt: undefined }}>
        <SimpleForm>{editingFields(entity, model)}</SimpleForm>
      </FormPrefill>
    </Edit>
  );
};
