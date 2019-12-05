import React from "react";
import { List, Datagrid } from "react-admin";
import { listingFields } from "./ListingFields";

import * as _ from "lodash";

import * as R from "ramda";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const FunctionButton = ({ record, functionModel }) => {
  return (
    <Button
      color="primary"
      component={Link}
      // TODO 实现 label、type
      to={{
        pathname: "/" + functionModel.name,
        //TODO id是否不应该特殊化。
        state: { id: record.id, args: functionModel.args }
      }}
    >
      {functionModel.name}
    </Button>
  );
};

export const FunctionList = props => {
  const { model, functionModel } = props;
  console.log(functionModel);
  const resource = functionModel.resource;
  const location = { pathname: resource };
  const basePath = "/" + resource;
  const filter = functionModel.filter;
  const sort =
    functionModel.sort &&
    _(functionModel.sort)
      .map((value, key) => {
        return { field: key, order: value };
      })
      .value()[0];

  const entity = model.entities.find(R.propEq("name", resource));

  //TODO  目前filter只能是key、value的形式，不能实现表达式方式。需要试一下其他方式。
  return (
    <List
      location={location}
      basePath={basePath}
      resource={resource}
      hasCreate={false}
      hasEdit={false}
      hasList={false}
      hasShow={false}
      filter={filter}
      sort={sort}
      {...props}
    >
      <Datagrid>
        {listingFields(entity, model)}
        {functionModel.links &&
          functionModel.links.map(link => {
            // TODO 实现 label、type
            const actionFun = model.functions.find(
              fun => fun.name === link.function
            );
            if (actionFun) {
              return (
                <FunctionButton
                  key={actionFun.name}
                  functionModel={actionFun}
                />
              );
            } else {
              return undefined;
            }
          })}
      </Datagrid>
    </List>
  );
};
