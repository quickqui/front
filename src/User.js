import React from 'react';
import { List, Datagrid, ChipField, ReferenceManyField, SingleFieldList, TextField } from 'react-admin';

export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name"  />
            <ReferenceManyField label="Posts" reference="Post" target="author" linkType="show">
                <SingleFieldList>
                    <ChipField source="title" linkType="show"/>
                </SingleFieldList>
            </ReferenceManyField>
        </Datagrid>
    </List>
);