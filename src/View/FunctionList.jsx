import React from 'react';
import { List, Datagrid, ReferenceField, ShowButton, EditButton, FunctionField } from 'react-admin';
import { scalarField } from '../Component/ScalarField';
import * as _ from 'lodash';





export const FunctionList = (props) => {
    const { model, functionModel } = props
    const resource = functionModel.base.resource
    const location = { pathname: resource }
    const basePath = "/" + resource
    const filter = functionModel.filter
    const sort = functionModel.sort && _(functionModel.sort).map((value, key) => {
        return { "field": key, "order": value }
    }).value()[0]
    console.log(_(functionModel.sort).map((value, key) => {
        return { "field": key, "order": value }
    }))
    console.log(sort)
    const type = (model && model.types && model.types.find((ty) => ty.name === resource))
    //TODO  目前filter只能是key、value的形式，不能实现表达式方式。需要试一下其他方式。
    return <List location={location} basePath={basePath} resource={resource}
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
                            return <ReferenceField label={field.name} key={field.name} source={field.name + ".id"} reference={field.typeRef.name} linkType="show">
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
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
}
    ;
