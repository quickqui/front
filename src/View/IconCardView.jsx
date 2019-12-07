import React from "react";
import { ListController } from "react-admin";

import IconCard from "../Component/IconCard";

export const IconCardView = props => {
    console.log(props);
  const { resource } = props;
  const location = { pathname: resource };
  const basePath = "/" + resource;
  return (
    <ListController
      location={location}
      basePath={basePath}
      resource={resource}
      {...props}
    >
      {controllerProps => (
        <IconCard
          icon={props.icon}
          value={controllerProps.total}
          {...props}
          {...controllerProps}
        />
      )}
    </ListController>
  );
};
