namespace EggDrop {

    const cost = (k: number, n: number, nMax: number, table: number[]): number => {
        if (k === 1 || n <= 1) {
            // one egg left, need as many step as floors
            return n;
        }

        const pos = k * nMax + n;

        if (table[pos] === undefined) {
            const
                costUnbroken = (x: number) => cost(k, n - x, nMax, table), // dec
                costBroken = (x: number) => cost(k - 1, x - 1, nMax, table); // in

            let
                lo = 1,
                hi = n,
                mid = -1;

            while (lo <= hi) {
                mid = lo + Math.floor((hi - lo) / 2);

                const
                    cUp = costUnbroken(mid), // dec
                    cDown = costBroken(mid); // inc

                if (cUp > cDown) {
                    lo = mid + 1;
                } else if (cUp < cDown) {
                    hi = mid - 1;
                } else {
                    break;
                }
            }

            table[pos] = 1 + Math.max(costUnbroken(mid), costBroken(mid));
        }

        return table[pos];
    };

    function superEggDrop(k: number, n: number): number {
        return cost(k, n, n, []);
    };

}
