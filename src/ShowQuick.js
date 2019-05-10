
import React from 'react';
import {
    TextField, Datagrid, Show, SimpleShowLayout,
    ReferenceArrayField, ReferenceField, ArrayField,
    FunctionField, SingleFieldList, ChipField, ShowButton
} from 'react-admin'


const SimpleTable = props => {
    const { options, field } = props
    const { dataModel } = options
    const relationType = (dataModel && dataModel.types && dataModel.types.find((ty) => ty.name === field.typeName.name))
    return <Datagrid {...props}>{
        relationType.fields.map(f => <TextField source={f.name} {...props} />)
    }
        <ShowButton />
    </Datagrid>
}

export const ShowQuick = props => {
    const { options, resource } = props
    const { dataModel } = options
    const type = (dataModel && dataModel.types && dataModel.types.find((ty) => ty.name == resource))
    return <Show {...props}>
        <SimpleShowLayout>{
            type.fields.map(field => {
                if (field.flags.includes("relation")) {
                    if (field.typeName.isList) {
                        return (<ReferenceArrayField reference={field.typeName.name} linkType="show" source={field.name + "Ids"}>
                            <SimpleTable field={field} {...props} />
                        </ReferenceArrayField>)
                    } else {
                        return <ReferenceField label={field.name} source={field.name + ".id"} reference={field.typeName.name} linkType="show">
                            <TextField source="name" />
                        </ReferenceField>
                    }
                }
                if (field.typeName.isList) {
                    if (field.typeName.isScalar) {
                        return <ArrayField source={field.name}>
                            <Datagrid>
                                {/* //TODO 加入类似 Chip的外观 */}
                                <FunctionField render={record => record + ""} />
                            </Datagrid>
                        </ArrayField>
                    } else {
                        return <ArrayField source={field.name}>
                            <Datagrid>
                                <FunctionField render={record => JSON.stringify(record)} />
                            </Datagrid>
                        </ArrayField>
                    }
                }

                return <TextField source={field.name} key={field.name} />
            }
            )
        }
        </SimpleShowLayout>
    </Show>
}