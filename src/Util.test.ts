import { WithPath, filesToTreeNodes, TreeNode } from "./Util";


interface Node extends WithPath<string> { obj: string }

it('tree', () => {
  const pathes: WithPath<string>[] = [
    { path: '/1/12', obj: '12' },
    { path: '/1/11', obj: '11' },
    { path: '/1/12/123', obj: '123' },
    { path: '/1/12/123/1234', obj: '1234' },
    { path: ['1', '13'], obj: '13' }
  ];
  const tree: TreeNode<string>[] = filesToTreeNodes(pathes)
  expect(tree.length).toBe(1)
  expect(tree[0].isDirectory).toBeTruthy()
  expect(tree[0].children).toHaveLength(3)
  expect(tree[0].object).toBe('12')
  console.log(JSON.stringify(tree, undefined, 2))
});