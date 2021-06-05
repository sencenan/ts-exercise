namespace SoupServings808 {

const
    p25 = (1 + 0.5 * 3) * 0.25,
    p75 = (1 * 2 + ((1 + 0.5 * 3) * 0.25)) * 0.25,
    memo: Record<string, number> = {};

function pServing(a: number, b: number, k = a + ',' + b): number {
    if (memo[k] !== undefined) {
        return memo[k];
    }

    a = Math.max(0, a);
    b = Math.max(0, b);

    if (a === b) {
        if (a === 0) {
            return 0.5;
        }
        if (a <= 50) {
            return memo[k] = p25;
        }
        if (a <= 75) {
            return memo[k] = p75;
        }
    }

    if (b === 0) {
        return memo[k] = 0;
    }

    if (a === 0) {
        return memo[k] = 1;
    }

    return memo[k] = 0.25 * (
        pServing(a - 100, b)
        + pServing(a - 75, b - 25)
        + pServing(a - 50, b - 50)
        + pServing(a - 25, b - 75)
    );
}

function soupServings(n: number): number {
    if (n >= 20000) {
        return 1;
    }

    return pServing(n, n);
};

console.log(soupServings(0));
console.log(soupServings(25));
console.log(soupServings(51));
console.log(soupServings(100));
console.log(soupServings(200));
console.log(soupServings(350));
console.log(soupServings(1001));
console.log(soupServings(1700));
console.log(soupServings(15000));
console.log(soupServings(17000));

}
