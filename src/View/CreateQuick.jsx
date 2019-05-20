
import React from 'react';
import {
    Create, SimpleForm, SelectArrayInput,
    ReferenceArrayInput, SelectInput,
    ReferenceInput, DisabledInput, ArrayField
} from 'react-admin';
import { ChipField, SingleFieldList } from 'react-admin';
import { scalarInput } from '../Component/ScalarInput'
import { StringToLabelObject } from '../Component/StringComponet'


export const CreateQuick = props => {
    const { options, resource } = props
    const { model } = options
    const type = (model && model.types && model.types.find((ty) => ty.name === resource))
    return <Create {...props}>
        <SimpleForm>{

            type.fields.map(field => {
                if (field.flags.includes("relation")) {
                    if (field.typeRef.isList) {
                        return <ReferenceArrayInput label={field.name} source={field.name + "Ids"} reference={field.typeRef.name} >
                            <SelectArrayInput optionText={model.getBriefFieldName(field.typeRef)} />
                        </ReferenceArrayInput>
                    } else {
                        return <ReferenceInput label={field.name} source={field.name + ".id"} reference={field.typeRef.name} >
                            <SelectInput optionText={model.getBriefFieldName(field.typeRef)} />
                        </ReferenceInput>
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
                if (field.flags.includes("id")) {
                    return DisabledInput({ field, source: field.name, key: field.name })
                }


                return scalarInput({ field, source: field.name, key: field.name })
            }
            )
        }
        </SimpleForm>
    </Create>
}