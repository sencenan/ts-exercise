namespace RegexMatching10 {

function isMatch(s: string, p: string): boolean {
    const
        memo: Record<string, boolean> = {},
        nextToken = (patt: string): [string, string] => {
            if (patt.length > 1 && patt[1] === '*') {
                return [patt.substring(0, 2), patt.substring(2)];
            } else if (patt.length > 0) {
                return [patt.substring(0, 1), patt.substring(1)];
            } else {
                return ['', ''];
            }
        },
        match = (idx: number, p: string, k = idx + '_' +p): boolean => {
            if (memo[k] !== undefined) {
                return memo[k];
            }

            const [patt, tail] = nextToken(p);

            if (patt === '') {
                return memo[k] = idx === s.length;
            }

            if (patt.length === 1) {
                // single char matching
                if (s[idx] === patt || patt === '.') {
                    return memo[k] = match(idx + 1, tail);
                } else {
                    return memo[k] = false;
                }
            }

            // handle * pattern
            // choice of taking 0 or more till the next unmatched
            let end: number = idx;

            if (patt[0] === '.') {
                end = s.length;
            } else {
                while (s[end] === patt[0] && end < s.length) {
                    end += 1;
                }
            }

            while (idx <= end) {
                // from as match as possible down to taking 0 of s
                if (match(end, tail)) {
                    return memo[k] = true;
                }

                end -= 1;
            }

            return memo[k] = false;
        };

    return match(0, p);
};

let s: string, p: string;

s="mississippi"
p="mis*is*ip*."
console.log(isMatch(s,p)); // true

s="aa"
p="b*a"
console.log(isMatch(s,p)); // false

s="a"
p="ab*"
console.log(isMatch(s,p)); // true

}
