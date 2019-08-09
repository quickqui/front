

export interface FunctionModel {
    functions: Function[]
}
//TODO 可能不同的base，需要的属性并不同，要再思考下
//TODO 可能要分成query和command
export interface Function {
    menuPath: string
    icon: string
    name: string
    base: {
        function: string
        resource: string
    }
    filter: object
    sort: object
    prefill: object
    roles: string[]

    links: Link[]
    action: Action
}


interface Link {
    label: string
    type: "entity"|"list"
    function: string
    args: object
}

interface Action{
    
}
