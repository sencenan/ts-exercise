namespace UniquePath980 {

    function uniquePathsIII(grid: number[][]): number {
        let
            start: [number, number] = [-1, -1],
            emptyCnt = 0,
            width = grid[0].length,
            cnt = 0;

        for (let row = 0; row < grid.length; row += 1) {
            for (let col = 0; col < grid[row].length; col += 1) {
                switch (grid[row][col]) {
                    case 0:
                        emptyCnt += 1;
                        break;
                    case 1:
                        start = [row, col];
                        break;
                }
            }
        }

        const visitor = (row: number, col: number, path: Set<number> = new Set(), depth: number = 0) => {
            const pos = row * width + col;
            if (path.has(pos)) {
                return;
            }

            switch (grid?.[row]?.[col]) {
                case 2:
                    // end of the path
                    if (depth - 1 === emptyCnt) {
                        cnt += 1;
                    }
                    break;
                case 0:
                case 1:
                    path.add(pos);
                    visitor(row + 1, col, path, depth + 1);
                    visitor(row - 1, col, path, depth + 1);
                    visitor(row, col + 1, path, depth + 1);
                    visitor(row, col - 1, path, depth + 1);
                    path.delete(pos);
                    break;
            }
        };

        visitor(start[0], start[1]);
        return cnt;
    };

}
