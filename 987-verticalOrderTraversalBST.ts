namespace BSTVerticalTraversal987 {

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

function verticalTraversal(root: TreeNode | null): number[][] {
    const
        table: Record<number, [number, number][]> = {}, // col, elements
        visit = (node: TreeNode | null, row: number, col: number) => {
            if (node === null) {
                return;
            }

            if (table[col] === undefined) {
                table[col] = [];
            }
            table[col].push([node.val, row]);

            visit(node.left, row + 1, col - 1);
            visit(node.right, row + 1, col + 1);
        },
        pairSorter = ([va, ra]: [number, number], [vb, rb]: [number, number]): number => {
            if (ra === rb) {
                return va - vb;
            } else {
                return ra - rb;
            }
        };

    visit(root, 0, 0);
    return Object
        .keys(table)
        .map(k => parseInt(k, 10))
        .sort((a, b) => a - b)
        .map(k => table[k].sort(pairSorter).map(([v, _]) => v));
};

}
