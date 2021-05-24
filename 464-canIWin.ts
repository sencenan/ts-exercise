namespace CanIWin464 {

type Player = 0 | 1;
type Memo = { [_: string]: Player };

const whoWins = (moves: number[], target: number, player: Player = 0, memo: Memo = {}): Player => {
    const key = `${moves}-${target}`;

    if (memo[key] !== undefined) {
        return memo[key];
    }

    if (moves.length === 0) {
        return memo[key] = 1;
    }

    if (moves[0] >= target) {
        // current player wins at this turn
        return memo[key] = player;
    }

    for (let i = 0; i < moves.length; i += 1) {
        const subMoves = moves.slice(0);
        subMoves.splice(i, 1);

        if (
            whoWins(
                subMoves,
                target - moves[i],
                (player + 1) % 2 as 0 | 1,
                memo
            ) === player
        ) {
            // there is exists a way for current player to win
            return memo[key] = player;
        }
    }

    // there does not exist a way for current player to win
    return memo[key] = (player + 1) % 2 as Player;
};

function canIWin(max: number, desiredTotal: number): boolean {
    return whoWins(
        new Array(max).fill(0).map((_, idx) => (idx + 1)).reverse(),
        desiredTotal
    ) === 0;
}

console.log(canIWin(10, 40));
console.log(canIWin(11, 10));
console.log(canIWin(4, 6));

}
