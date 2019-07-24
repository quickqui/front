import React from 'react';
import { ArrayField, ChipField, SingleFieldList,ReferenceArrayField,ReferenceField,TextField } from 'react-admin';
import { StringComponent } from '../Component/StringComponet';
import {scalarField} from '../Component/ScalarField'
import {SimpleTable} from '../Component/SampleTable'




export function showingFields(entity, model) {
    return entity.properties.map(property => {
        if (model.isTypeRelation(property)) {
            if (model.isTypeList(property)) {
                return <ReferenceArrayField label={property.name} source={property.name + "Ids"} reference={property.relation.to} key={property.name}>
                    <SimpleTable porperty={property} />
                </ReferenceArrayField>
            } else {
                return <ReferenceField label={property.name} source={property.name + ".id"} reference={property.relation.to} key={property.name}>
                    <TextField source={model.getBriefPropertyName(model.getTypeEntity(property))} />
                </ReferenceField>
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
       


        return scalarField({ property, source: property.name, key: property.name })
    }
    )
}