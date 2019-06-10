
export interface TypeRef {
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
    typeRef: TypeRef;
    directives: Directive[];
}

export interface Type {
    name: string;
    fields: Field[];
}

export interface DataModel {
    types: Type[];
}