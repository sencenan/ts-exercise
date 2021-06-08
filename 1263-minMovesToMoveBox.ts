namespace MinMovesToMoveBox1263 {

function minPushBox(grid: string[][]): number {
    type Pos = [number, number];

    let
        box: Pos = [-1, -1],
        target: Pos = [-1, -1],
        player: Pos = [-1, -1];

    for (let r = 0; r < grid.length; r += 1) {
        for (let c = 0; c < grid[r].length; c += 1) {
            if (grid[r][c] === 'B') {
                box = [r, c];
            }
            if (grid[r][c] === 'S') {
                player = [r, c];
            }
            if (grid[r][c] === 'T') {
                target = [r, c]
            }
        }
    }

    const
        validNextPositions = ([r, c]: Pos): Pos[] => {
            const fn = (lhs: Pos, rhs: Pos): Pos[] => {
                if (lhs[0] < 0 || rhs[0] < 0 || lhs[0] >= grid.length || rhs[0] >= grid.length) {
                    return [];
                }

                const
                    l = grid[lhs[0]][lhs[1]],
                    r = grid[rhs[0]][rhs[1]];

                switch (l) {
                    case '.':
                        switch (r) {
                            case '.':
                            case 'T':
                            case 'S':
                                return [lhs, rhs];
                            default:
                                return [];
                        }
                    case 'T':
                        switch (r) {
                            case '.':
                                return [lhs, rhs];
                            case 'S':
                                return [lhs];
                            default:
                                return [];
                        }
                    case 'S':
                        switch (r) {
                            case '.':
                                return [lhs, rhs];
                            case 'T':
                                return [rhs];
                            default:
                                return [];
                        }
                    default:
                        return [];
                }
            };

            return fn([r + 1, c], [r - 1, c]).concat(fn([r, c + 1], [r, c - 1]));
        },
        memo: Record<string, number> = {},
        movePlayer = (from: Pos, end: Pos, boxPos: Pos, k = [from, end, boxPos].join()): number => {
            if (memo[k] !== undefined) {
                return memo[k];
            }

            let
                pending: Pos[] = [from],
                next: Pos[] = [],
                visited: Set<string> = new Set(),
                depth = 0;

            while (pending.length > 0) {
                const [r, c] = pending.shift() as Pos;

                if (r == end[0] && c == end[1]) {
                    return memo[k] = depth;
                }

                ([
                    [r + 1, c],
                    [r - 1, c],
                    [r, c + 1],
                    [r, c - 1]
                ] as Pos[])
                    .filter(([r, _]) => r >= 0 && r < grid.length)
                    .filter(([r, c]) => grid[r][c] === '.' || grid[r][c] === 'T')
                    .filter(p => !visited.has(`${p}`))
                    .map(n => next.push(n));

                if (pending.length === 0) {
                    depth += 1;
                    pending = next;
                    next = [];
                }

                visited.add(`${[r, c]}`);
            }

            return memo[k] = -1;
        };

    // bfs
    let
        pending: [Pos, Pos][] = [[box, player]], // [box, player]
        next: [Pos, Pos][] = [],
        visited: Set<string> = new Set(),
        depth = 0;

    grid[box[0]][box[1]] = '.';
    grid[player[0]][player[1]] = '.';

    while (pending.length > 0) {
        const [boxPos, playerPos] = pending.shift() as [Pos, Pos];

        if (boxPos[0] === target[0] && boxPos[1] === target[1]) {
            return depth;
        }

        // change the grid
        grid[boxPos[0]][boxPos[1]] = 'B';
        grid[playerPos[0]][playerPos[1]] = 'S';

        // find possible next box position
        validNextPositions(boxPos)
            .filter(n => !visited.has(`${n} <- ${boxPos}`))
            .filter(
                n => {
                    let o: Pos;

                    // can play to the opposite side
                    if (n[0] === boxPos[0]) {
                        // same row
                        if (n[1] > boxPos[1]) {
                            // box moved right
                            o = [boxPos[0], boxPos[1] - 1];
                        } else {
                            // box moved left
                            o = [boxPos[0], boxPos[1] + 1];
                        }
                    } else {
                        // same col
                        if (n[0] > boxPos[0]) {
                            // box moved down
                            o = [boxPos[0] - 1, boxPos[1]];
                        } else {
                            // box moved up
                            o = [boxPos[0] + 1, boxPos[1]];
                        }
                    }

                    if (
                        Math.abs(playerPos[0] - boxPos[0]) + Math.abs(playerPos[1] - boxPos[1]) === 1
                        && (
                            (playerPos[0] === o[0] && playerPos[1] === o[1])
                                || (playerPos[0] === o[0] && Math.abs(playerPos[1] - o[1]) === 2)
                                || (playerPos[1] === o[1] && Math.abs(playerPos[0] - o[0]) === 2)
                        )
                    ) {
                        return true;
                    } else {
                        return movePlayer(playerPos, o, boxPos) >= 0;
                    }
                }
            )
            .map(
                nextBox => {
                    next.push([nextBox, boxPos]);
                }
            );

        if (pending.length === 0) {
            depth += 1;
            pending = next;
            next = [];
        }

        // reset the grid
        grid[boxPos[0]][boxPos[1]] = '.';
        grid[playerPos[0]][playerPos[1]] = '.';

        visited.add(`${boxPos} <- ${playerPos}`);
    }

    return -1;
};

let grid: string[][];

const printGrid = (grid: string[][]) => {
    grid.forEach(r => {
        console.log(r.join(''));
    });
};

// 3
grid = [["#","#","#","#","#","#"],["#","T","#","#","#","#"],["#",".",".","B",".","#"],["#",".","#","#",".","#"],["#",".",".",".","S","#"],["#","#","#","#","#","#"]];
console.log(minPushBox(grid));

// 5
grid = [["#","#","#","#","#","#"], ["#","T",".",".","#","#"], ["#",".","#","B",".","#"], ["#",".",".",".",".","#"], ["#",".",".",".","S","#"], ["#","#","#","#","#","#"]]
console.log(minPushBox(grid));

// 7
grid = [["#",".",".","#","#","#","#","#"],["#",".",".","T","#",".",".","#"],["#",".",".",".","#","B",".","#"],["#",".",".",".",".",".",".","#"],["#",".",".",".","#",".","S","#"],["#",".",".","#","#","#","#","#"]]
console.log(minPushBox(grid));

// 8
grid = [["#",".",".","#","T","#","#","#","#"],["#",".",".","#",".","#",".",".","#"],["#",".",".","#",".","#","B",".","#"],["#",".",".",".",".",".",".",".","#"],["#",".",".",".",".","#",".","S","#"],["#",".",".","#",".","#","#","#","#"]]
console.log(minPushBox(grid));

// 6
grid = [[".",".","#",".",".",".",".","#"],[".","B",".",".",".",".",".","#"],[".",".","S",".",".",".",".","."],[".","#",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".","T",".",".",".","."],[".",".",".",".",".",".",".","#"],[".","#",".",".",".",".",".","."]]
console.log(minPushBox(grid));

-1
grid = [["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],["#",".",".",".",".",".",".",".",".",".",".",".","#","#","#","#"],["#",".","#","#","#","#",".","#","#","#","#",".","#","#","#","."],["#",".",".",".",".",".",".","#","T","#",".",".","#","#","#","."],["#",".",".",".","#",".",".",".",".",".",".",".","#","#","#","."],["#",".",".",".",".",".","B",".",".",".",".",".","#","#","#","."],["#",".","#","#","#","#","#","#","#","#","#",".","#","#","#","."],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","."],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","."],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","."],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","."],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","."],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".","."],["#",".",".",".",".",".",".",".","S",".",".",".",".",".",".","."],["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"]]
printGrid(grid);
console.log(minPushBox(grid));

// -1
grid = [["#","#","#","#","#","#","#"],["#","S","#",".","B","T","#"],["#","#","#","#","#","#","#"]]
printGrid(grid);
console.log(minPushBox(grid));

grid = [
    '#...#',
    '#B#.#',
    '.S..#',
    '.#..T',
    '...##'
].map(s => s.split(''))
printGrid(grid);
console.log(minPushBox(grid));

// // -1
// grid = [["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],["#",".",".",".",".",".",".",".",".",".",".",".","#","#","#","#","#","#","#","#"],["#",".",".",".","#","#",".","#","#","#","#",".","#","#","#",".","#","#","T","#"],["#",".",".",".",".",".",".","#",".","#",".",".","#","#","#",".","#","#",".","#"],["#",".",".",".","#",".",".",".",".",".",".",".","#","#","#",".","#","#",".","#"],["#",".","#",".",".",".",".",".",".",".",".",".","#","#","#",".","#","#",".","#"],["#",".","#",".","#","#","#","#","#","#","#",".","#","#","#",".","#","#",".","#"],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".","#"],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".","#"],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#"],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".","#"],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".","#"],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".","#"],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".","#"],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".","#"],["#",".","B",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".","#"],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".","#"],["#",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","#",".",".","#"],["#",".",".",".",".",".",".",".","S",".",".",".",".",".",".",".","#",".",".","#"],["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"]]
// printGrid(grid);
// console.log(grid.length, grid[0].length);
// console.log(minPushBox(grid));
//TODO: too slow

}
