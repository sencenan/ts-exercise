namespace PaintHouseII265 {

    function minCostII(costs: number[][]): number {
        const
            numHouses = costs.length,
            memo: Record<string, number> = {},
            minWithout = (hIdx: number, exclude: number): number => {
                const k = `${hIdx},${exclude}`;

                if (hIdx >= numHouses) {
                    return 0;
                }

                if (memo[k] !== undefined) {
                    return memo[k];
                }

                if (hIdx === numHouses - 1) {
                    // last house
                    return memo[k] = costs[hIdx].reduce(
                        (min, cost, color) => Math.min(min, color === exclude ? Infinity : cost),
                        Infinity
                    );
                }

                // more houses to the right
                return memo[k] = costs[hIdx].reduce(
                    (min, cost, color) => Math.min(
                        min,
                        color === exclude ? Infinity : cost + minWithout(hIdx + 1, color)
                    ),
                    Infinity
                );
            };

        return costs[0].reduce(
            (min, cost, color) => Math.min(min, cost + minWithout(1, color)),
            Infinity
        );
    };

}
