import * as R from "ramda";

export interface TreeNode<T> {
    isDirectory: boolean
    children: TreeNode<T>[]
    name: string
    path: string | string[]
    pathString: string
    object: T
}
export interface WithPath<T> {
    path: string | string[]
    object: T
}

//FIXME directory节点的path和pathstring有问题。
export function filesToTreeNodes<T>(arr: WithPath<T>[]): TreeNode<T>[] {
    var tree = {}
    function addnode(obj: WithPath<T>) {
        var splitpath: string[] = R.type(obj.path) === "String" ?
            (obj.path as string).replace(/^\/|\/$/g, "").split('/') : (obj.path as string[])
        var ptr: any = tree;
        for (let i = 0; i < splitpath.length; i++) {
            let node: TreeNode<T> = {
                name: splitpath[i],
                children: [],
                isDirectory: true,
                path: obj.path,
                object: obj.object,
                pathString: R.type(obj.path) === "String" ? (obj.path as string) : (obj.path as string[]).join('/')
            };
            if (i == splitpath.length - 1) {
                node.isDirectory = false
            }
            ptr[splitpath[i]] = ptr[splitpath[i]] || node;
            ptr[splitpath[i]].children = ptr[splitpath[i]].children || {};
            ptr = ptr[splitpath[i]].children;
        }
    }
    function objectToArr(node: any) {
        Object.keys(node || {}).map((k) => {
            if (node[k] && node[k].children) {
                objectToArr(node[k])
            }
        })
        if (node.children) {
            node.children = Object.values(node.children)
            node.children.forEach(objectToArr)
        }
    }
    arr.map(addnode);
    objectToArr(tree)
    return Object.values(tree)
}

