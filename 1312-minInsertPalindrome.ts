namespace MinInsertPalindrome1312 {

function minInsertions(s: string, memo: number[] = []): number {
    return function cost(lo = 0, hi = s.length - 1, k = lo * s.length + hi): number {
        for (let i = lo, j = hi; memo[k] === undefined && i <= j; i += 1, j -= 1) {
            if (s[i] !== s[j]) {
                memo[k] = 1 + Math.min(cost(i + 1, j), cost(i, j - 1));
            }
        }

        return memo[k] || 0;
    }();
};

let s: string, p: string;

s = "tldjbqjdogipebqsohdypcxjqkrqltpgviqtqz";
console.log(minInsertions(s));
s = "leetcode";
console.log(minInsertions(s));

}
