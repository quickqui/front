
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
    function copyArgsToPrefill(){
        //TODO context设计可能需要进一步，args貌似是最高优先级的。
        //model里面配置的args和运行时（上一页）传过来的是不是都叫args？
        //可能配置的应该是params，运行时传过来的应该是args。
        const context = props.location.state.args
        const prefills = functionModel.prefill
        //TODO 表达式支持。
        //包裹在${}中的，再进行表达式计算
        const re ={...prefills}
        console.log(re)
        return re
    }
    return <Edit basePath={basePath} resource={resource} id={props.location.state.id} {...props}>
        <FormPrefill prefill={copyArgsToPrefill()} >
            <SimpleForm>{
                type.fields.map(field => {
                                //TODO field与输入、显示的逻辑抽出来。

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