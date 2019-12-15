import { Property, Presentation, PropertyRule } from "@quick-qui/model-defines";
import _ from "lodash";

function propertyOrder(presentation: Presentation, property: Property): number {
  return (
    presentation?.propertyRules?.find(pr => pr.property === property.name)
      ?.order ?? 0
  );
}

export function applyPresentation(
  presentation: Presentation,
  properties: Property[]
): Property[] {
  return _(properties)
    .filter(prop => {
      return !rulesHelp(presentation, prop).isHidden;
    })
    .sortBy(prop => propertyOrder(presentation, prop))
    .value();
}

export interface PropertyRuleView {
    isHidden: boolean;
    isDisabled: boolean;
}

export function rulesHelp(
  presentation: Presentation | undefined,
  property: Property
): PropertyRuleView {
  const rule: PropertyRule | undefined = presentation?.propertyRules?.find(
    propertyRule => propertyRule.property === property.name
  );

  return {
    //TODO 引入白名单， 当有property定义shown的时候，其他自动hidden
    isHidden: rule?.rules?.find(it => it === "hidden") ? true : false,
    isDisabled: rule?.rules?.find(it => it === "disabled") ? true : false
  };
}
