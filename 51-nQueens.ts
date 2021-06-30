namespace NQueens51 {

    function solveNQueens(n: number): string[][] {
        const
            ans: string[][] = [],
            hasConflict = (assigned: [number, number][], row: number, col: number): boolean => {
                for (let i = 0; i < assigned.length; i += 1) {
                    const [r, c] = assigned[i];

                    if (r === row || c === col || Math.abs(row - r) == Math.abs(col - c)) {
                        return true;
                    }
                }

                return false;
            },
            solver = (assigned: [number, number][], row: number) => {
                for (let c = 0; c < n; c += 1) {
                    if (!hasConflict(assigned, row, c)) {
                        assigned.push([row, c]);

                        if (row === n - 1) {
                            // at last row, and no conflict
                            const board = new Array(n).fill('').map(_ => new Array(n).fill('.'));

                            ans.push(
                                assigned.map(
                                    ([r, c]) => {
                                        board[r][c] = 'Q';
                                        return board[r].join('');
                                    }
                                )
                            );
                        }

                        solver(assigned, row + 1);
                        assigned.pop();
                    }
                }
            };

        solver([], 0);
        return ans;
    };

}
