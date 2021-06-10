import { getVisualizer } from './visualizer-client';

namespace DfsVisualizer {

const
    grid = [
        ["#",".",".","#",".","#","#","#","#"],
        ["#",".",".","#",".","#",".",".","#"],
        ["#",".",".","#",".","#","#",".","#"],
        ["#",".",".",".",".",".",".",".","#"],
        ["#",".","#",".",".","#",".","S","#"],
        ["#",".","T","#",".","#","#","#","#"]
    ],
    visualizer = getVisualizer();

const
    rows = grid.length,
    cols = grid[0].length;

let
    start: Pos = [-1, -1],
    target: Pos = [-1, -1],
    cells: number[][] = new Array(rows).fill(0).map(
        _ => new Array<number>(cols).fill(0)
    );

for (let r = 0; r < grid.length; r += 1) {
    for (let c = 0; c < grid[r].length; c += 1) {
        switch (grid[r][c]) {
            case 'S':
                start = [r, c];
                break;
            case 'T':
                target = [r, c];
                break;
            case '#':
                cells[r][c] = -1;
                break;
        }
    }
}

visualizer.reset(rows, cols, cells);
visualizer.label(start[0], start[1], 'S');
visualizer.label(target[0], target[1], 'T');

const dfs = (r: number, c: number, path: string[], visited: Set<string>, k = `${r},${c}`): boolean => {
    visited.add(k);
    visualizer.visit(r, c);
    path.push(k);

    if (r === target[0] && c === target[1]) {
        return true;
    }

    const ns = [
        [r + 1, c],
        [r, c + 1],
        [r - 1, c],
        [r, c - 1]
    ]
        .filter(
            ([r, c]) => r >= 0 && c >= 0 && r < rows && c < cols && cells[r][c] !== -1
        )
        .filter(
            ([r, c]) => {
                const k = `${r},${c}`;
                return !visited.has(k);
            }
        );

    for (const n of ns) {
        if (dfs(n[0], n[1], path, visited)) {
            return true;
        }
    }

    path.pop();
    visualizer.backtrack();

    return false;
};

const bfs = () => {
    const
        pending = [start],
        visited: Set<string> = new Set(),
        prev: Record<string, string> = {},
        cost: Record<string, number> = {},
        key = (r: number, c: number) => `${r},${c}`;

    cost[key(...start)] = 0;

    while (pending.length > 0) {
        const
            [r, c] = pending.shift() as [number, number],
            k = key(r, c);

        visited.add(k);
        visualizer.visit(r, c);

        if (r === target[0] && c === target[1]) {
            break;
        }

        const ns: Pos[] = [
            [r + 1, c] as Pos,
            [r, c + 1] as Pos,
            [r - 1, c] as Pos,
            [r, c - 1] as Pos
        ]
            .filter(
                ([r, c]) => r >= 0 && c >= 0 && r < rows && c < cols && cells[r][c] !== -1
            )
            .filter(
                ([r, c]) => {
                    const k = `${r},${c}`;
                    return !visited.has(k);
                }
            );

        for (const n of ns) {
            const
                nKey = key(...n),
                costToN = cost[nKey];

            if (costToN === undefined || costToN > cost[k] + 1) {
                cost[nKey] = cost[k] + 1;
                prev[nKey] = k;
            }

            pending.push(n);
        }

        visualizer.backtrack();
    }

    // visualizer.reset(rows, cols, cells);
    let node = prev[key(...target)];
    while (node !== undefined) {
        const [r, c] = node.split(',').map(x => parseInt(x, 10));

        visualizer.visit(r, c);
        node = prev[node];
    }
};

// dfs(start[0], start[1], [], new Set());
// visualizer.reset(rows, cols, cells);
bfs();

}
