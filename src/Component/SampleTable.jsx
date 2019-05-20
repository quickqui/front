import React from 'react'; // we need this to make JSX compile
import { Datagrid, ShowButton } from 'react-admin';
import { scalarField } from './ScalarField';
export const SimpleTable = props => {
    const { options, field } = props;
    const { model } = options;
    const relationType = model && model.types && model.types.find(ty => ty.name === field.typeRef.name);
    return (
        <Datagrid {...props}>
            {relationType.fields.map(f =>
                scalarField({ field: f, source: f.name, key: f.name, ...props })
            )}
            <ShowButton />
        </Datagrid>
    );
};
