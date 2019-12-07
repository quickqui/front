import React from "react";
import { List, Datagrid } from "react-admin";
import { listingFields } from "./ListingFields";

import * as _ from "lodash";
import * as R from "ramda";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const FunctionButton = ({ record, page, text }) => {
  return (
    <Button
      color="primary"
      component={Link}
      to={{
        pathname: "/" + page.name,
        //TODO id是否不应该特殊化。
        //TODO page 有没有参数？
        state: { id: record.id }
      }}
    >
      {text}
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
        {functionModel.links
          ?.filter(link => link.type === "entity")
          ?.map(link => {
            const page = model.pageModel.pages.find(
              page => page.name === link.page || page.name === `oneFunctionPage${link.page}`
            );
            if (page) {
              return <FunctionButton key={page.name} page text={link.label} />;
            } else {
              return undefined;
            }
          })}
      </Datagrid>
    </List>
  );
};
