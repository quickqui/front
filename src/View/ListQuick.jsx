import React from 'react';
import { List, Datagrid, ReferenceField, ShowButton, EditButton, FunctionField } from 'react-admin';
import { scalarField } from '../Component/ScalarField';




export const ListQuick = (props) => {
    const { options, resource } = props
    const { model } = options
    const type = (model && model.types && model.types.find((ty) => ty.name === resource))
    return <List {...props}>
        <Datagrid>
            {
                            //TODO field与输入、显示的逻辑抽出来。

                type.fields.map(field => {
                    if (field.flags.includes("relation")) {
                        if (field.typeRef.isList) {
                            //NOTE list里面一对多不要全部展示出来，展示一个count。真正的关联在Show或者Edit去做。
                            return <FunctionField key={field.name} label={field.name + " - Count"} render={record => (record[field.name] && record[field.name].length) || 0} />
                        } else {
                            return <ReferenceField label={field.name} key={field.name} source={field.name + ".id"} reference={field.typeRef.name} linkType="show">
                                {scalarField({ field, key: field.name,source: model.getBriefFieldName(field.typeRef) })}
                            </ReferenceField>
                        }
                    }
                    if (field.typeRef.isList) {
                        return <FunctionField key={field.name} label={field.name + " - Count"} render={record => (record[field.name] && record[field.name].length) || 0} />
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
