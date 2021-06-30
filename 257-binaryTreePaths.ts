namespace BinaryTreePaths257 {

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

 function binaryTreePaths(root: TreeNode | null): string[] {
    const
        res: string[] = [],
        visitor = (root: TreeNode | null, path: number[]) => {
            if (root == null) {
                return;
            }

            path.push(root.val);

            if (root.left === null && root.right === null) {
                res.push(path.join('->'));
            } else {
                if (root.left !== null) {
                    visitor(root.left, path);
                }

                if (root.right !== null) {
                    visitor(root.right, path);
                }
            }

            path.pop();
        };

    visitor(root, []);
    return res;
};

}
