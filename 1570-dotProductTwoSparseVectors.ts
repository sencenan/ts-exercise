namespace DotProductTwoSparseVectors1570 {

    class SparseVector {
        size: number = 0;
        values: Record<string, number> = {};

        constructor(nums: number[]) {
            this.size = nums.length;
            nums.forEach((it, idx) => { this.values[idx] = it; })
        }

        // Return the dotProduct of two sparse vectors
        dotProduct(vec: SparseVector): number {
            return Object.keys(this.values).reduce(
                (dot, idx) => dot + (this.values[idx] || 0) * (vec.values[idx] || 0),
                0
            );
        }
    }

    /**
     * Your SparseVector object will be instantiated and called as such:
     * var v1 = new SparseVector(nums1)
     * var v2 = new SparseVector(nums1)
     * var ans = v1.dotProduct(v2)
     */

}
