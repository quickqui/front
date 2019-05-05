
import React from 'react';
import { Edit, SimpleForm, TextInput, TextField } from 'react-admin'

export const EditQuick = props => {
    const { options, resource } = props
    const { dataModel } = options
    const type = (dataModel && dataModel.types && dataModel.types.find((ty) => ty.name == resource))
    return <Edit {...props}>
        <SimpleForm>{
            type.fields.map(field => {
                if (field.flags.includes("id") || field.flags.includes("relation")) {
                    return <TextField source={field.name} key={field.name} />
                }
                return <TextInput source={field.name} key={field.name} />
            })
        }
        </SimpleForm>
    </Edit>
}