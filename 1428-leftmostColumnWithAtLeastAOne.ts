namespace LeftMostColumnWithAtLeastAOne1428 {

interface BinaryMatrix {
     get(row: number, col: number): number;
     dimensions(): number[];
}

function leftMostColumnWithOne(binaryMatrix: BinaryMatrix): number {
	const
        [rows, cols] = binaryMatrix.dimensions();

    let
        ans = Infinity;

    for (let r = 0; r < rows; r += 1) {
        let
            lo = 0,
            hi = cols,
            midV = 0;

        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            midV = binaryMatrix.get(r, mid);

            if (midV === 1) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }

        if (binaryMatrix.get(r, lo) === 1) {
            ans = Math.min(ans, lo);
        }
    }

    return isFinite(ans) ? ans : -1;
};

}
