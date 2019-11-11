import React from "react";
import { Create, SimpleForm } from "react-admin";

import * as R from "ramda";
import { oc } from "ts-optchain";

import { editingFields } from "./EditingFields";

export const CreateQuick = props => {
  const { options, resource } = props;
  const { model } = options;
  // const type = (model && model.types && model.types.find((ty) => ty.name === resource))
  const entity = oc(model)
    .domainModel.entities([])
    .find(R.propEq("name", resource));

  return (
    <Create {...props}>
      <SimpleForm>{editingFields(entity, model)}</SimpleForm>
    </Create>
  );
};
