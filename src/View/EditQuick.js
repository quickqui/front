
import React from 'react';
import {
    Edit, SimpleForm, TextInput, TextField,SelectArrayInput,
    ArrayInput, ReferenceArrayInput, SelectInput,
    ReferenceInput, SimpleFormIterator, DisabledInput, Datagrid, FunctionField, ArrayField
} from 'react-admin';
import { scalarInput } from '../Component/ScalarInput'
import { getBriefFieldName } from '../DataModel';


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
                            <SelectArrayInput optionText={getBriefFieldName(dataModel,field.typeName)} />
                        </ReferenceArrayInput>
                    } else {

                        return <ReferenceInput label={field.name} source={field.name + ".id"} reference={field.typeName.name} >
                            <SelectInput optionText={getBriefFieldName(dataModel,field.typeName)} />
                        </ReferenceInput>



                        // return <ReferenceField label={field.name} source={field.name + ".id"} reference={field.typeName.name} linkType="show">
                        //     <TextField source="name" />
                        // </ReferenceField>
                    }
                }
                if (field.typeName.isList) {
                    if (field.typeName.isScalar) {
                        return <ArrayField source={field.name}>
                            <Datagrid>
                                {/* //TODO 这个咋搞？ */}
                                <FunctionField render={record => JSON.stringify(record)} />

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
                //  return <TextField   source={field.name} key={field.name}/>
                // return <ScalarField field={field} source={field.name} key={field.name} {...props}/>

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