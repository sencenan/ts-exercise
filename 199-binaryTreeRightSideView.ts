namespace BinaryTreeRighSideView199 {

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

function rightSideView(root: TreeNode | null): number[] {
    if (root === null) {
        return [];
    }

    let
        rightMost = [],
        cur: TreeNode[] = [],
        next: TreeNode[] = [root as TreeNode];

    while (next.length > 0 || cur.length > 0) {
        if (cur.length === 0) {
            rightMost.push(next[next.length - 1].val);
            cur = next;
            next = [];
        }

        const node = cur.shift() as TreeNode;

        if (node.left !== null) {
            next.push(node.left);
        }

        if (node.right !== null) {
            next.push(node.right);
        }
    }

    return rightMost;
};

}
