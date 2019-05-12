
import React from 'react';
import {
    Edit, SimpleForm, SelectArrayInput,ReferenceArrayInput, SelectInput,ReferenceInput, DisabledInput, ArrayField
    , ChipField, SingleFieldList} from 'react-admin';
import { scalarInput } from '../Component/ScalarInput'
import { getBriefFieldName } from '../DataModel';
import { StringToLabelObject } from '../Component/StringComponet'



export const EditQuick = props => {
    const { options, resource } = props
    const { dataModel } = options
    const type = (dataModel && dataModel.types && dataModel.types.find((ty) => ty.name == resource))
    return <Edit {...props}>
        <SimpleForm>{
            type.fields.map(field => {
                if (field.flags.includes("relation")) {
                    if (field.typeName.isList) {
                        return <ReferenceArrayInput label={field.name} source={field.name + "Ids"} reference={field.typeName.name} >
                            <SelectArrayInput optionText={getBriefFieldName(dataModel, field.typeName)} />
                        </ReferenceArrayInput>
                    } else {

                        return <ReferenceInput label={field.name} source={field.name + ".id"} reference={field.typeName.name} >
                            <SelectInput optionText={getBriefFieldName(dataModel, field.typeName)} />
                        </ReferenceInput>
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
                if (field.flags.includes("id")) {
                    return DisabledInput({ field, source: field.name, key: field.name })
                }


                return scalarInput({ field, source: field.name, key: field.name })
            }
            )
        }
        </SimpleForm>
    </Edit>
}