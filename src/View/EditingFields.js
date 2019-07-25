import React from 'react';



import {
    SelectArrayInput, ReferenceArrayInput, SelectInput, ReferenceInput, DisabledInput, ArrayField
    , ChipField, SingleFieldList
} from 'react-admin';
import { scalarInput } from '../Component/ScalarInput'
import { StringComponent } from '../Component/StringComponet'

export function editingFields(entity, model) {
    return entity.properties.filter((property)=>!(["id","createdAt","updatedAt"].includes(property.name))).map(property => {
        if (model.isTypeRelation(property)) {
            if (model.isTypeList(property)) {
                return <ReferenceArrayInput label={property.name} source={property.name + "Ids"} reference={property.relation.to} key={property.name}>
                    <SelectArrayInput optionText={model.getBriefPropertyName(model.getTypeEntity(property))} />
                </ReferenceArrayInput>
            } else {
                return <ReferenceInput label={property.name} source={property.name + ".id"} reference={property.relation.to} key={property.name}>
                    <SelectInput optionText={model.getBriefPropertyName(model.getTypeEntity(property))} />
                </ReferenceInput>
            }
        }
        if (model.isTypeList(property)) {
            if (model.isTypeScalar(property)) {
                return <ArrayField source={property.name} key={property.name}>
                    <SingleFieldList linkType={false}>
                        <StringComponent>
                            <ChipField source="_label" />
                        </StringComponent>
                    </SingleFieldList>
                </ArrayField>
            } else {
                return <ArrayField source={property.name} key={property.name}>
                    <SingleFieldList linkType={false}>
                        <StringComponent render={record => JSON.stringify(record)} >
                            <ChipField source="_label" />
                        </StringComponent>
                    </SingleFieldList>
                </ArrayField>
            }
        }
        if (model.isPropertyId(property)) {
            return DisabledInput({ property, source: property.name, key: property.name })
        }


        return scalarInput({ property, source: property.name, key: property.name })
    }
    )
}