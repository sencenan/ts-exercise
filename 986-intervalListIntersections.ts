namespace IntervalListIntersections986 {

    function intervalIntersection(firstList: number[][], secondList: number[][]): number[][] {
        const
            intersects: number[][] = [],
            getIntersection = (a: number[], b: number[]): number[] | null => {
                const
                    lo = Math.max(a[0], b[0]),
                    hi = Math.min(a[1], b[1]);

                if (lo <= hi) {
                    return [lo, hi];
                } else {
                    return null;
                }
            };

        let
            fstIdx = 0,
            sndIdx = 0;

        while (fstIdx < firstList.length && sndIdx < secondList.length) {
            const intersection = getIntersection(firstList[fstIdx], secondList[sndIdx]);

            if (intersection === null) {
                if (firstList[fstIdx][1] < secondList[sndIdx][0]) {
                    fstIdx += 1;
                } else {
                    sndIdx += 1;
                }
            } else {
                intersects.push(intersection);

                if (firstList[fstIdx][1] === secondList[sndIdx][1]) {
                    fstIdx += 1;
                    sndIdx += 1;
                } else if (firstList[fstIdx][1] < secondList[sndIdx][1]) {
                    fstIdx += 1;
                } else {
                    sndIdx += 1;
                }
            }
        }

        return intersects;
    };

}
