type S = 0|-1|1;
const checkTTT = (board: S[][], n = board.length): S => {
    const counter: number[] = new Array(2 * n + 2).fill(0);

    for (let r = 0; r < n; r += 1) {
        counter[2 * n] += board[r][r];
        counter[2 * n + 1] += board[r][n - r - 1];

        for (let c = 0; c < n; c += 1) {
            counter[r] += board[r][c];
            counter[c+n] += board[r][c];
        }
    }

    return Math.max.apply(null, counter) === n
        ? 1
        : Math.min.apply(null, counter) === -n
            ? -1
            : 0;
};

let board: S[][] = [];

board = [
    [0,0,1],
    [0,1,1],
    [1,0,0]
]
console.log(checkTTT(board));

board = [
    [0,0,1],
    [-1,-1,-1],
    [1,0,0]
]
console.log(checkTTT(board));

board = [
    [0,0,-1],
    [0,1,1],
    [1,0,0]
]
console.log(checkTTT(board));
