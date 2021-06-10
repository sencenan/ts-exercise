type Update = ['reset', number, number, CellState[][]]
    | ['visit', number, number]
    | ['backtrack'];

const onLoad = (cellSize: number, port: number = 9191) => {
    const
        opts = { cellSize },
        queue: Update[] = [];

    let
        grid: Grid | null = null,
        updater: (() => void) | null = null;

    const loop = () => {
        if (queue.length === 0) { return; }

        const update = queue.shift() as Update;

        switch (update[0]) {
            case 'reset':
                [grid, updater] = reset(update[1], update[2], update[3], opts);
                break;
            case 'visit':
                grid?.visit(update[1], update[2]);
                break;
            case 'backtrack':
                grid?.backtrack();
                break;
        }

        updater && updater();
        requestAnimationFrame(loop);
    };

    const socket = new WebSocket(`ws://localhost:${port}`);

    socket.addEventListener('open', function() {
        socket.send('ready');
    });

    // Listen for messages
    socket.addEventListener('message', function(event) {
        queue.push(JSON.parse(event.data));
        loop();
    });
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
