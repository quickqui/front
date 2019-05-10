import React from 'react'; // we need this to make JSX compile
import { TextField, Datagrid, ShowButton } from 'react-admin'
import { scalarField } from './ScalarField';

export const SimpleTable = (props) => {
    const { options, field } = props
    const { dataModel } = options
    const relationType = (dataModel && dataModel.types && dataModel.types.find((ty) => ty.name === field.typeName.name))
    return <Datagrid {...props}>{
        relationType.fields.map((f) => scalarField({ field:f, source: f.name, key: f.name, ...props }))
    }
        <ShowButton />
    </Datagrid>
}