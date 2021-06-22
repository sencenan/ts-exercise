namespace MakingALargeIsland827 {

    function largestIsland(grid: number[][]): number {
        const
            height = grid.length,
            width = grid[0].length,
            ptToIsland: Record<number, Set<number>> = {},
            toPos = (r: number, c: number): number => r * width + c,
            visited: Set<number> = new Set();

        let
            max = 0,
            empty: [number, number][] = [];

        for (let r = 0; r < height; r += 1) {
            for (let c = 0; c < width; c += 1) {
                const
                    cell = grid[r][c],
                    pos = toPos(r, c);

                if (cell === 0) {
                    empty.push([r, c]);
                }

                if (!visited.has(pos)) {
                    visited.add(pos);

                    if (cell === 1) {
                        // bfs a new island
                        const
                            island = new Set<number>(),
                            pending: [number, number][] = [[r,c]];

                        while (pending.length > 0) {
                            const
                                [y, x] = pending.shift() as [number, number],
                                pos = toPos(y, x);

                            if (island.has(pos)) {
                                continue;
                            }

                            island.add(pos);
                            visited.add(pos);
                            ptToIsland[pos] = island;

                            [
                                [y - 1, x],
                                [y + 1, x],
                                [y, x - 1],
                                [y, x + 1]
                            ]
                                .filter(([r, c]) => grid?.[r]?.[c] === 1)
                                .forEach(([r, c]) => pending.push([r, c]));
                        }

                        if (island.size > max) {
                            max = island.size;
                        }
                    }
                }
            }
        }

        if (empty.length === 0) {
            return height * width;
        } else {
            max += 1;
        }

        empty.forEach(([y, x]) => {
            const cell = grid[y][x];

            if (cell === 0) {
                const adj = new Set<Set<number>>();

                // find all adjacent islands
                [
                    [y - 1, x],
                    [y + 1, x],
                    [y, x - 1],
                    [y, x + 1]
                ]
                    .filter(([y, x]) => grid?.[y]?.[x] >= 0)
                    .map(([y, x]) => ptToIsland[toPos(y, x)])
                    .filter(pos => pos !== undefined)
                    .forEach(island => adj.add(island));

                let sum = 1;

                for (const island of adj) {
                    sum += island.size;
                }

                if (sum > max) {
                    max = sum;
                }
            }
        });

        return max;
    };

}
