
import React from 'react';
import {
    TextField, Show, SimpleShowLayout,
    ReferenceArrayField, ReferenceField, ArrayField,
    ChipField, SingleFieldList

} from 'react-admin'
import { SimpleTable } from '../Component/SampleTable'
import { scalarField } from '../Component/ScalarField';
import { StringToLabelObject } from '../Component/StringComponet'



export const ShowQuick = props => {
    const { options, resource } = props
    const { model } = options
    const type = (model && model.types && model.types.find((ty) => ty.name === resource))
    return <Show {...props}>
        <SimpleShowLayout>{
            type.fields.map(field => {
                if (field.flags.includes("relation")) {
                    if (field.typeRef.isList) {
                        return (<ReferenceArrayField reference={field.typeRef.name} linkType="show" source={field.name + "Ids"}>
                            <SimpleTable field={field} {...props} />
                        </ReferenceArrayField>)
                    } else {
                        return <ReferenceField label={field.name} source={field.name + ".id"} reference={field.typeRef.name} linkType="show">
                            <TextField source={model.getBriefFieldName( field.typeRef)} />
                        </ReferenceField>
                    }
                }
                if (field.typeRef.isList) {
                    if (field.typeRef.isScalar) {
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