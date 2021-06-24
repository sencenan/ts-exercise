namespace EncodeStringWithShortestLength471 {

function encode(s: string): string {
    const
        memo: Record<string, string> = {},
        countRepeats = (str: string, target: string): number => {
            let
                cnt = 0,
                start = 0;

            while (str.indexOf(target, start) === start) {
                cnt += 1;
                start += target.length;
            }

            return cnt;
        },
        solver = (str: string): string => {
            if (str.length <= 1) {
                return str;
            }

            if (memo[str] !== undefined) {
                return memo[str];
            }

            let
                min  = str,
                minLen = str.length;

            for (let i = 0; i < Math.floor(str.length / 2); i += 1) {
                const
                    prefix = str.substring(0, i + 1),
                    repeats = countRepeats(str, prefix);

                for (let r = 1; r <= repeats; r += 1) {
                    let encoded = '';

                    if (r > 1) {
                        encoded = `${r}[${solver(prefix)}]`;
                    } else {
                        encoded = solver(prefix);
                    }

                    if (str.length - prefix.length * r >= 1) {
                        encoded += solver(str.substring(prefix.length * r));
                    }

                    if (encoded.length < minLen) {
                        minLen = encoded.length;
                        min = encoded;
                    }
                }
            }

            return memo[str] = min;
        };

    return solver(s);
};

// console.log(encode('abcdabcdabcd'));
console.log(encode('abababaabababababcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg'));

}
