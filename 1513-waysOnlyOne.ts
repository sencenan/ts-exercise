namespace WaysOnlyOne1513 {

    const MAX = Math.pow(10, 9) + 7;

    function numSub(s: string): number {
        let
            count = 0,
            start = -1;

        for (let i = 1; i <= s.length; i += 1) {
            if (s[i - 1] === '1') {
                if (start == -1) {
                    start = i - 1;
                }
            }

            if (start >= 0) {
                if (i === s.length || s[i] !== '1') {
                    const
                        n = i - start,
                        ways = (n * (n + 1) / 2) % MAX;

                    count = (count + ways % MAX) % MAX;
                    start = -1;
                }
            }
        }

        return count;
    };

}
