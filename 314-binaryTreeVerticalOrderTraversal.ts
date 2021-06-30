namespace BinaryTreeVerticalOrderTraversal314 {

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

function verticalOrder(root: TreeNode | null): number[][] {
    const
        res: number[][] = [],
        entries: [number, number, number][] = [],
        visit = (node: TreeNode | null, col: number, row: number) => {
            if (node !== null) {
                visit(node.left, col - 1, row + 1);
                entries.push([col, row, node.val]);
                visit(node.right, col + 1, row + 1);
            }
        };

    visit(root, 0, 0);

    entries.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }

        return a[0] - b[0];
    });

    if (entries.length > 0) {
        let col: number = entries[0][0] - 1;
        while (entries.length > 0) {
            const entry = entries.shift() as [number, number, number];

            if (entry[0] !== col) {
                col = entry[0];
                res.push([]);
            }

            res[res.length - 1].push(entry[2]);
        }
    }

    return res;
};

}
