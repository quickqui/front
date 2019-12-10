import * as R from "ramda";
import * as _ from "lodash";

import axios from "axios";
//TODO 怎么达成二级namespace？比如from @quick-qui/model-defines/domain’
import { DomainModel, Entity, List, Property, PageModel } from "@quick-qui/model-defines";
import { FunctionModel, Function } from "@quick-qui/model-defines";
import { env } from "../Env";

export const model: Promise<object> = axios
  .get("/model-server/models/default")
  .then(_ => _.data);

export class ModelWrapped {
  readonly domainModel: DomainModel;
  readonly functionModel: FunctionModel;
  readonly pageModel: PageModel;

  constructor(model: {
    domainModel: DomainModel;
    functionModel: FunctionModel;
    pageModel: PageModel
  }) {
    this.domainModel = model.domainModel;
    this.functionModel = model.functionModel;
    this.pageModel = model.pageModel
  }

  get entities(): Entity[] {
    return this.domainModel.entities || [];
  }

  get functions(): Function[] {
    return this.functionModel.functions || [];
  }

  // findField(flag: string): [Type, Field] | undefined {
  //     const zipTypeWithField: [Type, Field][] = this.dataModel.types.flatMap(t => t.fields.map(f => [t, f]))
  //     if (!zipTypeWithField) return undefined
  //     return zipTypeWithField.find(([t, f]) => (f as FieldP).flags.includes(flag))
  // }

  // getBriefFieldName(typeRef: TypeRef): string | undefined {
  //     const reType = this.dataModel.types.find(t => t.name === typeRef.name)
  //     if (reType) {
  //         const field = reType.fields.find(f => (f as FieldP).flags.includes("brief"))
  //         return field ? field.name : undefined
  //     }
  //     return undefined
  // }

  isList(object: any): object is List {
    if (_.isNil(object)) return false;
    if (_.isString(object)) return false;
    return "itemType" in object;
  }

  isTypeList(property: Property): boolean {
    if (this.isTypeRelation(property)) {
      if (property.relation) return property.relation.n !== "one";
      else return false;
    }
    return this.isList(property.type);
  }
  isTypeRelation(property: Property): boolean {
    return R.complement(R.isNil)(property.relation);
  }
  isPropertyId(property: Property): boolean {
    if (this.isList(property.type)) return false;
    return property.type === "id";
  }
  getTypeEntity(property: Property): Entity | undefined {
    if (this.isTypeRelation(property)) {
      return this.entities.find(
        R.propEq("name", property.relation && property.relation.to)
      );
    }
    if (this.isTypeList(property)) {
      return this.entities.find(
        R.propEq("name", (property.type as List).itemType)
      );
    } else {
      return this.entities.find(R.propEq("name", property.type));
    }
  }
  getBriefPropertyName(entity: Entity): string | undefined {
    return entity?.annotations?.["brief"] || "id";
  }

  isTypeScalar(property: Property): boolean {
    if (property.type === undefined) {
      return false;
    } else {
      const scalarTypes = [
        "String",
        "Int",
        "Float",
        "Boolean",
        "DateTime",
        "ID"
      ];

      if (this.isList(property.type)) return false;
      return scalarTypes.includes(property.type);
    }
  }
}
