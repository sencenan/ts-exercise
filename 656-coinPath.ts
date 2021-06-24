namespace coinPath656 {

    function cheapestJump(coins: number[], maxJump: number): number[] {
        let
            costAtPos: number[] = new Array(coins.length - 1).fill(Infinity),
            nextHop: Record<number, number> = {};

        if (coins[coins.length - 1] !== -1) {
            costAtPos[coins.length - 1] = coins[coins.length - 1];
        }

        for (let i = coins.length - 1; i >= 0; i -= 1) {
            for (let k = 1; k <= maxJump; k += 1) {
                if (i - k >= 0) {
                    if (coins[i - k] !== -1 && costAtPos[i - k] >= costAtPos[i] + coins[i - k]) {
                        costAtPos[i - k] = costAtPos[i] + coins[i - k];
                        nextHop[i - k + 1] = i + 1;
                    }
                }
            }
        }

        if (isFinite(costAtPos[0])) {
            let
                cur = 1,
                path: number[] = [cur];

            while (path[path.length - 1] !== coins.length) {
                path.push(nextHop[path[path.length - 1]]);
            }

            return path;
        } else {
            return [];
        }
    };

}
