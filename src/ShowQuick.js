
import React from 'react';
import { TextField,Show,SimpleShowLayout} from 'react-admin'

export const ShowQuick = props => {
    const { options, resource } = props
    const { dataModel } = options
    const type = (dataModel && dataModel.types && dataModel.types.find((ty) => ty.name == resource))
    return <Show {...props}>
        <SimpleShowLayout>{
                type.fields.map(field => {
                  return   <TextField source={field.name} key={field.name} />
                }
                )
            }
        </SimpleShowLayout>
    </Show>
}