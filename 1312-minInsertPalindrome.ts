namespace MinInsertPalindrome1312 {

function minInsertions(s: string, lo = 0, hi = s.length - 1, memo: { [_: number]: number } = {}): number {
    const key = lo * s.length + hi;
    if (memo[key] !== undefined) {
        return memo[key];
    }

    if (hi - lo <= 0) {
        return memo[key] = 0;
    }

    for (let i = lo, j = hi; i <= j; i += 1, j -= 1) {
        if (s[i] !== s[j]) {
            // not a palindrome
            return memo[key] = 1 + Math.min(
                minInsertions(s, i + 1, j, memo),
                minInsertions(s, i, j - 1, memo)
            );
        }
    }

    return memo[key] = 0;
};

let s: string, p: string;

s = "tldjbqjdogipebqsohdypcxjqkrqltpgviqtqz";
console.log(minInsertions(s));

}
