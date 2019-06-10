export function filesToTreeNodes(arr) {
    var tree = {}
    function addnode(obj) {
        var splitpath = obj.fileName.replace(/^\/|\/$/g, "").split('/');
        var ptr = tree;
        for (let i = 0; i < splitpath.length; i++) {
            let node = {
                fileName: splitpath[i],
                isDirectory: true
            };
            if (i == splitpath.length - 1) {
                node.isDirectory = false
            }
            ptr[splitpath[i]] = ptr[splitpath[i]] || node;
            ptr[splitpath[i]].children = ptr[splitpath[i]].children || {};
            ptr = ptr[splitpath[i]].children;
        }
    }
    function objectToArr(node) {
        Object.keys(node || {}).map((k) => {
            if (node[k].children) {
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

