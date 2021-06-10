type Update = ['reset', number, number, CellState[][]]
    | ['visit', number, number]
    | ['backtrack'];

const onLoad = (cellSize: number) => {
    const
        opts = { cellSize },
        queue: Update[] = [];

    let
        grid: Grid,
        updater: () => void;

    const loop = () => {
        if (queue.length === 0) { return; }

        const update = queue.shift() as Update;

        switch (update[0]) {
            case 'reset':
                [grid, updater] = reset(update[1], update[2], update[3], opts);
                break;
            case 'visit':
                grid.visit(update[1], update[2]);
                break;
            case 'backtrack':
                grid.backtrack();
                break;
        }

        updater();
        requestAnimationFrame(loop);
    };

    const
        rate = 300,
        inp: Update[] = [
            ['reset', 20, 20, []],
            ['visit', 0, 0],
            ['visit', 0, 1],
            ['visit', 0, 2],
            ['visit', 1, 2],
            ['visit', 1, 3],
            ['backtrack'],
            ['backtrack'],
            ['backtrack'],
            ['visit', 1, 1],
            ['visit', 2, 1],
            ['reset', 10, 10, []],
            ['visit', 0, 0],
            ['visit', 0, 1],
            ['visit', 0, 2],
            ['visit', 1, 2],
            ['visit', 1, 3],
            ['backtrack'],
            ['backtrack'],
            ['backtrack'],
            ['visit', 1, 1],
            ['visit', 2, 1]
        ];

    const id = setInterval(() => {
        if (inp.length === 0) {
            clearInterval(id);
        } else {
            queue.push(inp.shift() as Update);
            loop();
        }
    }, rate);
};

const reset = (h: number, w: number, states: CellState[][], opts: Partial<RenderOptions>): [Grid, () => void] => {
    const grid: Grid = makeGrid(h, w);

    states.forEach((row, r) => row.forEach((state, c) => {
        grid.setState([r, c], state);
    }));

    return [grid, getUpdater(grid, opts)];
};

const getUpdater = (grid: Grid, opts: Partial<RenderOptions>) => {
    const
        canvas = document.getElementById('canvas') as HTMLCanvasElement,
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
        buffer = document.createElement('canvas');

    renderGrid(canvas, grid, opts);

    return (): void => {
        renderGrid(buffer, grid, opts);
        ctx.drawImage(buffer, 0, 0);
    };
};
