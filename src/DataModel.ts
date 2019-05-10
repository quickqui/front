
export interface TypeName {
    name: string;
    isList: boolean;
    isNotNull: boolean;
    isScalar: boolean;
}

export interface Directive {
    name: string;
}

export interface Field {
    name: string;
    typeName: TypeName;
    flags:string[]
    directives: Directive[];
}

export interface Type {
    name: string;
    fields: Field[];
}

export interface DataModel {
    types: Type[];
}

export function findField(dataModel:DataModel,flag:string):[Type,Field] | undefined{
    const zipTypeWithField :[Type,Field][] = dataModel.types.flatMap(t=> t.fields.map(f=>[t,f]))
    return zipTypeWithField.find(([t,f])=>f.flags.includes(flag))
}

