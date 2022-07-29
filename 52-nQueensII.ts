namespace NQueens52 {

    function totalNQueens(n: number): number {
        let
            ans: number = 0;

        const
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

                            ans += 1;
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
