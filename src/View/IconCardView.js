import React from 'react';
import { ListController } from 'react-admin';

import * as R from "ramda";
import IconCard from '../Component/IconCard';

export const IconCardView = (props) => {
    const { options, resource } = props
    const location = { pathname: resource }
    const basePath = "/" + resource
    return <ListController location={location} basePath={basePath} resource={resource}
        // filter={filter}
        // sort={sort}
        {...props}>
        {controllerProps => <IconCard value={controllerProps.total} {...props} {...controllerProps} />}
    </ListController>
}
    ;
