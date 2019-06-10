

export interface FunctionModel {
    functions: Function[]
}

export interface Function {
    menuPath: string
    icon: string
    name: string
    base: {
        resource: string
        crud: string
    }
    filter: object
    sort: object
    prefill: object

    links: Link[]
}


interface Link {
    label: string
    type: "entity"|"list"
    function: string
    args: object
}
