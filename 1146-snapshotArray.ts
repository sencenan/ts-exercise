namespace SnapshotArray1146 {

    class SnapshotArray {
        private inserts: [number, number][] = [];
        private snapPoints: number[] = [];

        constructor(length: number) {
        }

        set(index: number, val: number): void {
            this.inserts.push([index, val]);
        }

        snap(): number {
            this.snapPoints.push(this.inserts.length - 1);
            return this.snapPoints.length - 1;
        }

        get(index: number, snap_id: number): number {
            for (let i = this.snapPoints[snap_id]; i >= 0; i -= 1) {
                if (this.inserts[i][0] === index) {
                    return this.inserts[i][1];
                }
            }

            return 0;
        }
    }

    /**
     * Your SnapshotArray object will be instantiated and called as such:
     * var obj = new SnapshotArray(length)
     * obj.set(index,val)
     * var param_2 = obj.snap()
     * var param_3 = obj.get(index,snap_id)
     */

}
