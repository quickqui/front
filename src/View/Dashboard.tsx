import React from "react";

import { IconCardView } from "./IconCardView";
import {
  Function,
  getNameWithCategory,
  withPresentationModel,
  Place
} from "@quick-qui/model-defines/";
import { ModelWrapped } from "../Model";
import _ from "lodash";

//TODO 目前只有dashboard实现了page模型。
//+ 以react-admin demo为主要依据和借鉴
export default (props: { model: ModelWrapped }) => {
  const { model } = props;
  let functions: Function[] = [];

  const page = model?.pageModel?.pages?.find(
    page => page?.name === "dashboard"
  );
  let gride: number = 3;
  if (page) {
    gride = +(page.gride) ?? 3;
    functions =
      _(page.places
        ?.map((place: Place) => place.function)
        ?.map((functionName: string) =>
          model.functions.find((fun: Function) => functionName === fun.name)
        )).compact().toArray().value() ?? functions;
  }

  const gridStyle = {
    container: {
      display: "grid",
      "grid-template-columns": "auto ".repeat(gride).trim()
    },
    item: {
      marginTop: "2em"
    }
  };

  return (
    <div style={gridStyle.container}>
      {//TODO 增加其他类型的function支持
      functions
        .filter((fun: Function) => {
          const baseFunction = fun.annotations?.["implementation"];
          if (baseFunction) {
            const { category, name } = getNameWithCategory(baseFunction);
            return category === "provided" && name === "iconCard";
          } else {
            return false;
          }
        })
        .map((fun: Function) => {
          return (
            <div style={gridStyle.item}>
              <IconCardView
                key={fun.name}
                text={fun.name}
                {...props}
                resource={fun.resource}
                // filter={fun.filter}
                icon={fun.parameters?.["icon"]}
              />
            </div>
          );
        })}
    </div>
  );
};
