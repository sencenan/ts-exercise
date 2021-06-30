namespace BSTIterator173 {

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

class BSTIterator {
    queue: number[] = [];
    root: TreeNode | null;

    constructor(root: TreeNode | null) {
        this.root = root;
    }

    next(): number {
        if (this.queue.length === 0) {
            if (this.root !== null) {
                this.populateQueue(this.root.left);
                this.queue.push(this.root.val);
                this.root = this.root.right;
            }
        }

        return this.queue.shift() as number;
    }

    hasNext(): boolean {
        return this.queue.length > 0 || this.root !== null;
    }

    populateQueue(node: TreeNode | null): void {
        if (node !== null) {
            this.populateQueue(node.left);
            this.queue.push(node.val);
            this.populateQueue(node.right);
        }
    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
}
