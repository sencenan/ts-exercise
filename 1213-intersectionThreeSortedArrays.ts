namespace IntersectionThreeSortedArray {

    function arraysIntersection(arr1: number[], arr2: number[], arr3: number[]): number[] {
        let
            res: number[] = [],
            i1 = 0,
            i2 = 0,
            i3 = 0;

        while (i1 < arr1.length && i2 < arr2.length && i3 < arr3.length) {
            if (arr1[i1] === arr2[i2] && arr2[i2] === arr3[i3]) {
                res.push(arr1[i1]);
                i1 += 1;
                i2 += 1;
                i3 += 1;
            } else {
                // shift the smallest
                const min = Math.min(arr1[i1], arr2[i2], arr3[i3]);

                switch (min) {
                    case arr1[i1]:
                        i1 += 1;
                        break;
                    case arr2[i2]:
                        i2 += 1;
                        break;
                    case arr3[i3]:
                        i3 += 1;
                        break;
                }
            }
        }

        return res;
    };

}
