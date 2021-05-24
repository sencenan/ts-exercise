namespace DecodingWays91 {

const memo: { [_: string]: number } = {};

const isChar = (s: string): boolean => {
    const v = parseInt(s, 10);

    return 1 <= v && v <= 26;
}

function numDecodings(s: string): number {
    if (memo[s] !== undefined) {
        return memo[s];
    }

    if (s.length == 2) {
        if (s[0] === '0') {
            return memo[s] = 0;
        }

        const v = parseInt(s, 10);

        if (10 <= v && v <= 26) {
            return memo[s] = v % 10 ? 2 : 1;
        } else if (10 <= v && v <= 99) {
            return memo[s] = v % 10 ? 1 : 0;
        }
    } else if (s.length <= 1) {
        if ('1' <= s && s <= '9') {
            return memo[s] = 1;
        } else {
            return memo[s] = 0;
        }
    }

    const
        take1 = s[0],
        take2 = take1 + s[1];

    if (numDecodings(take1) === 0) {
        // first letter must be decode-able
        return memo[s] = 0;
    }

    return memo[s] = numDecodings(s.substring(1))
        + (isChar(take2) ? numDecodings(s.substring(2)) : 0)
};

//

console.log(numDecodings('230'));
console.log(memo);

}
