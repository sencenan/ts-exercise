interface RenderOptions {
    cellSize: number;
    markerHeight: number;
}

const DEF_OPT: RenderOptions = {
    cellSize: 20,
    markerHeight: 10
};

const renderGrid = (canvas: HTMLCanvasElement, grid: Grid, partialOpts: Partial<RenderOptions>) => {
    const
        opts: RenderOptions = { ...DEF_OPT, ...partialOpts },
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.setAttribute('width', `${(grid.width + 1) * opts.cellSize + opts.markerHeight}`);
    canvas.setAttribute('height', `${(grid.height + 1) * opts.cellSize + opts.markerHeight}`);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHorizontalMarker(ctx, grid, opts);
    drawCells(ctx, grid, opts);
    drawPaths(ctx, grid, opts);
};

const getCellPos = (r: number, c: number, opts: RenderOptions): Pos => [
    r * opts.cellSize + opts.markerHeight * 2,
    c * opts.cellSize + opts.markerHeight * 2
];

const drawPaths = (ctx: CanvasRenderingContext2D, grid: Grid, opts: RenderOptions): void => {
    ctx.save();
    ctx.strokeStyle = 'red';
    grid.traversal.forEach((pos, idx) => {
        const [y, x] = getCellPos(pos[0], pos[1], opts);

        if (idx === 0) {
            ctx.beginPath();
            ctx.moveTo(x + opts.cellSize / 2, y + opts.cellSize / 2);
        } else {
            ctx.lineTo(x + opts.cellSize / 2, y + opts.cellSize / 2);

            if (idx === grid.traversal.length - 1) {
                ctx.stroke();

                ctx.beginPath();
                ctx.ellipse(
                    x + opts.cellSize / 2,
                    y + opts.cellSize / 2,
                    5,
                    5,
                    2 * Math.PI,
                    0,
                    2 * Math.PI
                );
                ctx.fill();
            }
        }
    });
    ctx.restore();
};

const drawCells = (ctx: CanvasRenderingContext2D, grid: Grid, opts: RenderOptions): void => {
    for (let r = 0; r < grid.height; r += 1) {
        for (let c = -1; c < grid.width; c += 1) {
            if (c === -1) {
                ctx.fillText(
                    `${r}`,
                    0,
                    opts.markerHeight * 2 + r * opts.cellSize + opts.cellSize / 2 + opts.markerHeight / 2,
                    opts.markerHeight * 2
                );
            } else {
                ctx.save();

                const [y, x] = getCellPos(r, c, opts);

                switch (grid.cells[r][c]) {
                    case CellState.EMPTY:
                        ctx.strokeRect(x, y, opts.cellSize, opts.cellSize);
                        break;
                    case CellState.UNREACHABLE:
                        ctx.fillRect(x, y, opts.cellSize, opts.cellSize);
                        break;
                    case CellState.VISITED:
                        ctx.fillStyle = 'lightgray';
                        ctx.fillRect(x, y, opts.cellSize, opts.cellSize);
                        break;
                    case CellState.VISITING:
                        ctx.fillStyle = 'lightgreen';
                        ctx.fillRect(x, y, opts.cellSize, opts.cellSize);
                        break;
                    case CellState.CURRENT:
                        ctx.fillStyle = 'orange';
                        ctx.fillRect(x, y, opts.cellSize, opts.cellSize);
                        break;
                }

                ctx.restore();
            }
        }
    }
};

const drawHorizontalMarker = (ctx: CanvasRenderingContext2D, grid: Grid, opts: RenderOptions): void => {
    ctx.save();
    ctx.font = `${opts.markerHeight}px sans serif`;
    for (let c = 0; c < grid.width; c += 1) {
        ctx.fillText(`${c}`, (c + 1) * opts.cellSize, opts.markerHeight, opts.cellSize);
    }
    ctx.restore();
};
