
import React from 'react';
import {
    Edit, SimpleForm} from 'react-admin';
import { FormPrefill } from '../Component/FormPrefill'

import {editingFields} from './EditingFields'
import * as R from "ramda";
import * as oc from 'ts-optchain'

export const FunctionEdit = props => {
    const { functionModel, model } = props
    const resource = functionModel.base.resource
    const basePath = "/" + resource
    const entity = oc(model.entites)([]).find(R.propEq('name', resource))
    function copyArgsToPrefill(){
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
                editingFields(entity,model)
            }
            </SimpleForm>
        </FormPrefill>
    </Edit>
}