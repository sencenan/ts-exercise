namespace DecodeTwoWaysII639 {

    const MAX = Math.pow(10, 9) + 7;

    function numDecodings(s: string): number {
        const
            memo: Record<number, number> = {},
            fn = (i = s.length - 1): number => {
                if (i < 0) {
                    return 1;
                }

                if (memo[i] !== undefined) {
                    return memo[i];
                }

                let
                    waysAtTail: number = 0,
                    waysLastTwo: number = 0;

                if (s[i] === '*') {
                    waysAtTail = 9;
                } else if (s[i] === '0') {
                    waysAtTail = 0;
                } else {
                    waysAtTail = 1;
                }

                if (i > 0 && s[i - 1] !== '0') {
                    const lastTwo = s.substring(i - 1, i + 1);

                    if (lastTwo === '**') {
                        waysLastTwo = 15;
                    } else if (lastTwo[0] === '*') {
                        // *_
                        // 10 - 19 20 - 26
                        if (parseInt(lastTwo[1]) < 7) {
                            waysLastTwo = 2;
                        } else {
                            waysLastTwo = 1;
                        }
                    } else if (lastTwo[1] === '*') {
                        const v = parseInt(lastTwo[0]);

                        if (v === 1) {
                            waysLastTwo = 9;
                        } else if (v === 2) {
                            waysLastTwo = 6;
                        }
                    } else {
                        const v = parseInt(lastTwo);

                        if (v < 27) {
                            waysLastTwo = 1;
                        }
                    }
                }

                // v1 = combine how many ways on this current position
                // how many ways to get to i - 1 (*) [i]
                // plus, how many ways to get to i - 2 (*) [i - 1, i]

                return memo[i] = (
                    (waysAtTail * fn(i - 1)) % MAX
                    + (waysLastTwo * fn(i - 2)) % MAX
                ) % MAX;
            };

        if (s[0] === '0') {
            return 0;
        }
        return fn();
    };

}
