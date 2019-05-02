
export interface TypeName {
    name: string;
    isList: boolean;
    isNotNull: boolean;
}

export interface Directive {
    name: string;
}

export interface Field {
    name: string;
    typeName: TypeName;
    directives: Directive[];
}

export interface Type {
    name: string;
    fields: Field[];
}

export interface DataModel {
    types: Type[];
}


