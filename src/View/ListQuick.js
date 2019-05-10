import React from 'react';
import { List, Datagrid, ReferenceField, TextField, ShowButton, EditButton, ReferenceArrayField, SingleFieldList, ChipField, ArrayField, FunctionField } from 'react-admin';
import { scalarField } from '../Component/ScalarField';
import { getBriefFieldName } from '../DataModel';




export const ListQuick = (props) => {
    const { options, resource } = props
    const { dataModel } = options
    const type = (dataModel && dataModel.types && dataModel.types.find((ty) => ty.name == resource))
    return <List {...props}>
        <Datagrid>
            {
                type.fields.map(field => {
                    if (field.flags.includes("relation")) {
                        if (field.typeName.isList) {
                            //NOTE list里面一对多不要全部展示出来，展示一个count。真正的关联在Show或者Edit去做。
                            return <FunctionField label={field.name + " - Count"} render={record => (record[field.name] && record[field.name].length) || 0} />
                        } else {
                            return <ReferenceField label={field.name} source={field.name + ".id"} reference={field.typeName.name} linkType="show">
                                {scalarField({ field, source: getBriefFieldName(dataModel,field.typeName)} )}
                            </ReferenceField>
                        }
                    }
                    if (field.typeName.isList) {
                        return <FunctionField label={field.name + " - Count"} render={record => (record[field.name] && record[field.name].length) || 0} />
                    }
                    return scalarField({ field, source: field.name, key: field.name })
                })
            }
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
}
    ;
