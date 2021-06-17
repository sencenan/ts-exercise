namespace BinaryTreeMaxPathSum124 {

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

function maxPathSum(root: TreeNode | null): number {
    let max = -Infinity;

    const visit = (root: TreeNode | null): number => {
        if (root === null) {
            return 0;
        }

        const
            leftSum = visit(root.left),
            rightSum = visit(root.right);

        max = Math.max(
            max,
            leftSum + rightSum + root.val, // connecting left child with right child, through root
            leftSum + root.val, // discard right
            rightSum + root.val, // discord left
            root.val // discard both child
        );

        return Math.max(
            root.val + leftSum, //
            root.val + rightSum,
            root.val
        );
    };

    visit(root);
    return max;
};

}
