
import React from 'react';
import {
    Create, SimpleForm} from 'react-admin';
import { FormPrefill } from '../Component/FormPrefill'

import {editingFields} from './EditingFields'
import * as R from "ramda";
import {oc}  from 'ts-optchain'

export const FunctionCreate = props => {
    const { functionModel, model } = props
    const resource = functionModel.base.resource
    const basePath = "/" + resource
    const entity = oc(model.entities)([]).find(R.propEq('name', resource))
    function copyArgsToPrefill(){
        const prefills = functionModel.prefill
        //TODO 表达式支持。
        //包裹在${}中的，再进行表达式计算
        const re ={...prefills}
        console.log(re)
        return re
    }
    return <Create basePath={basePath} resource={resource}  {...props}>
        <FormPrefill prefill={{...copyArgsToPrefill(), createdAt: undefined, updatedAt: undefined }} >
            <SimpleForm>{
                editingFields(entity,model)
            }
            </SimpleForm>
        </FormPrefill>
    </Create>
}