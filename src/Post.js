import React from 'react';
import { List, Datagrid, ReferenceField, TextField } from 'react-admin';

export const PostList = (props) => {
    console.log(props)
    return <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="content" />
            <ReferenceField label="Author" source="author.id" reference="User" linkType="show">
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    </List>
}
    ;
