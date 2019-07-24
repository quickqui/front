import React from 'react'; // we need this to make JSX compile
import { Datagrid, ShowButton } from 'react-admin';
import * as R from "ramda";
import * as oc from 'ts-optchain'
import { listingFields } from '../View/ListingFields';

export const SimpleTable = props => {
    const { options, property } = props;
    const { model } = options;
    // const relationType = model && model.types && model.types.find(ty => ty.name === field.typeRef.name);
    const relationPro = oc(model.entites)([]).find(R.propEq('name', property.relation.to))
    return (
        <Datagrid {...props}>
            {listingFields(relationPro,model)}
            <ShowButton />
        </Datagrid>
    );
};
