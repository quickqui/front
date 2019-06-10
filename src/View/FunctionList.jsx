import React from 'react';
import { List, Datagrid, ReferenceField, ShowButton, EditButton, FunctionField } from 'react-admin';
import { scalarField } from '../Component/ScalarField';
import * as _ from 'lodash';



import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


const FunctionButton = ({ record, functionModel }) => {
    return (
        <Button
            color='primary'
            component={Link}
            // TODO 实现 label、type
            to={{
                pathname: "/" + functionModel.name,
                //TODO id不应该特殊化。
                state: { id: record.id, args: functionModel.args },
            }}
        >
            {functionModel.name}
        </Button>
    )
};

export const FunctionList = (props) => {
    const { model, functionModel } = props
    console.log(functionModel)
    const resource = functionModel.base.resource
    const location = { pathname: resource }
    const basePath = "/" + resource
    const filter = functionModel.filter
    const sort = functionModel.sort && _(functionModel.sort).map((value, key) => {
        return { "field": key, "order": value }
    }).value()[0]
    const type = (model && model.types && model.types.find((ty) => ty.name === resource))




    //TODO  目前filter只能是key、value的形式，不能实现表达式方式。需要试一下其他方式。
    return <List location={location} basePath={basePath} resource={resource}
        hasCreate={false} hasEdit={false} hasList={false} hasShow={false}
        filter={filter}
        sort={sort}
        {...props}>
        <Datagrid>
            {
                type.fields.map(field => {
                    if (field.flags.includes("relation")) {
                        if (field.typeRef.isList) {
                            //NOTE list里面一对多不要全部展示出来，展示一个count。真正的关联在Show或者Edit去做。
                            return <FunctionField key={field.name} label={field.name + " - Count"} render={record => (record[field.name] && record[field.name].length) || 0} />
                        } else {
                            return <ReferenceField key={field.name} label={field.name} source={field.name + ".id"} reference={field.typeRef.name} linkType="show">
                                {scalarField({ field, key: field.name, source: model.getBriefFieldName(field.typeRef) })}
                            </ReferenceField>
                        }
                    }
                    if (field.typeRef.isList) {
                        return <FunctionField key={field.name} label={field.name + " - Count"} render={record => (record[field.name] && record[field.name].length) || 0} />
                    }
                    return scalarField({ field, source: field.name, key: field.name })
                })
            }
            {
                functionModel.links && functionModel.links.map((link) => {
                    // TODO 实现 label、type
                    const actionFun = model.functions.find((fun) => fun.name === link.function)
                    if (actionFun) {
                        return <FunctionButton key={actionFun.name} functionModel={actionFun} />
                    } else {
                        return undefined
                    }
                })
            }

        </Datagrid>
    </List>
}
    ;
