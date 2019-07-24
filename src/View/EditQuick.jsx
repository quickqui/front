
import React from 'react';
import {
    Edit, SimpleForm} from 'react-admin';

import {editingFields} from './EditingFields'
import * as R from "ramda";
import * as oc from 'ts-optchain'



export const EditQuick = props => {
    const { options, resource } = props
    const { model } = options
    // const type = (model && model.types && model.types.find((ty) => ty.name === resource))
    const entity = oc(model.entites)([]).find(R.propEq('name', resource))
    return <Edit {...props}>
        <SimpleForm>{
            editingFields(entity,model)
        }
        </SimpleForm>
    </Edit>
}