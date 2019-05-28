
import React from 'react';
import {
    Edit, SimpleForm, SelectArrayInput, ReferenceArrayInput, SelectInput, ReferenceInput, DisabledInput, ArrayField
    , ChipField, SingleFieldList
} from 'react-admin';
import { scalarInput } from '../Component/ScalarInput'
import { StringComponent } from '../Component/StringComponet'
import { FormPrefill } from '../Component/FormPrefill'



export const FunctionEdit = props => {
    const { functionModel, model } = props
    const resource = functionModel.base.resource
    const basePath = "/" + resource
    const type = (model && model.types && model.types.find((ty) => ty.name === resource))

    return <Edit basePath={basePath} resource={resource} id={props.location.state.id} {...props}>
        <FormPrefill prefill={props.location.state.prefill} >
            <SimpleForm>{
                type.fields.map(field => {
                    if (field.flags.includes("relation")) {
                        if (field.typeRef.isList) {
                            return <ReferenceArrayInput label={field.name} source={field.name + "Ids"} reference={field.typeRef.name}  key={field.name}>
                                <SelectArrayInput optionText={model.getBriefFieldName(field.typeRef)} />
                            </ReferenceArrayInput>
                        } else {

                            return <ReferenceInput label={field.name} source={field.name + ".id"} reference={field.typeRef.name} key={field.name}>
                                <SelectInput optionText={model.getBriefFieldName(field.typeRef)} />
                            </ReferenceInput>
                        }
                    }
                    if (field.typeRef.isList) {
                        if (field.typeRef.isScalar) {
                            return <ArrayField source={field.name} key={field.name}>
                                <SingleFieldList linkType={false}>
                                    <StringComponent>
                                        <ChipField source="_label" />
                                    </StringComponent>
                                </SingleFieldList>
                            </ArrayField>
                        } else {
                            return <ArrayField source={field.name} key={field.name}>
                                <SingleFieldList linkType={false}>
                                    <StringComponent render={record => JSON.stringify(record)}>
                                        <ChipField source="_label" />
                                    </StringComponent>
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
        </FormPrefill>
    </Edit>
}