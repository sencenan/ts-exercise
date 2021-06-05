namespace ReadNViaRead4158 {
    /**
 * Definition for read4()
 * read4 = function(buf4: string[]): number {
 *     ...
 * };
 */

var solution = function(read4: (buf4: string[]) => number) {
    let
        isEOF = false,
        remainder: string[] = [];

    return function(buf: string[], n: number): number {
        if (isEOF) {
            return 0;
        } else if (remainder.length >= n) {
            for (let i = 0; i < n; i += 1) {
                buf[i] = remainder[i];
            }

            remainder = remainder.slice(n);
            return n;
        } else {
            for (let i = 0; i < remainder.length; i += 1) {
                buf[i] = remainder[i];
            }

            let idx = remainder.length;
            n -= remainder.length;
            remainder = [];

            while (n > 0) {
                const
                    next4: string[] = [],
                    read = read4(next4),
                    cpLimit = Math.min(n, read);

                if (read === 0) {
                    //eof
                    isEOF = true;
                    return idx;
                }

                for (let i = 0; i < cpLimit; i += 1) {
                    buf[idx] = next4[i];
                    idx += 1;
                }

                n -= cpLimit;

                if (cpLimit < read) {
                    // need less than read
                    remainder = next4.slice(cpLimit);
                }
            }

            return idx;
        }
    };
};

}
