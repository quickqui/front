
import React from 'react';
import {
    TextField, Show, SimpleShowLayout,
    ReferenceArrayField, ReferenceField, ArrayField,
    ChipField, SingleFieldList

} from 'react-admin'
import { SimpleTable } from '../Component/SampleTable'
import { scalarField } from '../Component/ScalarField';
import { getBriefFieldName } from '../DataModel';
import { StringToLabelObject } from '../Component/StringComponet'



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
                            <TextField source={getBriefFieldName(dataModel, field.typeName)} />
                        </ReferenceField>
                    }
                }
                if (field.typeName.isList) {
                    if (field.typeName.isScalar) {
                        return <ArrayField source={field.name}>
                            <SingleFieldList linkType={false}>
                                <StringToLabelObject>
                                    <ChipField source="_label" />
                                </StringToLabelObject>
                            </SingleFieldList>
                        </ArrayField>
                    } else {
                        return <ArrayField source={field.name}>
                            <SingleFieldList linkType={false}>
                                <StringToLabelObject render={record => JSON.stringify(record)} >
                                    <ChipField source="_label" />
                                </StringToLabelObject>
                            </SingleFieldList>
                        </ArrayField>
                    }
                }
                return scalarField({ field, source: field.name, key: field.name })
            }
            )
        }
        </SimpleShowLayout>
    </Show>
}