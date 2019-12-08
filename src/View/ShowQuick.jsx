import React from "react";
import { Show, SimpleShowLayout } from "react-admin";
import { showingFields } from "./ShowingFields";

import * as R from "ramda";

export const ShowQuick = props => {
  const { options, resource } = props;
  const { model } = options;
  const entity = (model.entities??[]).find(R.propEq("name", resource));
  return (
    <Show {...props}>
      <SimpleShowLayout>{showingFields(entity, model)}</SimpleShowLayout>
    </Show>
  );
};
