import React from "react";
import { List, Datagrid, ShowButton, EditButton } from "react-admin";
import { listingFields } from "./ListingFields";

import * as R from "ramda";

export const ListQuick = props => {
  const { options, resource } = props;
  const { model } = options;
  console.log(model);
  const entity = model.entities.find(R.propEq("name", resource));

  return (
    <List {...props}>
      <Datagrid>
        {listingFields(entity, model)}
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};
