enum CellState {
    UNREACHABLE = -1,
    EMPTY,
    VISITED,
    VISITING,
    CURRENT
}

type Pos = [number, number];

interface Grid {
    readonly width: number;
    readonly height: number;
    readonly cells: CellState[][];
    readonly labels: string[][];
    readonly traversal: Pos[];

    visit(r: number, c: number): Grid;
    backtrack(): Grid;
    setState(pos: Pos, state: CellState): Grid;
    setLabel(pos: Pos, label: string): Grid;
}

const makeGrid = (height: number, width: number): Grid => {
    const grid: Grid = {
        width,
        height,
        cells: new Array(height).fill(0).map(
            _ => new Array<CellState>(width).fill(CellState.EMPTY)
        ),
        labels: new Array(height).fill(0).map(
            _ => new Array<string>(width).fill('')
        ),
        traversal: [],

        visit: (r, c) => {
            const pos: Pos = [r, c];

            if (grid.traversal.length > 0) {
                const last = grid.traversal[grid.traversal.length - 1];

                if (last[0] === r && last[1] === c) {
                    return grid;
                }

                grid.setState(last, CellState.VISITING);
            }

            grid.traversal.push(pos);
            grid.setState(
                grid.traversal[grid.traversal.length - 1],
                CellState.CURRENT
            );

            return grid;
        },

        backtrack: () => {
            if (grid.traversal.length > 0) {
                grid.setState(
                    grid.traversal[grid.traversal.length - 1],
                    CellState.VISITED
                );

                grid.traversal.pop();

                if (grid.traversal.length > 0) {
                    grid.setState(
                        grid.traversal[grid.traversal.length - 1],
                        CellState.CURRENT
                    );
                }
            }

            return grid;
        },

        setState: ([r, c], state) => {
            grid.cells[r][c] = state;
            return grid;
        },

        setLabel: ([r, c], label) => {
            grid.labels[r][c] = label;
            return grid;
        }
    };

    return grid;
};
