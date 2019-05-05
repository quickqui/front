import React from 'react';
import { List, Datagrid, ReferenceField, TextField ,ShowButton,EditButton} from 'react-admin';

export const ListQuick = (props) => {
    const { options, resource } = props
    const { dataModel } = options
    const type = (dataModel && dataModel.types && dataModel.types.find((ty) => ty.name == resource))
    return <List {...props}>
        <Datagrid>
            {
                type.fields.map(field => {
                    return <TextField source={field.name} key={field.name} />
                }
                )
            }
            <ShowButton/>
            <EditButton/>
        </Datagrid>
    </List>
}
    ;
