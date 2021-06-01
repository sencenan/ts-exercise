namespace EditDistance72 {
    function minDistance(s1: string, s2: string): number {
        const
            memo: Record<string, number> = {},
            editDist = (
                alo: number, ahi: number,
                blo: number, bhi: number,
                k = JSON.stringify([alo, ahi, blo, bhi])
            ): number => {
                if (memo[k] !== undefined) {
                    return memo[k];
                }

                if (s1.substring(alo, ahi + 1) === s2.substring(blo, bhi + 1)) {
                    return memo[k] = 0;
                }

                while (alo <= ahi && blo <= bhi && s1[alo] === s2[blo]) {
                    alo += 1;
                    blo += 1;
                }

                memo[k] = 0;
                if (alo > ahi) {
                    memo[k] = bhi - blo + 1;
                } else if (blo > bhi) {
                    memo[k] = ahi - alo + 1;
                } else {
                    memo[k] = 1 + Math.min(
                        editDist(alo + 1, ahi, blo, bhi),
                        editDist(alo, ahi, blo + 1, bhi),
                        editDist(alo + 1, ahi, blo + 1, bhi)
                    );
                }

                return memo[k];
            }

        return editDist(0, s1.length - 1, 0, s2.length - 1);
    };
}
